export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "super_admin" | "admin" | "editor" | "viewer";
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: "super_admin" | "admin" | "editor" | "viewer";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: "super_admin" | "admin" | "editor" | "viewer";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      hero: {
        Row: {
          id: number;
          headline: string;
          subheadline: string | null;
          cta_primary_text: string | null;
          cta_primary_link: string | null;
          cta_secondary_text: string | null;
          cta_secondary_link: string | null;
          bg_video_url: string | null;
          bg_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          headline?: string;
          subheadline?: string | null;
          cta_primary_text?: string | null;
          cta_primary_link?: string | null;
          cta_secondary_text?: string | null;
          cta_secondary_link?: string | null;
          bg_video_url?: string | null;
          bg_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          headline?: string;
          subheadline?: string | null;
          cta_primary_text?: string | null;
          cta_primary_link?: string | null;
          cta_secondary_text?: string | null;
          cta_secondary_link?: string | null;
          bg_video_url?: string | null;
          bg_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      sections: {
        Row: {
          id: number;
          key: string;
          title: string;
          subtitle: string | null;
          content: Json | null;
          is_visible: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          key: string;
          title?: string;
          subtitle?: string | null;
          content?: Json | null;
          is_visible?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          key?: string;
          title?: string;
          subtitle?: string | null;
          content?: Json | null;
          is_visible?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      navigation: {
        Row: {
          id: number;
          label: string;
          href: string;
          parent_id: number | null;
          display_order: number;
          is_visible: boolean;
          is_external: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          label: string;
          href: string;
          parent_id?: number | null;
          display_order?: number;
          is_visible?: boolean;
          is_external?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          label?: string;
          href?: string;
          parent_id?: number | null;
          display_order?: number;
          is_visible?: boolean;
          is_external?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      footer: {
        Row: {
          id: number;
          key: string;
          content: Json;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          key: string;
          content: Json;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          key?: string;
          content?: Json;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      features: {
        Row: {
          id: number;
          icon: string | null;
          title: string;
          description: string;
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          icon?: string | null;
          title: string;
          description: string;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          icon?: string | null;
          title?: string;
          description?: string;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: number;
          icon: string | null;
          title: string;
          description: string;
          details: string | null;
          link: string | null;
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          icon?: string | null;
          title: string;
          description: string;
          details?: string | null;
          link?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          icon?: string | null;
          title?: string;
          description?: string;
          details?: string | null;
          link?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      pricing_plans: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          price: string;
          period: string | null;
          features: Json;
          cta_text: string | null;
          cta_link: string | null;
          is_popular: boolean;
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          price: string;
          period?: string | null;
          features?: Json;
          cta_text?: string | null;
          cta_link?: string | null;
          is_popular?: boolean;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          price?: string;
          period?: string | null;
          features?: Json;
          cta_text?: string | null;
          cta_link?: string | null;
          is_popular?: boolean;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      faqs: {
        Row: {
          id: number;
          question: string;
          answer: string;
          category: string | null;
          display_order: number;
          is_visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          question: string;
          answer: string;
          category?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          question?: string;
          answer?: string;
          category?: string | null;
          display_order?: number;
          is_visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: number;
          author_name: string;
          author_role: string | null;
          author_avatar: string | null;
          company: string | null;
          content: string;
          rating: number | null;
          is_visible: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          author_name: string;
          author_role?: string | null;
          author_avatar?: string | null;
          company?: string | null;
          content: string;
          rating?: number | null;
          is_visible?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          author_name?: string;
          author_role?: string | null;
          author_avatar?: string | null;
          company?: string | null;
          content?: string;
          rating?: number | null;
          is_visible?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: number;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          cover_image_url: string | null;
          author_id: string | null;
          status: "draft" | "published";
          published_at: string | null;
          meta_title: string | null;
          meta_description: string | null;
          og_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          cover_image_url?: string | null;
          author_id?: string | null;
          status?: "draft" | "published";
          published_at?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          cover_image_url?: string | null;
          author_id?: string | null;
          status?: "draft" | "published";
          published_at?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      case_studies: {
        Row: {
          id: number;
          slug: string;
          title: string;
          client: string | null;
          industry: string | null;
          challenge: string | null;
          solution: string;
          results: Json | null;
          cover_image_url: string | null;
          testimonial_quote: string | null;
          is_visible: boolean;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          slug: string;
          title: string;
          client?: string | null;
          industry?: string | null;
          challenge?: string | null;
          solution: string;
          results?: Json | null;
          cover_image_url?: string | null;
          testimonial_quote?: string | null;
          is_visible?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          slug?: string;
          title?: string;
          client?: string | null;
          industry?: string | null;
          challenge?: string | null;
          solution?: string;
          results?: Json | null;
          cover_image_url?: string | null;
          testimonial_quote?: string | null;
          is_visible?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: number;
          name: string;
          email: string;
          company: string | null;
          phone: string | null;
          message: string | null;
          source: string | null;
          status: "new" | "contacted" | "qualified" | "converted" | "lost";
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          email: string;
          company?: string | null;
          phone?: string | null;
          message?: string | null;
          source?: string | null;
          status?: "new" | "contacted" | "qualified" | "converted" | "lost";
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string;
          company?: string | null;
          phone?: string | null;
          message?: string | null;
          source?: string | null;
          status?: "new" | "contacted" | "qualified" | "converted" | "lost";
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: number;
          email: string;
          is_confirmed: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          email: string;
          is_confirmed?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          email?: string;
          is_confirmed?: boolean;
          created_at?: string;
        };
      };
      seo_settings: {
        Row: {
          id: number;
          page_key: string;
          meta_title: string | null;
          meta_description: string | null;
          og_image_url: string | null;
          canonical_url: string | null;
          extra_meta: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          page_key: string;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image_url?: string | null;
          canonical_url?: string | null;
          extra_meta?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          page_key?: string;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image_url?: string | null;
          canonical_url?: string | null;
          extra_meta?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_config: {
        Row: {
          id: number;
          key: string;
          value: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          key: string;
          value: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          key?: string;
          value?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: number;
          key: string;
          value: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          key: string;
          value: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          key?: string;
          value?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      media: {
        Row: {
          id: number;
          file_name: string;
          file_type: string;
          file_size: number;
          url: string;
          thumbnail_url: string | null;
          alt_text: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          file_name: string;
          file_type: string;
          file_size: number;
          url: string;
          thumbnail_url?: string | null;
          alt_text?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          file_name?: string;
          file_type?: string;
          file_size?: number;
          url?: string;
          thumbnail_url?: string | null;
          alt_text?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
        };
      };
      legal_pages: {
        Row: {
          id: number;
          page_type: "privacy" | "terms" | "cookies";
          title: string;
          content: string;
          is_active: boolean;
          last_updated: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          page_type: "privacy" | "terms" | "cookies";
          title: string;
          content: string;
          is_active?: boolean;
          last_updated?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          page_type?: "privacy" | "terms" | "cookies";
          title?: string;
          content?: string;
          is_active?: boolean;
          last_updated?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
