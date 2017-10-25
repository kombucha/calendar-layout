const PADDING = 10;
const CONTAINER_WIDTH = 620;
const CONTAINER_HEIGHT = 720;
const REAL_WIDTH = CONTAINER_WIDTH - 2 * PADDING;
const MAX_MINUTES = 12 * 60;

const areOverlapping = (e1, e2) =>
  (e1.start <= e2.start && e2.start <= e1.end) ||
  (e1.start >= e2.start && e1.start <= e2.end);

// Assumes event not already in column !
const overlapsWithColumn = (event, events) =>
  events.some(colEvent => areOverlapping(event, colEvent));

const layoutDay = events => {
  // Looks better sorted
  // const sortedEvents = [...events];
  const sortedEvents = [...events].sort((e1, e2) => e1.start - e2.start);
  const layout = [];

  // Place into columns
  const columns = [];
  for (const event of sortedEvents) {
    // First event
    if (columns.length === 0) {
      columns.push([event]);
      continue;
    }

    let placed = false;
    for (let colIdx = 0; colIdx < columns.length; colIdx++) {
      const column = columns[colIdx];
      const overlapsInColumn = overlapsWithColumn(event, column);

      // No overlap ? place event in column
      if (!overlapsInColumn) {
        placed = true;
        column.push(event);
        break;
      }
    }

    // Couldn't place event ? Create a new column then !
    if (!placed) {
      columns.push([event]);
    }
  }

  // Final pass => compute width and place events
  const columnsCount = columns.length;
  const columnWidth = REAL_WIDTH / columnsCount;
  for (let colIdx = 0; colIdx < columnsCount; colIdx++) {
    const column = columns[colIdx];
    for (let j = 0; j < column.length; j++) {
      const event = column[j];
      let span = 1;

      for (let k = colIdx + 1; k < columnsCount; k++) {
        const nextColumn = columns[k];
        const overlapsWithNextColumn = overlapsWithColumn(event, nextColumn);

        if (!overlapsWithNextColumn) {
          span += 1;
        } else {
          break;
        }
      }

      // Place event, hurray \o/
      layout.push({
        x: Math.round(PADDING + colIdx * columnWidth),
        y: Math.round(event.start / MAX_MINUTES * CONTAINER_HEIGHT),
        width: Math.round(columnWidth * span),
        height: Math.round(
          (event.end - event.start) / MAX_MINUTES * CONTAINER_HEIGHT
        ),
      });
    }
  }

  return layout;
};

export default layoutDay;
