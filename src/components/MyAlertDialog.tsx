import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface MyAlertDialogProps {
  title: string
  description: string
  open: boolean
  handleConfirm?: () => void
  handleClose?: () => void
}

export function MyAlertDialog({
  open,
  title,
  description,
  handleConfirm,
  handleClose,
}: MyAlertDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
