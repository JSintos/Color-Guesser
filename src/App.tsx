import { useEffect, useState } from "react";
import "./App.css";
import { shuffle } from "lodash";

// This function gets a random number from min to max, inclusive
function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This function converts a valid RGB value into its hex counterpart
function convertRGBtoHex(value: number) {
	return value.toString(16).length == 1 ? "0" + value.toString(16) : value.toString(16);
}

// This function returns a random color in string format
function getRandomColor() {
	return (
		"#" +
		convertRGBtoHex(getRandomNumber(0, 255)) +
		convertRGBtoHex(getRandomNumber(0, 255)) +
		convertRGBtoHex(getRandomNumber(0, 255))
	);
}

function App() {
	const [randomColor, setRandomColor] = useState("");
	const [choices, setChoices] = useState<string[]>([]);
	const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);

	const instantiateRound = () => {
		const answer = getRandomColor();

		setRandomColor(answer);
		setChoices(shuffle([answer, getRandomColor(), getRandomColor()]));
	};

	// Empty dependency array means that the code runs everytime the component renders
	useEffect(() => {
		instantiateRound();
	}, []);

	const handleClick = (choice: string) => {
		if (randomColor === choice) {
			setIsCorrect(true);

			instantiateRound();
		} else {
			setIsCorrect(false);
		}
	};

	return (
		<div className='App'>
			{isCorrect === true && <div className='result'>Nice job! Try again</div>}
			{isCorrect === false && <div className='result'>Wrong answer! Try again</div>}

			<div
				id='coloredSquare'
				style={{ background: randomColor }}
			></div>

			{choices.map((choice) => (
				<button
					onClick={() => handleClick(choice)}
					key={choice}
				>
					{choice}
				</button>
			))}
		</div>
	);
}

export default App;
