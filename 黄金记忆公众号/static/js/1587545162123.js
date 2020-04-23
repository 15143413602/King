
		var area1 = new LArea();
		area1.init({
			'trigger': '#demo1',
			'valueTo': '#value1',
			'keys': {
				id: 'id',
				name: 'name'
			},
			'type': 1,
			'data': LAreaData
		});
		area1.value=[1,13,3];
		var area2 = new LArea();
		area2.init({
			'trigger': '#demo2',
			'valueTo': '#value2',
			'keys': {
				id: 'value',
				name: 'text'
			},
			'type': 2,
			'data': [provs_data, citys_data, dists_data]
		});
		