# Profiler Dashboard Demo
## Background
I wanted to create a system for collecting app render statistics and displaying them in a "performance dashboard" component.
The performance statistics would be collected using the [React.Profiler](https://reactjs.org/docs/profiler.html) component.
The challenging bit was how to avoid an infinite loop of upadtes. 
If the profiled components and the Dashboard are part of the same app and the performance stats would be collected globally, each render will cause the app to re-render which will cause the app to enter a loop of re-renders.

Solving this problem for local cases was relatively easy using `React.memo` on the profiled components so they won't re-render when only the stats info changes.

However, I wanted a generic solution that could be dropped into a project without needing special changes.

Using context proved unsuitable as:
1) It required a global wrapping Provider to gather the statistics
2) Updating statistics can only be done via a state mechanism so every update causes the entire tree below the Provider to re-render, taking us back to square one

Eventually I went for something similar to how Redux works with hooks.
I use a plain Javascript object to hold the data and have functions that update it. This allows me to control which components get re-rendered when this info changes.
Essentially I only want the Dashboard components to re-render with the new performance stats, and not the Profiler components which were just updated and produced the new statistics.
Each Dashoard component uses the custom `usePerfStats` hook which registers it for re-rendering when the stats are updated.

## Usage
1. Wrap the components you want to measure with `Profiler` component. This component takes an `id` prop
2. Implement one or more `Dashboard` component that use the `usePerfStats` hook. This hook exposes all the collected performance readings and re-renders the component when they change.

The only caveat is to make sure the `usePerfStats` hook is never used inside a `<Profiler>` tree as this will cause an infinite re-render loop.

Included in this repo is a reference implementation of a dashboard component.

## Future work
Mainly improving the Dashboard component - add charts, time stamps and make use of more of the info provided by `React.Profiler`


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
