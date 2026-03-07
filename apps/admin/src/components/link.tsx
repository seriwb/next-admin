import { type AnchorHTMLAttributes, type ReactNode, forwardRef } from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { LinkIndicator } from "@/components/link-indicator";

type LinkProps = NextLinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & {
    children?: ReactNode;
  };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function LinkWithRef(
  {
    // Turn next/link prefetching off by default.
    // @see https://github.com/vercel/next.js/discussions/24009
    prefetch = false,
    children,
    ...rest
  },
  ref
) {
  return (
    <NextLink prefetch={prefetch} {...rest} ref={ref}>
      <LinkIndicator />
      {children}
    </NextLink>
  );
});
export default Link;
