// =================================================================

const DUMPED_CONTESTANTS = {
    "parm3_sean": "2026-06-08T03:05:25.446900Z",
    "bhatz_track": "2026-06-13T03:37:19.090869Z",
    "itssoll": "2026-06-19T03:08:29.699441Z",
    "gvasconcelosv": "2026-06-19T03:08:29.699441Z"
};

const BOMBSHELL_CONTESTANTS = {
    "itssoll": "2026-06-09T03:05:34.434731Z",
    "calebbmcdaniell": "2026-06-09T03:05:34.434731Z",
    "jennifertterry": "2026-06-09T03:05:34.434731Z",
    "corbiskii": "2026-06-06T03:05:25.972211Z",
    "gvasconcelosv": "2026-06-03T03:14:13.806403Z",
    "kaydabosse": "2026-06-03T03:14:13.806403Z"
};

const CASA_AMOR = [
    "alannahkeyser",
    "amoracachee",
    "jaidenbacciocco",
    "paaarpaaarri",
    "sydney_eugene",
    "tierraaa_._"
];

const EXPELLED = [
    // "alannahkeyser"
];

// =================================================================

(function() {
    const _0x1a = ["\x75\x66\x56\x45\x68\x4a\x63\x73\x30\x51\x42\x38\x44\x32\x70\x71\x32", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x61\x70\x69\x66\x79\x2E\x63\x6F\x6D\x2F\x76\x32\x2F\x64\x61\x74\x61\x73\x65\x74\x73\x2F", "\x2F\x69\x74\x65\x6D\x73"];
    const URL = _0x1a[1] + _0x1a[0] + _0x1a[2];
    const SVG_BOMB = "M11 21A7 7 0 1011 7A7 7 0 0011 21ZM9 5h4v2H9V5ZM12 5c0-2 2-3 4-3v1c-1.5 0-3 .5-3 2H12ZM17 1l1.5 1.5L17 4l-1.5-1.5L17 1Z";
    const SVG_DOOR = "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16h2V5h10v16h2ZM7 5v16l8-2V7L7 5ZM13 11.5a1 1 0 110 2 1 1 0 010-2Z";
    
    let chartInstance = null;
    let currentTab = 'original';
    let globalData = {
        original: { datasets: [], stats: [] },
        casa_amor: { datasets: [], stats: [] },
        combined: { datasets: [], stats: [] }
    };

    let isDark = false;

    // --- Animated Logo Initialization ---
    function initAnimatedLogo() {
        const title = document.querySelector('.site-title');
        const heart = document.querySelector('.heart-container');
        const heartSvg = heart ? heart.querySelector('svg') : null;
        if (!title || !heart || !heartSvg) return;

        const SWIPE_DELAY = 300;
        const SWIPE_DURATION = 2000;
        const STILL_DURATION = 1500;
        const FADE_DURATION = 600;
        const SOFT_EDGE = 28;

        function easeInOut(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function run() {
            const titleRect = title.getBoundingClientRect();
            const heartW = heartSvg.getBoundingClientRect().width || 42;
            const titleW = titleRect.width;
            const heartCenter = heartW / 2;

            const startX = -heartW;
            const endX = titleW;
            const totalTravel = endX - startX;

            let startTime = null;

            function step(ts) {
                if (!startTime) startTime = ts;
                const elapsed = ts - startTime - SWIPE_DELAY;

                if (elapsed < 0) {
                    title.style.webkitMaskImage = 'linear-gradient(to right, transparent 0%, transparent 100%)';
                    title.style.maskImage = title.style.webkitMaskImage;
                    heart.style.left = startX + 'px';
                    heart.style.transform = 'translateY(-50%)';
                    requestAnimationFrame(step);
                    return;
                }

                const rawT = Math.min(elapsed / SWIPE_DURATION, 1);
                const t = easeInOut(rawT);

                const heartX = startX + t * totalTravel;
                heart.style.left = heartX + 'px';
                heart.style.transform = 'translateY(-50%)';

                const revealEdgePx = heartX + heartCenter;
                const solidEndPx  = revealEdgePx - SOFT_EDGE;
                const fadeEndPx   = revealEdgePx;

                const solidPct = Math.min(100, Math.max(0, (solidEndPx / titleW) * 100));
                const fadePct  = Math.min(100, Math.max(0, (fadeEndPx  / titleW) * 100));

                let mask;
                if (fadePct <= 0) {
                    mask = 'linear-gradient(to right, transparent 0%, transparent 100%)';
                } else if (solidPct >= 100) {
                    mask = 'linear-gradient(to right, black 0%, black 100%)';
                } else if (solidPct <= 0) {
                    mask = `linear-gradient(to right, transparent 0%, black ${fadePct.toFixed(2)}%, transparent ${fadePct.toFixed(2)}%, transparent 100%)`;
                } else {
                    mask = `linear-gradient(to right, black 0%, black ${solidPct.toFixed(2)}%, transparent ${fadePct.toFixed(2)}%, transparent 100%)`;
                }

                title.style.webkitMaskImage = mask;
                title.style.maskImage = mask;

                if (rawT < 1) {
                    requestAnimationFrame(step);
                } else {
                    title.style.webkitMaskImage = 'none';
                    title.style.maskImage = 'none';
                    heart.style.left = endX + 'px';

                    setTimeout(() => {
                        heart.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
                        heart.style.opacity = '0';
                    }, STILL_DURATION);
                }
            }
            requestAnimationFrame(step);
        }

        if (document.fonts) {
            document.fonts.ready.then(run);
        } else {
            setTimeout(run, 300);
        }
    }

    // --- Theme Logic ---
    function initTheme() {
        const themeCheckbox = document.getElementById('theme-toggle-checkbox');
        
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            isDark = true;
            themeCheckbox.checked = true;
            setTheme(true);
        } else {
            isDark = false;
            themeCheckbox.checked = false;
            setTheme(false);
        }

        themeCheckbox.addEventListener('change', (e) => {
            setTheme(e.target.checked);
        });
    }

    function setTheme(dark) {
        isDark = dark;
        
        const textLight = document.getElementById('text-light');
        const textDark = document.getElementById('text-dark');
        const iconSun = document.getElementById('icon-sun');
        const iconMoon = document.getElementById('icon-moon');
        const themeThumb = document.getElementById('theme-thumb');

        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            
            textLight.classList.add('opacity-0');
            textDark.classList.remove('opacity-0');
            iconSun.classList.add('opacity-0');
            iconMoon.classList.remove('opacity-0');
            
            themeThumb.style.transform = 'translateX(72px)'; 
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            
            textLight.classList.remove('opacity-0');
            textDark.classList.add('opacity-0');
            iconSun.classList.remove('opacity-0');
            iconMoon.classList.add('opacity-0');
            
            themeThumb.style.transform = 'translateX(0)';
        }

        if (globalData.original.datasets.length > 0) {
            applyThemeColors();
            if (chartInstance) {
                updateChartThemeOptions();
                chartInstance.update();
            }
            renderSidebar(globalData[currentTab].stats);
        }
    }

    function getIconImage(path, color) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="${encodeURIComponent(color)}" d="${path}"/></svg>`;
        const img = new Image();
        img.src = 'data:image/svg+xml;charset=utf-8,' + svg;
        return img;
    }

    async function init() {
        initTheme();
        try {
            const response = await fetch(URL);
            if (!response.ok) throw new Error('Failed to fetch dataset');
            const rawData = await response.json();
            processData(rawData);
            
            const badge = document.getElementById('status-badge');
            badge.className = 'order-1 lg:order-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800 flex items-center gap-2 transition-colors duration-200';
            badge.innerHTML = `<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span class="inline">Live & Synced</span>`;
        } catch (error) {
            console.error('Error fetching data:', error);
            const badge = document.getElementById('status-badge');
            badge.className = 'order-1 lg:order-2 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-red-200 dark:border-red-800 flex items-center gap-2 transition-colors duration-200';
            badge.innerHTML = `Error loading data`;
        }
    }

    function getAdjTime(ts) {
        if (!ts) return null;
        const d = new Date(ts);
        return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).getTime();
    }

    function switchTab(tab) {
        currentTab = tab;
        const btnOriginal = document.getElementById('tab-original');
        const btnCasa = document.getElementById('tab-casa-amor');
        const btnCombined = document.getElementById('tab-combined');
        
        const activeClass = "px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-slate-100 transition-all whitespace-nowrap";
        const inactiveClass = "px-3 py-1.5 text-sm font-medium rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all whitespace-nowrap";

        btnOriginal.className = (tab === 'original') ? activeClass : inactiveClass;
        btnCasa.className = (tab === 'casa_amor') ? activeClass : inactiveClass;
        btnCombined.className = (tab === 'combined') ? activeClass : inactiveClass;

        renderChart(globalData[tab].datasets);
        renderSidebar(globalData[tab].stats);
    }

    function processData(data) {
        const grouped = {};
        const expelledLower = EXPELLED.map(u => u.toLowerCase());
        const casaAmorLower = CASA_AMOR.map(u => u.toLowerCase());

        const validData = data.filter(d => {
            if (d.followersCount === undefined || !d.timestamp) return false;
            const rawName = String(d.username).trim().toLowerCase();
            if (!rawName || rawName === 'null' || rawName === 'undefined') return false;
            if (expelledLower.includes(rawName)) return false;
            return true;
        });

        validData.forEach(d => {
            const rawName = String(d.username).trim().toLowerCase();
            const rawDate = new Date(d.timestamp);
            const coeff = 1000 * 60 * 5;
            const snappedTime = new Date(Math.round(rawDate.getTime() / coeff) * coeff);
            const timeKey = snappedTime.getTime();
            
            if (!grouped[rawName]) {
                grouped[rawName] = {
                    pointsMap: {},
                    originalUsername: String(d.username).trim()
                };
            }
            if (!grouped[rawName].pointsMap[timeKey]) {
                grouped[rawName].pointsMap[timeKey] = {
                    sum: d.followersCount,
                    count: 1,
                    fullName: d.fullName
                };
            } else {
                grouped[rawName].pointsMap[timeKey].sum += d.followersCount;
                grouped[rawName].pointsMap[timeKey].count += 1;
                if (d.fullName) grouped[rawName].pointsMap[timeKey].fullName = d.fullName;
            }
        });

        for (let cleanName in grouped) {
            const map = grouped[cleanName].pointsMap;
            const points = [];
            for (let timeKey in map) {
                points.push({
                    x: new Date(parseInt(timeKey)),
                    y: Math.round(map[timeKey].sum / map[timeKey].count),
                    fullName: map[timeKey].fullName
                });
            }
            points.sort((a, b) => a.x - b.x);
            grouped[cleanName].points = points;
        }

        const allValidNames = Object.keys(grouped).filter(name => grouped[name].points.length > 0);
        const originalNames = allValidNames.filter(name => !casaAmorLower.includes(name));
        const casaAmorNames = allValidNames.filter(name => casaAmorLower.includes(name));
        const combinedNames = [...allValidNames];

        function generateColorMap(usernames) {
            const map = {};
            const GOLDEN_ANGLE = 137.508;
            
            const sortedByFollowers = [...usernames].sort((a, b) => {
                const aLast = grouped[a].points[grouped[a].points.length - 1].y;
                const bLast = grouped[b].points[grouped[b].points.length - 1].y;
                return bLast - aLast; 
            });

            sortedByFollowers.forEach((username, idx) => {
                const hue = Math.floor((idx * GOLDEN_ANGLE) % 360);
                map[username] = hue;
            });
            return map;
        }

        const palettes = {
            original: generateColorMap(originalNames),
            casa_amor: generateColorMap(casaAmorNames),
            combined: generateColorMap(combinedNames)
        };

        globalData.original.datasets = [];
        globalData.original.stats = [];
        globalData.casa_amor.datasets = [];
        globalData.casa_amor.stats = [];
        globalData.combined.datasets = [];
        globalData.combined.stats = [];

        for (let cleanName in grouped) {
            const points = grouped[cleanName].points;
            const username = grouped[cleanName].originalUsername;
            
            if (points.length > 0) {
                const firstVal = points[0].y;
                const lastVal = points[points.length - 1].y;
                const increase = lastVal - firstVal;
                let latestFullName = "";
                
                for (let i = points.length - 1; i >= 0; i--) {
                    if (points[i].fullName && points[i].fullName.trim() !== "") {
                        latestFullName = points[i].fullName.trim();
                        break;
                    }
                }

                const statObj = {
                    username,
                    fullName: latestFullName,
                    increase,
                    current: lastVal,
                    first: firstVal
                };

                const dumpedKey = Object.keys(typeof DUMPED_CONTESTANTS !== 'undefined' ? DUMPED_CONTESTANTS : {}).find(k => k.toLowerCase() === cleanName);
                let dumpedTime = dumpedKey ? getAdjTime(DUMPED_CONTESTANTS[dumpedKey]) : null;
                const bombshellKey = Object.keys(typeof BOMBSHELL_CONTESTANTS !== 'undefined' ? BOMBSHELL_CONTESTANTS : {}).find(k => k.toLowerCase() === cleanName);
                let bombshellTime = bombshellKey ? getAdjTime(BOMBSHELL_CONTESTANTS[bombshellKey]) : null;
                
                const createDatasetObj = (colorMap) => {
                    const customHue = colorMap[cleanName];
                    const pointStyleTypes = [];
                    const pointRadii = [];
                    
                    let innerHasDumped = false;
                    let innerHasBombshell = false;

                    points.forEach((pt) => {
                        let pointIsBomb = false;
                        let pointIsDoor = false;
                        if (bombshellTime && pt.x.getTime() >= bombshellTime && !innerHasBombshell) {
                            pointIsBomb = true;
                            innerHasBombshell = true;
                        }
                        if (dumpedTime && pt.x.getTime() >= dumpedTime && !innerHasDumped) {
                            pointIsDoor = true;
                            innerHasDumped = true;
                        }
                        if (pointIsDoor) {
                            pointStyleTypes.push('door');
                            pointRadii.push(7);
                        } else if (pointIsBomb) {
                            pointStyleTypes.push('bomb');
                            pointRadii.push(7);
                        } else {
                            pointStyleTypes.push('circle');
                            pointRadii.push(1);
                        }
                    });

                    return {
                        label: `@${username}`,
                        data: points,
                        customHue: customHue,
                        isDumped: !!dumpedTime,
                        isBombshell: !!bombshellTime,
                        pointStyleTypes: pointStyleTypes,
                        pointRadius: pointRadii,
                        pointHoverRadius: 6,
                        borderWidth: 2,
                        tension: 0.3,
                        fill: false,
                        spanGaps: true,
                        segment: {
                            borderDash: ctx => {
                                const p0Time = points[ctx.p0DataIndex].x.getTime();
                                if (dumpedTime && p0Time >= dumpedTime) return [6, 4];
                                if (bombshellTime && p0Time < bombshellTime) return [6, 4];
                                return undefined;
                            }
                        }
                    };
                };

                const isCasaAmor = casaAmorLower.includes(cleanName);
                
                if (isCasaAmor) {
                    globalData.casa_amor.stats.push(statObj);
                    globalData.casa_amor.datasets.push(createDatasetObj(palettes.casa_amor));
                } else {
                    globalData.original.stats.push(statObj);
                    globalData.original.datasets.push(createDatasetObj(palettes.original));
                }
                
                globalData.combined.stats.push(statObj);
                globalData.combined.datasets.push(createDatasetObj(palettes.combined));
            }
        }

        const sortDescByFollowers = (a, b) => {
            const aLast = a.data[a.data.length - 1].y;
            const bLast = b.data[b.data.length - 1].y;
            return bLast - aLast; 
        };

        ['original', 'casa_amor', 'combined'].forEach(tabKey => {
            globalData[tabKey].datasets.sort(sortDescByFollowers);
            globalData[tabKey].datasets.forEach((ds, index) => {
                ds.order = index;
            });
            globalData[tabKey].stats.sort((a, b) => b.increase - a.increase);
        });

        applyThemeColors();
        switchTab(currentTab);
    }

    function applyThemeColors() {
        const lightness = isDark ? 65 : 42; 

        ['original', 'casa_amor', 'combined'].forEach(tabKey => {
            globalData[tabKey].datasets.forEach(ds => {
                const color = `hsl(${ds.customHue}, 84%, ${lightness}%)`;
                
                ds.borderColor = color;
                ds.backgroundColor = color;
                
                const bombIcon = getIconImage(SVG_BOMB, color);
                const doorIcon = getIconImage(SVG_DOOR, color);

                ds.legendPointStyle = ds.isDumped ? doorIcon : (ds.isBombshell ? bombIcon : 'circle');

                ds.pointStyle = ds.pointStyleTypes.map(type => {
                    if(type === 'door') return doorIcon;
                    if(type === 'bomb') return bombIcon;
                    return 'circle';
                });
            });
        });
    }

    function updateChartThemeOptions() {
        const textColor = isDark ? '#e2e8f0' : '#475569'; 
        const gridColor = isDark ? '#334155' : '#f1f5f9'; 
        const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.9)';
        const tooltipText = '#f8fafc';

        if(chartInstance) {
            chartInstance.options.scales.x.ticks.color = textColor;
            chartInstance.options.scales.y.ticks.color = textColor;
            chartInstance.options.scales.y.grid.color = gridColor;
            
            if (chartInstance.options.plugins.legend.labels) {
                chartInstance.options.plugins.legend.labels.color = textColor;
            }
            
            chartInstance.options.plugins.tooltip.backgroundColor = tooltipBg;
            chartInstance.options.plugins.tooltip.titleColor = tooltipText;
            chartInstance.options.plugins.tooltip.bodyColor = tooltipText;
        }
    }

    function renderChart(datasets) {
        const ctx = document.getElementById('followerChart').getContext('2d');
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        const initialTextColor = isDark ? '#e2e8f0' : '#475569';
        
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: initialTextColor,
                            usePointStyle: true,
                            boxWidth: 16,
                            padding: 20,
                            font: { family: 'Inter', size: 12 },
                            generateLabels: function(chart) {
                                return chart.data.datasets.map((dataset, i) => ({
                                    text: dataset.label,
                                    fillStyle: dataset.backgroundColor,
                                    strokeStyle: dataset.borderColor,
                                    lineWidth: dataset.borderWidth,
                                    pointStyle: dataset.legendPointStyle || 'circle',
                                    hidden: !chart.isDatasetVisible(i),
                                    datasetIndex: i
                                }));
                            }
                        }
                    },
                    tooltip: {
                        titleFont: { family: 'Inter', size: 13 },
                        bodyFont: { family: 'Inter', size: 12 },
                        padding: 12,
                        cornerRadius: 8,
                        itemSort: function(a, b) {
                            return b.raw.y - a.raw.y;
                        },
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US').format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            tooltipFormat: 'MMM d, yyyy HH:mm',
                            displayFormats: { hour: 'MMM d, HH:mm', day: 'MMM d' }
                        },
                        grid: { display: false },
                        ticks: { font: { family: 'Inter' }, maxRotation: 45, minRotation: 45 }
                    },
                    y: {
                        grid: { drawBorder: false },
                        ticks: {
                            font: { family: 'Inter' },
                            callback: function(value) {
                                if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                                if (value >= 1000) return (value / 1000).toFixed(1) + 'k';
                                return value;
                            }
                        }
                    }
                }
            }
        });

        updateChartThemeOptions();
        chartInstance.update();
    }

    function renderSidebar(stats) {
        const container = document.getElementById('ranking-container');
        container.innerHTML = '';
        if (stats.length === 0) {
            container.innerHTML = `<div class="text-sm text-slate-500 dark:text-slate-400 text-center py-8">No valid data found.</div>`;
            return;
        }
        stats.forEach((stat, index) => {
            const increaseFormatted = new Intl.NumberFormat('en-US').format(stat.increase);
            const currentFormatted = new Intl.NumberFormat('en-US').format(stat.current);
            const isPositive = stat.increase >= 0;
            const signStr = isPositive ? '+' : '';
            
            const textClass = isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400';
            const bgClass = isPositive ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30';
            
            let rankBadge = `<span class="text-xs font-bold text-slate-400 dark:text-slate-300 w-5 text-center">${index+1}</span>`;
            if (index === 0) rankBadge = `<span class="text-lg" title="1st Place">🥇</span>`;
            if (index === 1) rankBadge = `<span class="text-lg" title="2nd Place">🥈</span>`;
            if (index === 2) rankBadge = `<span class="text-lg" title="3rd Place">🥉</span>`;
            
            const nameHtml = stat.fullName ? `<p class="text-[11px] text-slate-400 dark:text-slate-300 truncate mt-0.5">${stat.fullName}</p>` : '';
            
            const cardHtml = `
                <div class="flex items-center p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors bg-white dark:bg-slate-800 shadow-sm group">
                    <div class="mr-3 flex items-center justify-center w-6 flex-shrink-0">
                        ${rankBadge}
                    </div>
                    <div class="flex-1 min-w-0 pr-2">
                        <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate flex items-center">
                            @${stat.username}
                            <a href="https://instagram.com/${stat.username}" target="_blank" rel="noopener noreferrer" class="ml-1 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors opacity-100 lg:opacity-0 group-hover:opacity-100 focus:opacity-100" title="View Instagram Profile" aria-label="Visit ${stat.username}'s Instagram">
                                &#8599;
                            </a>
                        </p>
                        ${nameHtml}
                    </div>
                    <div class="text-right ml-2 flex flex-col items-end flex-shrink-0">
                        <span class="inline-flex items-center px-2 py-1 rounded text-xs font-bold ${bgClass} ${textClass} mb-1">
                            ${signStr}${increaseFormatted}
                        </span>
                        <span class="text-[11px] font-medium text-slate-500 dark:text-slate-400">${currentFormatted} total</span>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', cardHtml);
        });
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('tab-original').addEventListener('click', () => switchTab('original'));
        document.getElementById('tab-casa-amor').addEventListener('click', () => switchTab('casa_amor'));
        document.getElementById('tab-combined').addEventListener('click', () => switchTab('combined'));
        init();
        initAnimatedLogo();
    });
})();