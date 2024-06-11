import { Button, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material"
import { Diagnosis, EntryFormValues, HealthCheckRating } from "../../types"
import { SyntheticEvent, useEffect, useState } from "react"
import diagnosisService from '../../services/diagnoses'

interface IProps {
    closeEntryModal: () => void,
    onSubmit: (values: EntryFormValues) => void
}

const AddEntryForm = ({ closeEntryModal, onSubmit }: IProps) => {

    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [specialist, setSpecialist] = useState('')
    const [diagnosisCodes, setDiagnosisCodes] = useState(Array<Diagnosis['code']>)
    const [type, setType] = useState('')

    const [dischargeDate, setDischargeDate] = useState('')
    const [dischargeCriteria, setDischargeCriteria] = useState('')
    const [discharge, setDischarge] = useState({date: '', criteria: ''})

    const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy)

    const [employerName, setEmployerName] = useState('')
    const [sickLeaveStart, setSickLeaveStart] = useState('')
    const [sickLeaveEnd, setSickLeaveEnd] = useState('')
    const [sickLeave, setSickLeave] = useState({startDate: '', endDate: ''})

    const [diagnosisList, setDiagnosisList] = useState(Array<Diagnosis>)

    useEffect(() => {
        setDischarge({date: dischargeDate, criteria: dischargeCriteria})
    }, [dischargeDate, dischargeCriteria])

    useEffect(() => {
        setSickLeave({startDate: sickLeaveStart, endDate: sickLeaveEnd})
    }, [sickLeaveStart, sickLeaveEnd])

    useEffect(() => {
        diagnosisService.getAll()
            .then((data) => setDiagnosisList(data))
    }, [])

    const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
        if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
            throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
        }
        return healthCheckRating;
    }

    const isHealthCheckRating = (param: number): param is HealthCheckRating => {
        return Object.values(HealthCheckRating).includes(param);
    }

    const isNumber = (text: unknown): text is number => {
        return typeof text === 'number' || text instanceof Number;
    }

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault()
        switch(type) {
            case 'HealthCheck':
                onSubmit({
                    description,
                    date,
                    specialist,
                    diagnosisCodes,
                    type,
                    healthCheckRating
                })
                break
            case 'Hospital':
                onSubmit({
                    description,
                    date,
                    specialist,
                    diagnosisCodes,
                    type,
                    discharge
                })
                break
            case 'OccupationalHealthcare':
                onSubmit({
                    description,
                    date,
                    specialist,
                    diagnosisCodes,
                    type,
                    employerName,
                    sickLeave
                })
                break
        }
        
    }

    const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
          target: { value },
        } = event;
        setDiagnosisCodes(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    return (
        <form onSubmit={addEntry}>
            <InputLabel id='type-label'>Type</InputLabel>
            <Select
            labelId='type-label'
            fullWidth
            value={type}
            onChange={({ target }) => setType(target.value)}>
                <MenuItem value={'HealthCheck'}>Health check</MenuItem>
                <MenuItem value={'Hospital'}>Hospital</MenuItem>
                <MenuItem value={'OccupationalHealthcare'}>Occupational healthcare</MenuItem>
            </Select>
            <InputLabel>Description</InputLabel>
            <TextField
                fullWidth
                value={description}
                onChange={({ target }) => setDescription(target.value)}
            />
            <InputLabel>Date</InputLabel>
            <OutlinedInput
                type="date"
                fullWidth
                value={date}
                onChange={({ target }) => setDate(target.value)}
            />
            <InputLabel>Specialist</InputLabel>
            <TextField
                fullWidth
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
            />
            <InputLabel id='diagnosis-codes'>Diagnosis codes</InputLabel>
            <Select
                labelId='diagnosis-codes'
                multiple
                value={diagnosisCodes}
                onChange={handleChange}
                input={<OutlinedInput label='Diagnosis codes' />}
            >
                {diagnosisList.map((diagnosis) => {
                    return (
                        <MenuItem
                        key={diagnosis.code}
                        value={diagnosis.code}
                        >
                            {diagnosis.code}
                        </MenuItem>
                    )
                })}
            </Select>
            {type === 'HealthCheck' && (
                <>
                <InputLabel id='healthcheck-rating-label'>Health check rating</InputLabel>
                <Select
                labelId='healthcheck-rating-label'
                fullWidth
                value={healthCheckRating}
                onChange={({ target }) => setHealthCheckRating(parseHealthCheckRating(target.value))}>
                    <MenuItem value={HealthCheckRating.Healthy}>0</MenuItem>
                    <MenuItem value={HealthCheckRating.LowRisk}>1</MenuItem>
                    <MenuItem value={HealthCheckRating.HighRisk}>2</MenuItem>
                    <MenuItem value={HealthCheckRating.CriticalRisk}>3</MenuItem>
                </Select>
                </>
            )}
            {type === 'Hospital' && (
                <>
                <InputLabel>Discharge date</InputLabel>
                <OutlinedInput
                    type="date"
                    fullWidth
                    value={dischargeDate}
                    onChange={({ target }) => setDischargeDate(target.value)}
                />
                <InputLabel>Discharge criteria</InputLabel>
                <TextField
                    fullWidth
                    value={dischargeCriteria}
                    onChange={({ target }) => setDischargeCriteria(target.value)}
                />
                </>
            )}
            {type === 'OccupationalHealthcare' && (
                <>
                <InputLabel>Employer</InputLabel>
                <TextField
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                />
                <InputLabel>Sick leave start date</InputLabel>
                <OutlinedInput
                    type="date"
                    fullWidth
                    value={sickLeaveStart}
                    onChange={({ target }) => setSickLeaveStart(target.value)}
                />
                <InputLabel>Sick leave end date</InputLabel>
                <OutlinedInput
                    type="date"
                    fullWidth
                    value={sickLeaveEnd}
                    onChange={({ target }) => setSickLeaveEnd(target.value)}
                />
                </>
            )}
            <Grid>
                <Grid item>
                <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={closeEntryModal}
                >
                    Close
                </Button>
                </Grid>
                <Grid item>
                <Button
                    style={{
                    float: "right",
                    }}
                    type="submit"
                    variant="contained"
                >
                    Add
                </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default AddEntryForm