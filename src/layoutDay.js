const PADDING = 10;
const CONTAINER_WIDTH = 620;
const CONTAINER_HEIGHT = 720;
const REAL_WIDTH = CONTAINER_WIDTH - 2 * PADDING;
const MAX_MINUTES = 12 * 60;

const areOverlapping = (e1, e2) =>
  (e1.start <= e2.start && e2.start <= e1.end) ||
  (e1.start >= e2.start && e1.start <= e2.end);

// Overlap but not the same event
const areSiblings = (e1, e2) => e1 !== e2 && areOverlapping(e1, e2);

// Assumes event not already in column !
const overlapsWithColumn = (event, events) =>
  events.some(colEvent => areOverlapping(event, colEvent));

const siblingsCluster = (ev, cluster = new Set([ev])) => {
  ev._siblings.forEach(e => {
    if (!cluster.has(e)) {
      cluster.add(e);
      siblingsCluster(e, cluster);
    }
  });

  return [...cluster];
};

const layoutDay = events => {
  // Looks better sorted
  // const sortedEvents = [...events].sort((e1, e2) => e1.start - e2.start);
  const sortedEvents = [...events];
  const layout = [];

  // Place into columns
  const columns = [];
  for (const event of sortedEvents) {
    for (let colIdx = 0; colIdx < columns.length; colIdx++) {
      const column = columns[colIdx];
      const overlapsInColumn = overlapsWithColumn(event, column);

      // No overlap ? place event in column
      if (!overlapsInColumn) {
        event._columnIndex = colIdx;
        column.push(event);
        break;
      }
    }

    // Couldn't place event ? Create a new column then !
    if (event._columnIndex === undefined) {
      event._columnIndex = columns.length;
      columns.push([event]);
    }
  }

  // Compute siblings graph
  for (const event of events) {
    event._siblings = [];
    for (const event2 of events) {
      if (areSiblings(event, event2)) {
        event._siblings.push(event2);
      }
    }
  }

  // Final layout
  for (const event of events) {
    // Must compute the local column max in the event siblings cluster
    const colNb = Math.max(...siblingsCluster(event).map(e => e._columnIndex));
    // 0 indexed -> +1
    const columnWidth = REAL_WIDTH / (colNb + 1);

    const eventLayout = {
      x: Math.round(PADDING + event._columnIndex * columnWidth),
      y: Math.round(event.start / MAX_MINUTES * CONTAINER_HEIGHT),
      width: columnWidth,
      height: Math.round(
        (event.end - event.start) / MAX_MINUTES * CONTAINER_HEIGHT
      ),
    };

    layout.push(eventLayout);
  }

  return layout;
};

export default layoutDay;
