import { Button } from "@mui/material";
import { Patient, Diagnosis, EntryFormValues, Entry } from "../../types"
import EntryDetails from "./EntryDetails";
import Gender from "./Gender";
import AddEntryModal from "../AddEntryModal";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import axios from "axios";

interface IProps {
    patient: Patient;
    diagnoses: Diagnosis[];
}

const PatientPage = ({ patient, diagnoses }: IProps) => {

    const [entryModelOpen, setEntryModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        const fetchEntryList = async () => {
            const entries = await patientService.getEntries(patient.id);
            setEntries(entries);
        }
        void fetchEntryList();
    }, [])

    const openEntryModal = (): void => setEntryModalOpen(true);

    const closeEntryModal = (): void => {
        setEntryModalOpen(false);
        setError(undefined);
    }

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const entry = await patientService.createEntry(values, patient.id);
            setEntries(entries.concat(entry));
            setEntryModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    }

    return (
        <>
            <h3>{patient.name}</h3>
            <Gender patient={patient} />
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <h4>entries</h4>
            {entries.map(entry => <EntryDetails entry={entry} diagnoses={diagnoses} />)}
            <br />
            <Button variant="contained" color="primary" onClick={openEntryModal}>
                Add New Entry
            </Button>
            <AddEntryModal
                entryModalOpen={entryModelOpen}
                closeEntryModal={closeEntryModal}
                onSubmit={submitNewEntry} 
                error={error}
            />
        </>
    )
}

export default PatientPage