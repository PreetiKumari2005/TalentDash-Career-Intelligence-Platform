"use client";
import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Search } from "lucide-react";

interface FilterBarProps {
  onSearchChange: (val: string) => void;
  onRoleFilterChange: (val: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onSearchChange, onRoleFilterChange }) => {
  const roles = [
    { label: "All Roles", value: "" },
    { label: "Software Engineer", value: "Software Engineer" },
    { label: "Product Manager", value: "Product Manager" },
    { label: "Data Scientist", value: "Data Scientist" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-slate-200 rounded-xl shadow-sm mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400 z-10" />
        <Input 
          placeholder="Search by company name or location..." 
          className="pl-9"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full md:w-64">
        <Select 
          options={roles} 
          onChange={(e) => onRoleFilterChange(e.target.value)} 
        />
      </div>
    </div>
  );
};