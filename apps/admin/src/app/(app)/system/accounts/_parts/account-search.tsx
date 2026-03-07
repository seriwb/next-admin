"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigationRouter } from "@/hooks/use-navigation-router";

type Props = {
  query: string;
  sort: string;
};

export const AccountSearch = ({ query, sort }: Props) => {
  const { push } = useNavigationRouter();
  const [searchValue, setSearchValue] = useState(query);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateSearch = (value: string, newSort: string) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (value) params.set("query", value);
    if (newSort) params.set("sort", newSort);
    push(`/system/accounts?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateSearch(value, sort);
    }, 500);
  };

  const handleSortChange = (value: string) => {
    updateSearch(searchValue, value);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="メールアドレス / 名前で検索"
        value={searchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-64"
      />
      <Select value={sort || "desc"} onValueChange={handleSortChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="並び順" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">新しい順</SelectItem>
          <SelectItem value="asc">古い順</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
