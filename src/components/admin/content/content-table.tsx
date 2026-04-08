"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Eye, EyeOff, Plus, Save, ArrowUpRight } from "lucide-react";
import { updateRow, deleteRow, getAllRows, insertRow } from "@/actions/cms";
import { toast } from "sonner";

interface Column {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "boolean" | "select";
  options?: string[];
}

interface ContentTableProps {
  tableName: string;
  columns: Column[];
  title: string;
  description?: string;
  extraFields?: { key: string; label: string; type: string; options?: string[] }[];
}

export function ContentTable({ tableName, columns, title, description, extraFields }: ContentTableProps) {
  const [rows, setRows] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Record<string, any>>({});
  const [creating, setCreating] = useState(false);
  const [newData, setNewData] = useState<Record<string, any>>({});

  const fetchData = async () => {
    const result = await getAllRows(tableName);
    if (result.data) setRows(result.data);
  };

  const handleSave = async (id: number, data: Record<string, any>) => {
    const result = await updateRow(tableName, id, data);
    if (result.success) {
      toast.success("Updated successfully");
      setEditingId(null);
      fetchData();
    } else {
      toast.error(result.error);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await deleteRow(tableName, id);
    if (result.success) {
      toast.success("Deleted");
      fetchData();
    } else {
      toast.error(result.error);
    }
  };

  const handleCreate = async () => {
    const result = await insertRow(tableName, { ...newData, is_visible: true, display_order: rows.length + 1 });
    if (result.success) {
      toast.success("Created");
      setCreating(false);
      setNewData({});
      fetchData();
    } else {
      toast.error(result.error);
    }
  };

  const toggleVisibility = async (id: number, current: boolean) => {
    const result = await updateRow(tableName, id, { is_visible: !current });
    if (result.success) fetchData();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchData} variant="secondary" size="sm">Refresh</Button>
            {!creating && <Button onClick={() => setCreating(true)} size="sm"><Plus size={14} className="mr-1" /> Add New</Button>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {creating && (
          <div className="mb-6 p-4 rounded-lg bg-white/[0.02] border border-violet-500/20 space-y-3">
            <p className="text-sm font-medium text-white">New Entry</p>
            {extraFields?.map(field => (
              <div key={field.key}>
                <label className="text-xs text-white/40 block mb-1">{field.label}</label>
                <Input
                  value={newData[field.key] || ""}
                  onChange={e => setNewData({ ...newData, [field.key]: e.target.value })}
                  className="bg-white/5"
                />
              </div>
            ))}
            <div className="flex gap-2">
              <Button onClick={handleCreate} size="sm"><Save size={14} className="mr-1" /> Save</Button>
              <Button onClick={() => setCreating(false)} variant="secondary" size="sm">Cancel</Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {rows.map((row) => {
            const isEditing = editingId === row.id;
            return (
              <div key={row.id} className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex-1 grid grid-cols-12 gap-3">
                  {columns.map(col => (
                    <div key={col.key} className={col.key === "title" || col.key === "name" ? "col-span-4" : "col-span-3"}>
                      {isEditing ? (
                        <Input
                          value={editData[col.key] ?? row[col.key] ?? ""}
                          onChange={e => setEditData({ ...editData, [col.key]: e.target.value })}
                          className="bg-white/5"
                        />
                      ) : (
                        <p className="text-sm text-white/70 truncate">{String(row[col.key] ?? "—")}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleVisibility(row.id, row.is_visible)}
                    className="h-8 w-8"
                  >
                    {row.is_visible ? <Eye size={14} className="text-green-400" /> : <EyeOff size={14} className="text-white/20" />}
                  </Button>
                  {isEditing ? (
                    <>
                      <Button size="sm" onClick={() => { handleSave(row.id, editData); }}><Save size={14} className="mr-1" /> Save</Button>
                      <Button size="sm" variant="secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                    </>
                  ) : (
                    <Button size="sm" variant="secondary" onClick={() => { setEditingId(row.id); setEditData({}); }}>Edit</Button>
                  )}
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(row.id)} className="h-8 w-8 text-red-400 hover:text-red-300">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            );
          })}
          {rows.length === 0 && (
            <p className="text-center py-12 text-white/30 text-sm">No entries yet. Click "Add New" to create one.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
