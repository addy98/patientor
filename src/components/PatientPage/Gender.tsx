import { Male, Female, Transgender } from "@mui/icons-material"
import { Patient } from "../../types"

interface IProps {
    patient: Patient
}

const Gender = ({ patient }: IProps) => {
    switch (patient.gender) {
        case 'male':
            return <Male />
        case 'female':
            return <Female />
        default:
            return <Transgender />
    }
}

export default Gender