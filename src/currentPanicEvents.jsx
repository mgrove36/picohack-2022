function CurrentPanicEvents(props) {
  return (
    <table>
      <tr>
        <th>Patient</th>
        <th>Location</th>
        <th>Time</th>
        <th>Respondees</th>
      </tr>
      {props.map((panicEvent) => (
        <tr>
          <td>{panicEvent.patient}</td>
          <td>{panicEvent.location}</td>
          <td>{panicEvent.timestamp}</td>
          <td>{panicEvent.patient}</td>
          {panicEvent.respondees}
        </tr>
      ))}
    </table>
  );
};
