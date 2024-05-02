import { Patient } from "../types"
import { Male, Female, Transgender } from "@mui/icons-material"

interface IProps {
    patient: Patient
}

const PatientPage = ({ patient }: IProps) => {

    switch (patient.gender) {
        case 'male':
            return (
                <>
                    <h3>{patient.name}</h3>
                    <Male />
                    <div>ssn: {patient.ssn}</div>
                    <div>occupation: {patient.occupation}</div>
                </>
            )
        case 'female':
            return (
                <>
                    <h3>{patient.name}</h3>
                    <Female />
                    <div>ssn: {patient.ssn}</div>
                    <div>occupation: {patient.occupation}</div>
                </>
            )
        case 'other':
            return (
                <>
                    <h3>{patient.name}</h3>
                    <Transgender />
                    <div>ssn: {patient.ssn}</div>
                    <div>occupation: {patient.occupation}</div>
                </>
            )
    }
}

export default PatientPage