import { EntryIProps } from "../../types"
import Diagnoses from "./Diagnoses"

const BaseEntry = ({ entry, diagnoses }: EntryIProps) => {
    return (
        <>
            <div>{entry.date}</div>
            <div><em>{entry.description}</em></div>
            <div>Seen by {entry.specialist}</div>
            {entry.diagnosisCodes && <Diagnoses entry={entry} diagnoses={diagnoses} />}
        </>
    )
}

export default BaseEntry