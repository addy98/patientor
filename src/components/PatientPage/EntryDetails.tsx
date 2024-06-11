import { EntryIProps } from "../../types"
import { HealthAndSafetyTwoTone, MedicalInformationTwoTone, MonitorHeartTwoTone } from "@mui/icons-material"
import BaseEntry from "./BaseEntry";

const EntryDetails = ({ entry, diagnoses }: EntryIProps) => {
    switch (entry.type) {
        case "Hospital":
            return (
                <>
                    <fieldset>
                        <legend><MonitorHeartTwoTone /></legend>
                        <BaseEntry entry={entry} diagnoses={diagnoses} />
                        <div>Discharge: {entry.discharge.date} - {entry.discharge.criteria}</div>
                        
                    </fieldset>
                </>
            )
        case "OccupationalHealthcare":
            return (
                <>
                    <fieldset>
                        <legend><HealthAndSafetyTwoTone /></legend>
                        <BaseEntry entry={entry} diagnoses={diagnoses} />
                        <div>Employer: {entry.employerName}</div>
                        <div>Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</div>
                    </fieldset>
                </>
            )
        case "HealthCheck":
            return (
                <>
                    <fieldset>
                        <legend><MedicalInformationTwoTone /></legend>
                        <BaseEntry entry={entry} diagnoses={diagnoses} />
                        <div>Health check rating: {entry.healthCheckRating}</div>
                    </fieldset>
                </>
            )
        default:
            return
    }
}

export default EntryDetails