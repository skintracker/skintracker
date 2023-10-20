export interface TableHeadProps {
  children: JSX.Element | JSX.Element[];
}

export function TableHead({ children, ...props }: TableHeadProps & JSX.IntrinsicElements["thead"]) {
  return <thead {...props}>{children}</thead>;
}

export interface TableBodyProps {
  children: JSX.Element | JSX.Element[];
}

export function TableBody({ children, ...props }: TableBodyProps) {
  return <tbody {...props}>{children}</tbody>;
}

export interface TableRowProps {
  children: JSX.Element | JSX.Element[];
}

export function TableRow({ children, ...props }: TableRowProps & JSX.IntrinsicElements["tr"]) {
  return (
    <tr class="border-b hover:bg-slate-200 text-left last:border-none" {...props}>
      {children}
    </tr>
  );
}

export interface TableHeaderRowProps {
  dark?: boolean;
  children: JSX.Element | JSX.Element[];
}

export function TableHeaderRow({ children, dark, ...props }: TableHeaderRowProps) {
  if (dark)
    return (
      <tr class="bg-slate-800 hover:bg-slate-700 text-left text-white/80" {...props}>
        {children}
      </tr>
    );
  return (
    <tr class="border-b hover:bg-slate-200 text-left text-slate-500" {...props}>
      {children}
    </tr>
  );
}

export interface TableCellProps {
  children: JSX.Element | JSX.Element[];
  classes?: string;
}

export function TableCell({ children, classes, ...props }: TableCellProps) {
  return (
    <td class={`p-2 text-black${classes ? ` ${classes}` : ""}`} {...props}>
      {children}
    </td>
  );
}

export interface TableHeaderCellProps {
  children: JSX.Element | JSX.Element[];
  classes?: string;
}

export function TableHeaderCell({ children, classes, ...props }: TableHeaderCellProps) {
  return (
    <th class={`p-2${classes ? ` ${classes}` : ""}`} {...props}>
      {children}
    </th>
  );
}

export interface TableProps {
  children: JSX.Element | JSX.Element[];
}

export function Table({ children, ...props }: TableProps & JSX.IntrinsicElements["table"]) {
  return (
    <div class="table-container w-full overflow-scroll rounded">
      <table class="w-full" {...props}>
        {children}
      </table>
    </div>
  );
}
