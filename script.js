// =================================================================

const DUMPED_CONTESTANTS = {
    "parm3_sean": "2026-06-08T03:05:25.446900Z",
    "bhatz_track": "2026-06-13T03:37:19.090869Z",
    "itssoll": "2026-06-19T03:08:29.699441Z",
    "gvasconcelosv": "2026-06-19T03:08:29.699441Z",
    "alannahkeyser": "2026-06-26T02:00:11.745000Z" 
};

const BOMBSHELL_CONTESTANTS = {
    "itssoll": "2026-06-09T03:05:34.434731Z",
    "calebbmcdaniell": "2026-06-09T03:05:34.434731Z",
    "jennifertterry": "2026-06-09T03:05:34.434731Z",
    "corbiskii": "2026-06-06T03:05:25.972211Z",
    "gvasconcelosv": "2026-06-03T03:14:13.806403Z",
    "kaydabosse": "2026-06-03T03:14:13.806403Z"
};

const CASA_AMOR = {
    // Girls
    "alannahkeyser": "2026-06-22T03:07:29.699026Z",
    "amoracachee": "2026-06-22T03:07:29.699026Z",
    "jaidenbacciocco": "2026-06-22T03:07:29.699026Z",
    "paaarpaaarri": "2026-06-22T03:07:29.699026Z",
    "sydney_eugene": "2026-06-22T03:07:29.699026Z",
    "tierraaa_._": "2026-06-22T03:07:29.699026Z",
    //Guys
    "carl_witness_lee": "2026-06-23T03:09:38.850699Z",
    "chaynehra": "2026-06-23T03:09:38.850699Z", // Account claimed to be managed by friends/family [Unconfirmed to be official]
    "coreysawyerjr": "2026-06-23T03:09:38.850699Z",
    "dylan_wrona": "2026-06-23T03:09:38.850699Z",
    "gal.tuch": "2026-06-23T03:09:38.850699Z",
    "_ronniegunter": "2026-06-23T03:09:38.850699Z"
};

const EXPELLED = [
    "traetaylorr" // Media-misinformed to have stayed on Casa Amor.
];

const IGNORED_DATA = {
    "chaynehra": "2026-06-21T15:06:05.981481Z" // Account didn't exist yet.
};

// =================================================================

