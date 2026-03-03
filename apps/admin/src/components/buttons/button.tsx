import React from "react";
import { ClipLoader } from "react-spinners";
import { Button as BaseButton } from "@/components/ui/button";
import { cn } from "@/lib/utils/component";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  label: string;
  loading?: boolean;
  loadingLabel?: string;
};

export const Button = (props: Props) => {
  const { label, loading, loadingLabel, ...rest } = props;
  return (
    <BaseButton {...rest} className={cn(rest.className)}>
      {loading !== undefined && loading && (
        <ClipLoader
          size={20}
          color="var(--primary-foreground)"
          cssOverride={{
            marginRight: 8,
          }}
        />
      )}
      {loading !== undefined && loading ? loadingLabel || label : label}
    </BaseButton>
  );
};
