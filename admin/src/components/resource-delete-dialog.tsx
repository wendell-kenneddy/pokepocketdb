import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./button";

interface ResourceDeleteDialogProps {
  open: boolean;
  title: string;
  description?: string;
  onOpenChange: (open: boolean) => void;
  onConfirmClick: () => void;
}

export function ResourceDeleteDialog({
  open,
  title,
  description,
  onOpenChange,
  onConfirmClick,
}: ResourceDeleteDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} defaultOpen={false}>
      <Dialog.Portal>
        <Dialog.DialogOverlay className="fixed inset-0 bg-black/60" />

        <Dialog.Content className="p-4 fixed left-1/2 top-1/2 w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-900 focus:outline-none">
          <Dialog.Title>{title}</Dialog.Title>

          <Dialog.Description className="text-sm mt-1">
            {description ?? "You won't be able to recover it once deleted."}
          </Dialog.Description>

          <div className="mt-4 w-full grid grid-cols-2 gap-4">
            <Button w="max" colorScheme="primary" onClick={onConfirmClick}>
              Confirm
            </Button>

            <Dialog.Close asChild>
              <Button w="max" colorScheme="danger">
                Cancel
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
