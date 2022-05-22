import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

const movementsRoot = document.getElementById("movements-root");

class AnimateMovementPortal extends React.Component {
  private el: Element;

  constructor(props: any) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement("div");
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    if (movementsRoot) {
      movementsRoot.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    if (movementsRoot) {
      movementsRoot.removeChild(this.el);
    }
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el
    );
  }
}

export default function AnimateMovement(props: {
  children: React.ReactNode;
  fromElementId: string;
  toElementId: string;
  markerWidth: number;
  markerHeight: number;
  delay?: number;
  successNode?: React.ReactNode;
  onComplete?: () => void;
}) {
  const [start, setStart] = useState(false);
  const { markerWidth, markerHeight } = props;
  const [finished, setFinished] = useState(false);
  const [animateFrom, setAnimateFrom] = useState<null | {
    left: number;
    top: number;
  }>(null);
  const [animateTo, setAnimateTo] = useState<null | {
    left: number;
    top: number;
  }>(null);

  useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, props.delay || 0);
  }, [props.delay]);

  useEffect(() => {
    const toElement = document.getElementById(props.toElementId);
    const fromElement = document.getElementById(props.fromElementId);

    if (fromElement) {
      const rect = fromElement.getBoundingClientRect();

      setAnimateFrom({
        left: rect.left + rect.width / 2 - markerWidth / 2,
        top: rect.top + rect.height / 2 - markerHeight / 2,
      });
    }

    if (toElement) {
      const rect = toElement.getBoundingClientRect();

      setAnimateTo({
        left: rect.left + rect.width / 2 - markerWidth / 2,
        top: rect.top - rect.height / 2 - 2, // fix later
      });
    }
  }, [props.fromElementId, props.toElementId, markerHeight, markerWidth]);

  if (animateTo && animateFrom && start) {
    return (
      <AnimateMovementPortal>
        <motion.div
          style={{
            position: "absolute",
            textAlign: "center",
            width: markerWidth,
            height: 30,
            scale: 1.8,
            top: animateFrom.top,
            left: animateFrom.left,
          }}
          animate={{
            top: animateTo.top,
            left: animateTo.left,
            scale: 1,
          }}
          transition={{
            type: "spring",
            velocity: 0.5,
            duration: 1.5,
            damping: 20,
            delay: 0.5,
          }}
          onAnimationComplete={() => {
            setFinished(true);

            if (props.onComplete) {
              props.onComplete();
            }
          }}
        >
          {finished
            ? props.successNode
              ? props.successNode
              : null
            : props.children}
        </motion.div>
      </AnimateMovementPortal>
    );
  }

  return null;
}
