import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material'
import { EntryFormValues } from '../../types'
import AddEntryForm from './AddEntryForm'

interface IProps {
  entryModalOpen: boolean,
  closeEntryModal: () => void,
  onSubmit: (values: EntryFormValues) => void,
  error?: string
}

const AddEntryModal = ({ entryModalOpen, closeEntryModal, onSubmit, error }: IProps) => (
  <Dialog open={entryModalOpen} fullWidth={true} onClose={() => closeEntryModal()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity='error'>{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} closeEntryModal={closeEntryModal} />
    </DialogContent>
  </Dialog>
)

export default AddEntryModal