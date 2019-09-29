# Profiler Dashboard Demo
## Background
I wanted to utilize the [React.Profiler](https://reactjs.org/docs/profiler.html) component to collect performance statistics from components and display them in one or more "performance dashboard" component.

For this goal we need to **gloablly share state** (the performance statistics) between **providers** (the profiled components) and **consumers** (the dashboard components).

The challenging bit was how to avoid getting into an infinite loop of upadtes.  
If the profiled components and the Dashboard are both children of the component that holds the sahered state, then a render of a profiled component will cause the shared state to change causing the tree to re-render (including the profiled components) and so forth, infinitely.  

Solving this problem for local, specific cases was relatively easy using `React.memo` on the profiled components which stops the loop because when new render stats arrive their actual props don't change so they won't re-render.  

However, I wanted a generic solution that could be dropped into a project without needing special changes in the app structure.

Considering we need gloabl shared state, providers and consumers suggests we should use the context API.  
However it proved to be unsuitable:
1) It required a global wrapping Provider to gather the statistics
2) Updating the `Context.Provider` value statistics can only be done via a state mechanism so every update causes the entire tree below the Provider to re-render, taking us back to square one

Eventually I went for something similar to how Redux works with hooks.  
A plain Javascript object is used to hold the data with functions that control how it is updated. This allows to control which components get re-rendered when the data changes.  
Essentially we only want the Dashboard components to re-render with the new performance stats, and not the Profiler components which were just updated and produced the new statistics.  
To achieve that, each Dashoard component uses the custom `usePerfStats` hook which registers it for explicit re-rendering when the stats are updated.

## Usage
1. Wrap the components you want to measure with `Profiler` component. This component takes an `id` prop
2. Implement one or more `Dashboard` component that use the `usePerfStats` hook. This hook exposes all the collected performance readings and re-renders the component when they change.

## Caveats
`Profiler` should never be used in side a dashbord (a component that uses the `usePerfStats` hook) and a dashboard should never be inside a `Profiler`.  
Breaking this rule will cause an infinite re-render loop.

Included in this repo is a reference implementation of a dashboard component.

## Future work
Mainly improving the Dashboard component - add charts, time stamps and make use of more of the info provided by `React.Profiler`


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
