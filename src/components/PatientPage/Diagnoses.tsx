import { EntryIProps } from "../../types";

const Diagnoses = ({ entry, diagnoses }: EntryIProps) => {
    return (
        <>
            <div>Diagnoses:</div>
            <ul>
                {entry.diagnosisCodes?.map(code =>
                    <li key={code}>{code}: {diagnoses.find(x => x.code === code)?.name}</li>
                )}
            </ul>
        </>
    )
}

export default Diagnoses