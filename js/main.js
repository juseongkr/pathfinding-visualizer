const map = jsboard.board({
	attach: "game",
	size: CONFIG.WIDTH + 'x' + CONFIG.HEIGHT,
	style: "checkerboard",
	stylePattern: CONFIG.COLORS.PATTERN,
});

const cells = {
	start: jsboard.piece({
		text: "START",
		fontSize: "0px",
		background: CONFIG.COLORS.START,
		...CONFIG.STYLE,
	}),

	end: jsboard.piece({
		text: "END",
		fontSize: "0px",
		background: CONFIG.COLORS.END,
		...CONFIG.STYLE,
	}),

	go: jsboard.piece({
		text: "GO",
		fontSize: "0px",
		background: CONFIG.COLORS.GO,
		...CONFIG.STYLE,
	}),

	wall: jsboard.piece({
		text: "WALL",
		fontSize: "0px",
		background: CONFIG.COLORS.WALL,
		...CONFIG.STYLE,
	}),

	path: jsboard.piece({
		text: "PATH",
		fontSize: "0px",
		background: CONFIG.COLORS.PATH,
		...CONFIG.STYLE,
	}),

	empty: jsboard.piece({
		text: "-",
		fontSize: "0px",
		...CONFIG.STYLE,
	}),
};

map.cell("each").style({
	...CONFIG.STYLE,
});

Random();
map.cell("each").on("click", function() {
	switch (options.command) {
		case "WALL":
			if (map.cell(this).get() === 'WALL') {
				map.cell(this).rid();
				[x, y] = map.cell(this).where();
				visit[x][y] = false;
			} else {
				map.cell(this).place(cells.wall.clone());
				[x, y] = map.cell(this).where();
				visit[x][y] = true;
			}
			break;
		case "START":
			map.cell([startX, startY]).rid();
			[startX, startY] = map.cell(this).where();
			visit[startX][startY] = 0;
			map.cell(this).place(cells.start.clone());
			break;
		case "END":
			map.cell([endX, endY]).rid();
			[endX, endY] = map.cell(this).where();
			visit[endX][endY] = 0;
			map.cell(this).place(cells.end.clone());
			break;
		default:
	}
});