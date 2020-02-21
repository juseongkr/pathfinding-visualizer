let width = CONFIG.WIDTH;
let height = CONFIG.HEIGHT;
let startX = CONFIG.START_X;
let startY = CONFIG.START_Y;
let endX = CONFIG.END_X;
let endY = CONFIG.END_Y;
let visit = Array.from({length: width}, () => Array(height).fill(0));

checkRange = (x, y) => {
	return !(x < 0 || x >= width || y < 0 || y >= height);
}

getRandom = (min = 1, max = 9) => {
	return Math.floor(Math.random() * (max - min) + min);
}

shuffle = (arr) => {
	for (let i=arr.length-1; i>0; i--) {
		let j = Math.floor(Math.random() * (i+1));
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}

getEmpty = () => {
	let empty = []
	visit.forEach((row, y) => {
		row.forEach((val, x) => {
			if (map.cell([x, y]).get() !== 'WALL') {
				empty.push([x, y]);
			}
		});
	});
	return empty;
}

getWalls = () => {
	let walls = []
	visit.forEach((row, y) => {
		row.forEach((val, x) => {
			if (map.cell([x, y]).get() === 'WALL') {
				walls.push([x, y]);
			}
		});
	});
	return walls;
}

clearVisit = () => {
	visit.forEach((row, y) => {
		row.forEach((val, x) => {
			visit[x][y] = false;
			if (map.cell([x, y]).get() === 'GO' || map.cell([x, y]).get() === 'PATH') {
				map.cell([x, y]).place(cells.empty.clone());
			} else if (map.cell([x, y]).get() === 'WALL') {
				visit[x][y] = true;
			}
		});
	});
}

clearBoard = () => {
	map.cell('each').place(cells.empty.clone());
}

setRandomPos = () => {
	let empty = shuffle(getEmpty());
	[startX, startY] = empty.shift();
	[endX, endY] = empty.shift();
	map.cell([startX, startY]).place(cells.start.clone());
	map.cell([endX, endY]).place(cells.end.clone());
}

setRandomWalls = () => {
	visit.forEach((row, y) => {
		row.forEach((val, x) => {
			if ((getRandom() % CONFIG.WALL_CNT) === 0) {
				map.cell([x, y]).place(cells.wall.clone());
				visit[x][y] = true;
			}
		});
	});
}

showPath = (path, len) => {
	len = len || path.length;
	path.forEach((pos, i) => {
		setTimeout(() => {
			if (i < len) {
				map.cell([pos[0], pos[1]]).place(cells.go.clone());
			} else {
				map.cell([pos[0], pos[1]]).place(cells.path.clone());
			}
		}, CONFIG.SPEED * i);
	});
}

setStart = () => { options.command = "START"; }
setEnd = () => { options.command = "END"; }
setWall = () => { options.command = "WALL"; }
setDFS = () => { options.type = "dfs"; }
setBFS = () => { options.type = "bfs"; }

Reset = () => {
	clearBoard();
	clearVisit();
	setRandomPos();
}

Random = () => {
	clearBoard();
	clearVisit();
	setRandomWalls();
	setRandomPos();
}

Clear = () => {
	clearVisit();
}

Run = () => {
	switch (options.type) {
		case "dfs":
			dfs();
			break;
		case "bfs":
			bfs();
			break;
		default:
	}
}