import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tohpkqtsqfjypkbzlyez.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaHBrcXRzcWZqeXBrYnpseWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NTE4OTAsImV4cCI6MjA3NzEyNzg5MH0.SrkcW1mZP4S3R87Xwu4yDCqbSryxVS2dbbmvf0FvnbY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
