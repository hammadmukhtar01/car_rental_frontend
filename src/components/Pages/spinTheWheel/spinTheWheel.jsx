import "./spinTheWheel.css";
import WheelComponent from "react-wheel-of-prizes";

export default function SpinTheWheel() {
  const segments = [
    "Better luck next time",
    "1 Week Free Bugatti",
    "10% Discount",
  ];
  const segColors = ["green", "purple", "orange"];
  const onFinished = (winner) => {
    console.log(winner);
  };
  return (
    <div className="App">
      <div>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor=""
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={250}
          upDuration={200}
          downDuration={900}
        />
      </div>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  )
}