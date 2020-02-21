dfs = () => {
	let flag = false;
	let path = [];

	__dfs = (x, y) => {
		if (visit[x][y])
			return;

		visit[x][y] = true;
		for (let i=0; i<CONFIG.DIR; ++i) {
			let nx = x + CONFIG.DX[i];
			let ny = y + CONFIG.DY[i];
	
			if (flag || (nx === endX && ny === endY)) {
				flag = true;
				return;
			}
	
			if (checkRange(nx, ny) && !visit[nx][ny]) {
				path.push([nx, ny]);
				__dfs(nx, ny);
			}
		}
	}

	__dfs(startX, startY);

	if (flag) {
		showPath(path);
	} else {
		alert("Path not found");
	}
}

bfs = () => {
	let path_len = 0;
	let ret = [];

	__bfs = () => {
		let que = [];

		visit[startX][startY] = true;
		que.push([startX, startY, []]);
		
		while (que.length) {
			let cur = que.shift();
	
			for (let i=0; i<CONFIG.DIR; ++i) {
				let nx = cur[0] + CONFIG.DX[i];
				let ny = cur[1] + CONFIG.DY[i];
	
				if (nx === endX && ny === endY) {
					path_len = ret.length;
					cur[2].forEach((val, i) => ret.push(val));
					return true;
				}
	
				if (checkRange(nx, ny) && !visit[nx][ny]) {
					visit[nx][ny] = true;
					let path = JSON.parse(JSON.stringify(cur[2]));
					path.push([nx, ny]);
					que.push([nx, ny, path]);
					ret.push([nx, ny]);
				}
			}
		}
		return false;
	}
	
	if (__bfs()) {
		showPath(ret, path_len);
	} else {
		alert("Path not found");
	}
}