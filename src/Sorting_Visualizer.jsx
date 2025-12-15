import React from "react";
import "./Sorting_Visualizer.css";
import { getMergeSortAnimations, getQuickSortAnimations } from "./SortingAlog";

export default class Sorting_Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array: [] };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 50; i++) {
      array.push(randomIntFromInterval(10, 600));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;

      setTimeout(() => {
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const color = i % 3 === 0 ? "pink" : "turquoise";
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        } else {
          const [barIdx, newHeight] = animations[i];
          arrayBars[barIdx].style.height = `${newHeight}px`;
        }
      }, i * 10);
    }
    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = "pink";
      }
    }, animations.length * 10);
  }

  quicksort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    const SPEED = 50;

    animations.forEach((animation, i) => {
      const [type, barOne, barTwo] = animation;

      if (type === "compare") {
        setTimeout(() => {
          arrayBars[barOne].style.backgroundColor = "red";
          arrayBars[barTwo].style.backgroundColor = "red";
        }, i * SPEED);

        setTimeout(() => {
          arrayBars[barOne].style.backgroundColor = "turquoise";
          arrayBars[barTwo].style.backgroundColor = "turquoise";
        }, i * SPEED + SPEED / 2);
      }

      if (type === "swap") {
        setTimeout(() => {
          const temp = arrayBars[barOne].style.height;
          arrayBars[barOne].style.height = arrayBars[barTwo].style.height;
          arrayBars[barTwo].style.height = temp;
        }, i * SPEED);
      }
    });

    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = "green";
      }
    }, animations.length * 50);
  }

  heapsort() {}

  bubblesort() {}

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}

        <div className="controls">
          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quicksort()}>Quick Sort</button>
          <button onClick={() => this.heapsort()}>Heap Sort</button>
          <button onClick={() => this.bubblesort()}>Bubble Sort</button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
