import React from "react";

//
// Important!
//
// make sure that usePerfStats hook is not used inside the <Profiler> tree
// as this will cause an infinite loop:
// 1. A child of Profiler re-renders
// 2. Profiler callback is run
// 3. The usePerfStats component will re-render to reflect the new results
// 4. The usePerfStats component is a child of <Profiler>, so goto 1

// Helper vars
let globalStats = {};
const callbacks = {};
let regId = 0;

// Listeners management
const registerCallback = (id, cb) => {
  callbacks[id] = cb;
};

const unregisterCallback = id => {
  callbacks.delete(id);
};

// Set stats and notify listeners
const setGlobalStats = stats => {
  globalStats = stats;
  // Notify all listeners
  Object.values(callbacks).forEach(cb => cb());
};

// Profiler onRender callback
function onRenderCb(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  setGlobalStats({
    ...globalStats,
    [id]: {
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions
    }
  });
}

// The Profiler component
// Wrap this around the tree to measure
export const Profiler = React.memo(props => {
  const { id, children } = props;
  const [, forceRender] = React.useReducer(s => s + 1, 0);

  // Render initial call
  React.useLayoutEffect(() => {
    forceRender({});
  }, []);

  return (
    <React.Profiler id={id} onRender={onRenderCb}>
      {children}
    </React.Profiler>
  );
});

// Custom hook
// Will cause a re-render of components that use it
export const usePerfStats = () => {
  const [, forceRender] = React.useReducer(s => s + 1, 0);
  React.useEffect(() => {
    // console.log("reg cb", regId);
    registerCallback(regId, () => forceRender({}));
    const cleanup = (regId => () => {
      // console.log("unreg cb", regId);
      unregisterCallback(regId);
    })(regId);
    regId++;
    return cleanup;
  }, []);

  return globalStats;
};

// a render-prop version of the custom hook
// for use in class compnents
export const PerfStats = props => {
  const { children } = props;
  const stats = usePerfStats();

  return children(stats);
};
