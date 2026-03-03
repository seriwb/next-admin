import type { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/buttons";
import { SearchText } from "@/components/search-text";
import { SelectField } from "@/components/select-field";
import ss from "./condition.module.scss";

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
};

export const Condition = (props: Props) => {
  const router = useRouter();
  return (
    <div className={ss.container}>
      <div className={ss.condition}>
        <div className={ss.search}>
          <SearchText value={props.query} setValue={props.setQuery} placeholder="Search for account..." />
        </div>
        <SelectField options={[]} value={props.sort} setValue={props.setSort} />
      </div>
      <div className={ss.new}>
        {/* <Button label="New" shape="square" onClick={() => router.push("/system/accounts/new")} /> */}
      </div>
    </div>
  );
};
