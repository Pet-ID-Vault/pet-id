export default function ExplorerLink({ hash }) {
  return (
    <>
      <h2>Transaction successful</h2>
      <a href={`https://explorer.helium.fhenix.zone/tx/${hash}`}>{hash}</a>
    </>
  );
}