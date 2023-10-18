export interface TableHeadProps {
  children: JSX.Element | JSX.Element[];
}

export function TableHead({ children }: TableHeadProps) {
  return <thead>{children}</thead>;
}

export interface TableBodyProps {
  children: JSX.Element | JSX.Element[];
}

export function TableBody({ children }: TableBodyProps) {
  return <tbody>{children}</tbody>;
}

export interface TableRowProps {
  children: JSX.Element | JSX.Element[];
}

export function TableRow({ children }: TableRowProps) {
  return (
    <tr class="border-b hover:bg-slate-200 text-left last:border-none">
      {children}
    </tr>
  );
}

export interface TableHeaderRowProps {
  dark?: boolean;
  children: JSX.Element | JSX.Element[];
}

export function TableHeaderRow({ children, dark }: TableHeaderRowProps) {
  if (dark)
    return (
      <tr class="bg-slate-800 hover:bg-slate-700 text-left text-white">
        {children}
      </tr>
    );
  return (
    <tr class="border-b hover:bg-slate-200 text-left text-slate-500">
      {children}
    </tr>
  );
}

export interface TableCellProps {
  children: JSX.Element | JSX.Element[];
  classes?: string;
}

export function TableCell({ children, classes }: TableCellProps) {
  return (
    <td class={`p-2 text-black${classes ? ` ${classes}` : ""}`}>{children}</td>
  );
}

export interface TableHeaderCellProps {
  children: JSX.Element | JSX.Element[];
  classes?: string;
}

export function TableHeaderCell({ children, classes }: TableHeaderCellProps) {
  return <th class={`p-2${classes ? ` ${classes}` : ""}`}>{children}</th>;
}

export interface TableProps {
  children: JSX.Element | JSX.Element[];
}

export function Table({ children }: TableProps) {
  return (
    <div class="table-container w-full overflow-scroll">
      <table class="w-full">{children}</table>
    </div>
  );
}
