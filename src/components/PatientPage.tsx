import { Patient } from "../types"

interface IProps {
    patient: Patient
}

const PatientPage = ({ patient }: IProps) => {
    return (
        <>
            <h3>{patient.name}</h3>
            <div>{patient.gender}</div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
        </>
        
    )
}

export default PatientPage