(function() {
    // Obfuscated Apify Key-Value Store Record URL
    const _0x1a = ["\x56\x45\x76\x6f\x66\x42\x56\x4d\x32\x59\x62\x30\x75\x77\x6d\x73\x6b", "\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x61\x70\x69\x66\x79\x2e\x63\x6f\x6d\x2f\x76\x32\x2f\x6b\x65\x79\x2d\x76\x61\x6c\x75\x65\x2d\x73\x74\x6f\x72\x65\x73\x2f", "\x2f\x72\x65\x63\x6f\x72\x64\x73\x2f\x66\x6f\x6c\x6c\x6f\x77\x65\x72\x73\x5f\x68\x69\x73\x74\x6f\x72\x79"];
    const URL = _0x1a[1] + _0x1a[0] + _0x1a[2];
    
    // SVG Paths
    const SVG_BOMB = "M11 21A7 7 0 1011 7A7 7 0 0011 21ZM9 5h4v2H9V5ZM12 5c0-2 2-3 4-3v1c-1.5 0-3 .5-3 2H12ZM17 1l1.5 1.5L17 4l-1.5-1.5L17 1Z";
    const SVG_DOOR = "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16h2V5h10v16h2ZM7 5v16l8-2V7L7 5ZM13 11.5a1 1 0 110 2 1 1 0 010-2Z";
    const SVG_HOUSE = "M12 3L9 6v-2h-2v4L4 11h2v9h4v-6h4v6h4v-9h2Z";
    
    let chartInstance = null;
    let currentTab = 'original';
    let globalData = {
        original: { datasets: [], stats: [] },
        casa_amor: { datasets: [], stats: [] },
        combined: { datasets: [], stats: [] }
    };

    let isDark = false;
    let hasViewedData = false;
    let hasSelectedDataInCurrentTab = false;

    // --- Custom Event Tracking Wrapper ---
    function trackCustomEvent(eventName, eventData = {}) {
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, eventData);
        }
        if (typeof window.umami !== 'undefined') {
            if (typeof window.umami.track === 'function') {
                window.umami.track(eventName, eventData);
            } else if (typeof window.umami === 'function') {
                window.umami(eventName);
            }
        }
    }

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
                        
                        const staticFavicon = document.getElementById('static-favicon');
                        if (staticFavicon) {
                            staticFavicon.style.opacity = '1';
                        }
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
            setTheme(true, false);
        } else {
            isDark = false;
            themeCheckbox.checked = false;
            setTheme(false, false);
        }

        themeCheckbox.addEventListener('change', (e) => {
            setTheme(e.target.checked, true);
        });
    }

    function setTheme(dark, userInitiated = true) {
        isDark = dark;
        
        if (userInitiated) {
            trackCustomEvent('Toggled-Mode', { mode: dark ? 'dark' : 'light' });
        }

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
                buildCustomLegend(chartInstance); 
            }
            renderSidebar();
        }
    }

    // --- Dumped Toggle Logic ---
    function initDumpedToggle() {
        const dumpedCheckbox = document.getElementById('dumped-toggle-checkbox');
        if (!dumpedCheckbox) return;

        dumpedCheckbox.addEventListener('change', (e) => {
            const show = e.target.checked;
            
            trackCustomEvent('Toggled-Dumped', { state: show ? 'show' : 'hide' });
            
            const textShowKicked = document.getElementById('text-show-kicked');
            const textHideKicked = document.getElementById('text-hide-kicked');
            const dumpedThumb = document.getElementById('dumped-thumb');

            if (show) {
                textShowKicked.classList.add('opacity-0');
                textHideKicked.classList.remove('opacity-0');
                dumpedThumb.style.transform = 'translateX(56px)'; 
            } else {
                textShowKicked.classList.remove('opacity-0');
                textHideKicked.classList.add('opacity-0');
                dumpedThumb.style.transform = 'translateX(0)';
            }
            
            ['original', 'casa_amor', 'combined'].forEach(tab => {
                globalData[tab].datasets.forEach(ds => {
                    if (ds.isDumped) {
                        ds.hidden = !show;
                    }
                });
            });

            if (chartInstance) {
                chartInstance.data.datasets.forEach((ds, i) => {
                    if (ds.isDumped) {
                        chartInstance.setDatasetVisibility(i, show);
                    }
                });
                chartInstance.update('none');
                buildCustomLegend(chartInstance);
                renderSidebar();
            }
        });
    }

    function getIconImageString(path, color) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="${color}" d="${path}"/></svg>`;
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }
    
    function getIconImage(path, color) {
        const img = new Image();
        img.src = getIconImageString(path, color);
        return img;
    }

    async function init() {
        initTheme();
        initDumpedToggle();
        
        try {
            const response = await fetch(URL);
            if (!response.ok) throw new Error('Failed to fetch data');
            const rawData = await response.json();
            processData(rawData);
            
            const badge = document.getElementById('status-badge');
            badge.className = 'order-1 lg:order-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800 flex items-center gap-2 transition-colors duration-200';
            badge.innerHTML = `<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span class="inline">Live & Synced</span>`;
            
            // Fired once successfully when the UI is "Live & Synced"
            if (!hasViewedData) {
                trackCustomEvent('viewed-data');
                hasViewedData = true;
            }
            
            // Fired once after user has stayed on the page for 30s
            setTimeout(() => {
                trackCustomEvent('Engaged-User');
            }, 30000);
            
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
        hasSelectedDataInCurrentTab = false; // Reset tooltip tracking on tab switch
        
        let tooltipEl = document.querySelector('.custom-tooltip');
        if (tooltipEl) tooltipEl.style.opacity = 0;
        
        if (chartInstance) {
            chartInstance.tooltip.setActiveElements([], {x:0, y:0});
            chartInstance.setActiveElements([]);
            chartInstance.update('none');
        }

        const btnOriginal = document.getElementById('tab-original');
        const btnCasa = document.getElementById('tab-casa-amor');
        const btnCombined = document.getElementById('tab-combined');
        
        const activeClass = "px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-slate-100 transition-colors whitespace-nowrap";
        const inactiveClass = "px-3 py-1.5 text-sm font-medium rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors whitespace-nowrap";

        btnOriginal.className = (tab === 'original') ? activeClass : inactiveClass;
        btnCasa.className = (tab === 'casa_amor') ? activeClass : inactiveClass;
        btnCombined.className = (tab === 'combined') ? activeClass : inactiveClass;

        renderChart(globalData[tab].datasets);
        renderSidebar();
    }

    function processData(data) {
        const grouped = {};
        const expelledLower = EXPELLED.map(u => u.toLowerCase());
        const casaAmorKeysLower = Object.keys(typeof CASA_AMOR !== 'undefined' ? CASA_AMOR : {}).map(u => u.toLowerCase());

        const ignoredTimes = {};
        if (typeof IGNORED_DATA !== 'undefined') {
            for (let u in IGNORED_DATA) {
                const times = Array.isArray(IGNORED_DATA[u]) ? IGNORED_DATA[u] : [IGNORED_DATA[u]];
                ignoredTimes[u.toLowerCase()] = times.map(t => {
                    const rawDate = new Date(t);
                    const coeff = 1000 * 60 * 5;
                    return Math.round(rawDate.getTime() / coeff) * coeff;
                });
            }
        }

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
            const snappedTime = Math.round(rawDate.getTime() / coeff) * coeff;
            
            if (ignoredTimes[rawName] && ignoredTimes[rawName].includes(snappedTime)) {
                return;
            }
            
            const timeKey = snappedTime;
            
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
        const originalNames = allValidNames.filter(name => !casaAmorKeysLower.includes(name));
        const casaAmorNames = allValidNames.filter(name => casaAmorKeysLower.includes(name));
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
        
        const dumpedCheckbox = document.getElementById('dumped-toggle-checkbox');
        const isShowDumpedToggled = dumpedCheckbox ? dumpedCheckbox.checked : false;

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
                const isDumped = !!dumpedTime;
                
                const bombshellKey = Object.keys(typeof BOMBSHELL_CONTESTANTS !== 'undefined' ? BOMBSHELL_CONTESTANTS : {}).find(k => k.toLowerCase() === cleanName);
                let bombshellTime = bombshellKey ? getAdjTime(BOMBSHELL_CONTESTANTS[bombshellKey]) : null;
                
                const casaAmorKey = Object.keys(typeof CASA_AMOR !== 'undefined' ? CASA_AMOR : {}).find(k => k.toLowerCase() === cleanName);
                let casaAmorTime = casaAmorKey ? getAdjTime(CASA_AMOR[casaAmorKey]) : null;
                const isCasaAmor = !!casaAmorKey;
                
                const createDatasetObj = (colorMap, tabName) => {
                    const customHue = colorMap[cleanName];
                    const pointStyleTypes = [];
                    const pointRadii = [];
                    
                    let innerHasDumped = false;
                    let innerHasBombshell = false;
                    let innerHasCasaAmorEntry = false;

                    // Fixed bug: Check dumped status last to overwrite any icons
                    let legendIconType = 'circle';
                    if (tabName === 'combined' && isCasaAmor) legendIconType = 'house';
                    if (bombshellTime) legendIconType = 'bomb';
                    if (isDumped) legendIconType = 'door';

                    points.forEach((pt, idx) => {
                        let pointIsBomb = false;
                        let pointIsDoor = false;
                        let pointIsCasaAmorEntry = false;
                        
                        if (bombshellTime && pt.x.getTime() >= bombshellTime && !innerHasBombshell) {
                            pointIsBomb = true;
                            innerHasBombshell = true;
                        }
                        if (isDumped && pt.x.getTime() >= dumpedTime && !innerHasDumped) {
                            pointIsDoor = true;
                            innerHasDumped = true;
                        }
                        
                        if (casaAmorTime && pt.x.getTime() >= casaAmorTime && !innerHasCasaAmorEntry) {
                            pointIsCasaAmorEntry = true;
                            innerHasCasaAmorEntry = true;
                        }
                        
                        let currentPointType = 'circle';
                        
                        if (tabName === 'combined' && isCasaAmor && (pointIsCasaAmorEntry || (idx === 0 && !casaAmorTime))) {
                            currentPointType = 'house';
                        }
                        if (pointIsBomb) currentPointType = 'bomb';
                        if (pointIsDoor) currentPointType = 'door';

                        pointStyleTypes.push(currentPointType);
                        pointRadii.push(currentPointType === 'circle' ? 1 : 7);
                    });

                    return {
                        label: `@${username}`,
                        data: points,
                        hidden: isDumped ? !isShowDumpedToggled : false, 
                        isDumped: isDumped,
                        customHue: customHue,
                        legendIconType: legendIconType,
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
                                if (isDumped && p0Time >= dumpedTime) return [6, 4];
                                if (bombshellTime && p0Time < bombshellTime) return [6, 4];
                                if (isCasaAmor && casaAmorTime && p0Time < casaAmorTime) return [6, 4];
                                return undefined;
                            }
                        }
                    };
                };

                if (isCasaAmor) {
                    globalData.casa_amor.stats.push(statObj);
                    globalData.casa_amor.datasets.push(createDatasetObj(palettes.casa_amor, 'casa_amor'));
                } else {
                    globalData.original.stats.push(statObj);
                    globalData.original.datasets.push(createDatasetObj(palettes.original, 'original'));
                }
                
                globalData.combined.stats.push(statObj);
                globalData.combined.datasets.push(createDatasetObj(palettes.combined, 'combined'));
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
                const houseIcon = getIconImage(SVG_HOUSE, color);

                ds.pointStyle = ds.pointStyleTypes.map(type => {
                    if(type === 'door') return doorIcon;
                    if(type === 'bomb') return bombIcon;
                    if(type === 'house') return houseIcon;
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
            
            chartInstance.options.plugins.tooltip.backgroundColor = tooltipBg;
            chartInstance.options.plugins.tooltip.titleColor = tooltipText;
            chartInstance.options.plugins.tooltip.bodyColor = tooltipText;
        }
    }

    const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div.custom-tooltip');
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.classList.add('custom-tooltip');
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.zIndex = '50';
            tooltipEl.style.transition = 'opacity 0.1s ease, transform 0.1s ease';
            chart.canvas.parentNode.appendChild(tooltipEl);
        }
        return tooltipEl;
    };

    const customTooltipHandler = (context) => {
        const {chart, tooltip} = context;
        const tooltipEl = getOrCreateTooltip(chart);

        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            tooltipEl.style.pointerEvents = 'none';
            return;
        }

        if (tooltip.body) {
            const dataPoints = context.tooltip.dataPoints;
            const sortedDp = [...dataPoints].sort((a,b) => b.raw.y - a.raw.y);

            let html = `
                <div class="px-3 py-2 bg-slate-900/95 dark:bg-slate-800/95 text-white rounded-lg shadow-xl text-[11px] lg:text-xs font-sans border border-slate-700/50 max-h-[250px] lg:max-h-[350px] overflow-y-auto pointer-events-auto overscroll-contain">
                    <div class="font-bold mb-2 pb-1 border-b border-slate-700">${tooltip.title[0]}</div>
                    <div class="flex flex-col gap-1">
            `;

            sortedDp.forEach(dp => {
                const ds = chart.data.datasets[dp.datasetIndex];
                const val = new Intl.NumberFormat('en-US').format(dp.raw.y);
                html += `
                    <div class="flex items-center justify-between gap-4">
                        <div class="flex items-center gap-1.5 truncate">
                            <span class="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0" style="background-color: ${ds.borderColor}"></span>
                            <span class="truncate">${ds.label}</span>
                        </div>
                        <span class="font-medium flex-shrink-0">${val}</span>
                    </div>
                `;
            });

            html += `</div></div>`;
            tooltipEl.innerHTML = html;
        }

        const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
        const chartWidth = chart.canvas.offsetWidth;

        let posX = positionX + tooltip.caretX;
        let posY = positionY + tooltip.caretY;

        let translateX = '-50%';
        if (tooltip.caretX > chartWidth - 120) {
            translateX = '-100%';
            posX -= 10;
        } else if (tooltip.caretX < 120) {
            translateX = '0%';
            posX += 10;
        }

        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'auto'; 
        tooltipEl.style.left = posX + 'px';
        tooltipEl.style.top = posY + 'px';
        tooltipEl.style.transform = `translate(${translateX}, 10px)`;
    };

    function buildCustomLegend(chart) {
        const legendContainer = document.getElementById('custom-legend');
        legendContainer.innerHTML = '';
        const datasets = chart.data.datasets;
        const textColorClass = isDark ? 'text-slate-300' : 'text-slate-600';

        datasets.forEach((dataset, i) => {
            const item = document.createElement('div');
            item.className = `flex items-center cursor-pointer text-xs lg:text-sm font-medium transition-opacity duration-200 p-2 sm:px-2 sm:py-1 m-0.5 touch-manipulation select-none ${textColorClass}`;
            
            if (!chart.isDatasetVisible(i)) {
                item.classList.add('opacity-40', 'line-through');
            } else {
                item.classList.add('opacity-100');
            }

            const color = dataset.borderColor;
            const iconType = dataset.legendIconType;
            let iconHtml = '';
            
            if (iconType === 'door') {
                iconHtml = `<img src="${getIconImageString(SVG_DOOR, color)}" alt="Dumped Icon" class="w-3.5 h-3.5 mr-1.5 object-contain" width="14" height="14">`;
            } else if (iconType === 'bomb') {
                iconHtml = `<img src="${getIconImageString(SVG_BOMB, color)}" alt="Bombshell Icon" class="w-3.5 h-3.5 mr-1.5 object-contain" width="14" height="14">`;
            } else if (iconType === 'house') {
                iconHtml = `<img src="${getIconImageString(SVG_HOUSE, color)}" alt="Casa Amor Icon" class="w-3.5 h-3.5 mr-1.5 object-contain" width="14" height="14">`;
            } else {
                iconHtml = `<span class="inline-block w-3 h-3 rounded-full mr-1.5 flex-shrink-0" style="background-color: ${color}"></span>`;
            }
            
            item.innerHTML = `${iconHtml}<span>${dataset.label}</span>`;

            item.onclick = () => {
                chart.setDatasetVisibility(i, !chart.isDatasetVisible(i));
                chart.update('none'); 
                buildCustomLegend(chart);
                renderSidebar(); 
            };
            legendContainer.appendChild(item);
        });
    }

    window.addEventListener('resize', () => {
        if (chartInstance) {
            const isDesktop = window.innerWidth >= 1024;
            if (chartInstance.options.plugins.tooltip.enabled !== isDesktop) {
                chartInstance.options.plugins.tooltip.enabled = isDesktop;
                chartInstance.update('none');
            }
        }
    });

    function renderChart(datasets) {
        const ctx = document.getElementById('followerChart').getContext('2d');
        if (chartInstance) {
            chartInstance.destroy();
        }
        
        const isDesktop = window.innerWidth >= 1024;
        
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: { datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                onClick: (e, elements, chart) => {
                    // Close tooltip if clicking empty space on the graph
                    if (elements.length === 0) {
                        chart.tooltip.setActiveElements([], {x:0, y:0});
                        chart.setActiveElements([]);
                        chart.update('none');
                        let tooltipEl = document.querySelector('.custom-tooltip');
                        if (tooltipEl) tooltipEl.style.opacity = 0;
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: false 
                    },
                    tooltip: {
                        enabled: isDesktop,
                        usePointStyle: true,
                        boxWidth: 8,
                        
                        external: function(context) {
                            // Selected-Data Tracking Event per Tab
                            if (!hasSelectedDataInCurrentTab && context.tooltip.opacity > 0) {
                                trackCustomEvent('Selected-Data');
                                hasSelectedDataInCurrentTab = true;
                            }
                            
                            if (window.innerWidth >= 1024) {
                                let tooltipEl = document.querySelector('.custom-tooltip');
                                if (tooltipEl) tooltipEl.style.opacity = 0;
                                return;
                            }
                            customTooltipHandler(context);
                        },
                        
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
        buildCustomLegend(chartInstance); 
    }

    function renderSidebar() {
        const container = document.getElementById('ranking-container');
        container.innerHTML = '';

        if (!chartInstance || !chartInstance.data.datasets) {
            container.innerHTML = `<div class="text-sm text-slate-500 dark:text-slate-400 text-center py-8">No valid data found.</div>`;
            return;
        }

        const visibleUsernames = chartInstance.data.datasets
            .filter((ds, index) => chartInstance.isDatasetVisible(index))
            .map(ds => ds.label.replace('@', '').toLowerCase());

        const stats = globalData[currentTab].stats.filter(stat => 
            visibleUsernames.includes(stat.username.toLowerCase())
        );

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

    // --- About Tracker Interaction Logic ---
    function initAboutTracker() {
        const details = document.getElementById('about-details');
        const faqArea = document.getElementById('about-faq-area');
        const summary = details ? details.querySelector('summary') : null;
        if (!details || !faqArea || !summary) return;

        let faqViewed = false;

        // Force native behavior override for mobile consistency
        summary.addEventListener('click', (e) => {
            e.preventDefault(); // Stop native toggle
            if (details.hasAttribute('open')) {
                details.removeAttribute('open');
            } else {
                details.setAttribute('open', '');
                
                // Track first open
                if (!faqViewed) {
                    trackCustomEvent('Viewed-FAQ-Summary');
                    faqViewed = true;
                }
                
                // Allow the DOM to render the expanded state, then scroll it into view
                setTimeout(() => {
                    details.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }, 50);
            }
        });

        // Handle clicks outside or above the FAQ area
        document.addEventListener('click', (e) => {
            if (details.hasAttribute('open')) {
                // Don't trigger outside click logic if tapping the summary element itself
                if (summary.contains(e.target)) return;

                const faqRect = faqArea.getBoundingClientRect();
                
                // If the click is above the FAQ area (includes the text above it or outside the footer entirely)
                if (e.clientY < faqRect.top) {
                    details.removeAttribute('open');
                }
            }
        });

        // Handle swipe down to close
        let touchStartY = 0;
        document.addEventListener('touchstart', (e) => {
            if (e.changedTouches.length > 0) {
                touchStartY = e.changedTouches[0].screenY;
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (details.hasAttribute('open') && e.changedTouches.length > 0) {
                const touchEndY = e.changedTouches[0].screenY;
                
                // Don't trigger swipe close if they are just tapping the summary
                if (summary.contains(e.target)) return;

                // Threshold of 60px down-swipe to ensure it wasn't a mistaken slight scroll
                if (touchEndY - touchStartY > 60) {
                    details.removeAttribute('open');
                }
            }
        }, { passive: true });
    }
    
    // Setup generic trackers
    function initLinkTrackers() {
        const container = document.getElementById('ranking-container');
        if (container) {
            container.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (link && link.href && link.href.includes('instagram.com')) {
                    trackCustomEvent('Redirected-To-Instagram', { url: link.href });
                }
            });
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('tab-original').addEventListener('click', () => { trackCustomEvent('Switched-To-Original'); switchTab('original'); });
        document.getElementById('tab-casa-amor').addEventListener('click', () => { trackCustomEvent('Switched-To-Casa-Amor'); switchTab('casa_amor'); });
        document.getElementById('tab-combined').addEventListener('click', () => { trackCustomEvent('Switched-To-Combined'); switchTab('combined'); });
        
        init();
        initAnimatedLogo();
        initAboutTracker();
        initLinkTrackers();
    });
})();

window.addEventListener('beforeunload', () => {
  if (typeof window.umami !== 'undefined' && typeof window.umami.track === 'function') {
    window.umami.track();
  }
});
