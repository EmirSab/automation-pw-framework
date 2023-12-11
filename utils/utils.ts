export function CalculateTimeDifference(startTime: DateTime, endTime: string) {
    const startExecutionDateTime = startTime;
    const endExecutionDateTime = new Date(endTime);
    const endExecutionDateTimeToDate = new Date(endExecutionDateTime);
    const startDateTime = startExecutionDateTime.getTime();
    const endDateTime = endExecutionDateTimeToDate.getTime();
    const diff = startDateTime - endDateTime;
    return Math.floor(diff / 1000);
}