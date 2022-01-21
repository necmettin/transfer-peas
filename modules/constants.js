export default {
	// defaults
	defSkip: 0, // just here for pagination
	defTake: 20, // default page size
	// server
	server: {
		qliksense: "Qlik Sense",
	},
	// tables
	table: {
		Axes: "axes",
		Blocks: "blocks",
		BlockTypes: "blocktypes",
		Companies: "companies",
		Servers: "servers",
		DataSources: "datasources",
		Templates: "templates",
		TemplateBlocks: "template_blocks",
		Pages: "pages",
		Users: "users",
		Perms: "perms",
		Roles: "roles",
		RolePerms: "role_perms",
		UserRoles: "user_roles",
		UserPerms: "user_perms",
	},
	datatype: {
		listbox: {
			qliksense: "listbox",
			title: {
				singular: {
					tr: "Liste",
					en: "Listing",
				}
			}
		}, kpi: {
			qliksense: "kpi",
			title: {
				singular: {
					tr: "TPG",
					en: "KPI",
				}
			}
		}, barchart: {
			qliksense: "barchart",
			title: {
				singular: {
					tr: "Çubuk grafik",
					en: "Bar chart",
				}
			}
		}, linechart: {
			qliksense: "linechart",
			title: {
				singular: {
					tr: "Çizgi grafik",
					en: "Line chart",
				}
			}
		}, boxplot: {
			qliksense: "boxplot",
			title: {
				singular: {
					tr: "Kutu grafik",
					en: "Box plot",
				}
			}
		}, combochart: {
			qliksense: "combochart",
			title: {
				singular: {
					tr: "Birleşik grafik",
					en: "Combined chart",
				}
			}
		}, distributionplot: {
			qliksense: "distributionplot",
			title: {
				singular: {
					tr: "Dağıtım grafiği",
					en: "Distribution plot",
				}
			}
		}, gauge: {
			qliksense: "gauge",
			title: {
				singular: {
					tr: "Gösterge",
					en: "Gauge",
				}
			}
		}, histogram: {
			qliksense: "histogram",
			title: {
				singular: {
					tr: "Histogram",
					en: "Histogram",
				}
			}
		}, piechart: {
			qliksense: "piechart",
			title: {
				singular: {
					tr: "Pasta grafik",
					en: "Pie chart",
				}
			}
		}, pivottable: {
			qliksense: "pivot-table",
			title: {
				singular: {
					tr: "Pivot tablo",
					en: "Pivot table",
				}
			}
		}, scatterplot: {
			qliksense: "scatterplot",
			title: {
				singular: {
					tr: "Dağılım grafiği",
					en: "Scatterplot",
				}
			}
		}, table: {
			qliksense: "table",
			title: {
				singular: {
					tr: "Tablo",
					en: "Table",
				}
			}
		}, treemap: {
			qliksense: "treemap",
			title: {
				singular: {
					tr: "Ağaç",
					en: "Tree",
				}
			}
		}, waterfall: {
			qliksense: "waterfallchart",
			title: {
				singular: {
					tr: "Şelale grafik",
					en: "Waterfall chart",
				}
			}
		},
	}
};
