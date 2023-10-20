interface JsonHighlighterProps {
  // biome-ignore lint/suspicious/noExplicitAny: it's a json object, it can be anything
  data: any;
}

export function JsonHighlighter({ data }: JsonHighlighterProps) {
  // biome-ignore lint/suspicious/noExplicitAny: it's a json object, it can be anything
  const renderJsonValue = (value: any): JSX.Element => {
    if (typeof value === "string") {
      return <span class="text-green-600">"{value}"</span>;
    }

    if (typeof value === "number") {
      return <span class="text-teal-600">{value}</span>;
    }

    if (typeof value === "boolean") {
      return <span class="text-red-600">{value.toString()}</span>;
    }

    if (value === null) {
      return <span class="text-purple-600">null</span>;
    }

    if (Array.isArray(value)) {
      const elements: JSX.Element[] = value.map((item, index) => (
        <div class="ml-4">
          {renderJsonValue(item)}
          {index !== value.length - 1 && ","}
        </div>
      ));

      return (
        <div>
          [<div class="ml-4">{elements}</div>]
        </div>
      );
    }

    const entries = Object.entries(value);
    const elements: JSX.Element[] = entries.map(([key, val], index) => (
      <div class="ml-4">
        <span class="text-blue-600">"{key}"</span>: {renderJsonValue(val)}
        {index !== entries.length - 1 && ","}
      </div>
    ));

    return (
      <div class="p-2 bg-slate-200 rounded">
        {"{"}
        {elements}
        {"}"}
      </div>
    );
  };

  return <pre>{renderJsonValue(data)}</pre>;
}

export default JsonHighlighter;
