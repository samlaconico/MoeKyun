export default function Rating() {
  return (
    <div className="flex flex-row">
      {[...Array(5)].map((v, i) => {
        return <Star key={i} />;
      })}
    </div>
  );
}

function Star() {
  return <h1>star</h1>;
}
