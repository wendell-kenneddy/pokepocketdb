import * as RadixRadioGroup from "@radix-ui/react-radio-group";

interface Item {
  id: string;
  value: string;
  displayValue: string;
}

interface RadioGroupProps {
  defaultValue: string;
  ariaLabel: string;
  items: Item[];
}

export function RadioGroup({ defaultValue, ariaLabel, items }: RadioGroupProps) {
  return (
    <RadixRadioGroup.Root
      defaultValue={defaultValue}
      aria-label={ariaLabel}
      className="w-full flex items-center justify-center gap-4"
    >
      {items.map(({ id, value, displayValue }) => (
        <div key={id} className="flex items-center gap-2">
          <RadixRadioGroup.Item
            id={id}
            value={value}
            className="size-6 cursor-default rounded-full bg-gray-900 ring-1 ring-teal-400 outline-none hover:bg-gray-950 focus:shadow-[0_0_0_2px] focus:shadow-black"
          >
            <RadixRadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-3 after:rounded-full after:bg-teal-400" />
          </RadixRadioGroup.Item>

          <label htmlFor={id} className="text-sm">
            {displayValue}
          </label>
        </div>
      ))}
    </RadixRadioGroup.Root>
  );
}
