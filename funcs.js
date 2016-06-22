function getQueryParams() {
    var a = window.location.search.substring(1)
      , b = a.split('&')
      , c = {};
    if ('' == a)
        return {};
    for (a = 0; a < b.length; a++) {
        var d = b[a].split('=');
        c[decodeURIComponent(d[0])] = decodeURIComponent(d[1])
    }
    return c
};

function createVideoElem(video) {
    var el = document.createElement('video');
    el.controls = 1;
    el.preload = '';
    el.poster = './player-default.png';
    el.src = video;
    document.getElementById('player').appendChild(el);
};

function setTitle(match) {
    document.title = 'UEFA Euro 2016 - ' + match.home + ' (' + match.homeCode + ') vs. ' + match.away + ' (' + match.awayCode + ') - Full match [HD]';
    document.getElementById('home').innerHTML = match.home;
    document.getElementById('away').innerHTML = match.away;
    document.getElementById('homeCode').innerHTML = match.homeCode;
    document.getElementById('awayCode').innerHTML = match.awayCode;
    document.getElementById('homeGoals').innerHTML = match.homeGoals;
    document.getElementById('awayGoals').innerHTML = match.awayGoals;
};

function setDate(date) {
    document.getElementById('date').innerHTML = date;
};

function setVenue(venue) {
    document.getElementById('venue').innerHTML = venue;
};

function setStage(stage) {
    document.getElementById('stage').innerHTML = stage;
};

function setGroup(group) {
    document.getElementById('group').innerHTML = ', Group ' + group;
};

function setVideos(videos, label) {
    if (!!videos.source) {
        createVideoElem('http://' + videos.source.url);
        setDuration(videos.source.time);
        setBroadcast(videos.source.broadcastId);
    }

    if (!!videos.streamcloud) {
        setStreamcloudLink(getStreamcloudUrl(videos.streamcloud.hash), label);

        if (!videos.source) {
            setDuration(videos.streamcloud.time);
            setBroadcast(videos.streamcloud.broadcastId);
        }
    }
};

function setBroadcast(broadcastId) {
    var name = getBroadcast(broadcastId);
    document.getElementById('broadcast').textContent = name;
    setQuality(name);
};

function setQuality(broadcastName) {
    var q = ('ARD' !== broadcastName) ? '1280*720 px, 3329 kbps, 25 fps' : '960*540 px, 1988 kbps, 25 fps';
    document.getElementById('quality').textContent = q;
};

function setDuration(videoLength) {
    document.getElementById('duration').textContent = videoLength;
};

function setStreamcloudLink(url, label) {
    var el = document.createElement('span');
    el.className = 'link-extern';
    el.innerHTML = 'If on-page player does not load, you can always <a onclick="javascript:onStreamcloudLinkClicked(\'' + label + '\');" href="' + url + '" target="_blank">watch this match on StreamCloud</a>. &nbsp; | ';
    document.getElementById('allMatches').parentNode.insertBefore(el, document.getElementById('allMatches'));
    document.getElementById('allMatches').innerHTML = '&nbsp; ' + document.getElementById('allMatches').innerHTML;
};

function onStreamcloudLinkClicked(label) {
    console.log('tracking streamcloud link click for ' + label);
    ga('send', 'event', {
        eventCategory: 'Streamcloud Link',
        eventAction: 'click',
        eventLabel: label
    });
};

function getUefaMatchUrl(uefaMatchId) {
    return 'http://www.uefa.com/uefaeuro/season=2016/matches/round=2000448/match=' + uefaMatchId + '/index.html';
};

function getHashtag(homeCode, awayCode) {
    return '#' + homeCode + awayCode;
};

function getStage(stageId) {
    var stages = [
        'Group stage, Matchday 1',
        'Group stage, Matchday 2',
        'Group stage, Matchday 3',
        'Knockout stage, Round of 16',
        'Knockout stage, Quarter-finals',
        'Knockout stage, Semi-finals',
        'Knockout stage, Finals'
    ];

    return stages[stageId];
};

function getVenue(venueId) {
    var venues = [
        'Stade de France - Saint-Denis',
        'Stade Bollaert-Delelis - Lens Agglo',
        'Stade de Bordeaux - Bordeaux',
        'Stade Vélodrome - Marseille',
        'Parc des Princes - Paris',
        'Stade de Nice - Nice',
        'Stade Pierre Mauroy - Lille Métropole',
        'Stadium de Toulouse - Toulouse',
        'Stade de Lyon - Lyon',
        'Stade Geoffroy Guichard - Saint-Etienne'
    ];

    return venues[venueId];
};

function getBroadcast(broadcastId) {
    var bcasts = [
        'ARD', 'ZDF', 'SAT1'
    ]

    return bcasts[broadcastId];
}

function getStreamcloudUrl(streamId) {
    return 'http://streamcloud.eu/' + streamId + '/.html';
};

function getMatch(matchId) {
    var matches = {
        '01': {
            date: '2016/06/10 21:00',
            home: 'France', homeCode: 'FRA', homeGoals: '2',
            away: 'Romania', awayCode: 'ROU', awayGoals: '1',
            group: 'A', stage: 0, venue: 0, uefaMatchId: 2017877,
            video: {
                source: {broadcastId: 1, time: '1:25', url: 'nrodl.zdf.de/de/zdf/16/06/160610_v2_eurofrarou_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: {broadcastId: 1, time: '1:25', hash: 'vphx7wtm76gh'}
            }
        },
        '02': {
            date: '2016/06/11 15:00',
            home: 'Albania', homeCode: 'ALB', homeGoals: '0',
            away: 'Switzerland', awayCode: 'SUI', awayGoals: '1',
            group: 'A', stage: 0, venue: 1, uefaMatchId: 2017878,
            video: {
                source: {broadcastId: 1, time: '1:35', url: 'nrodl.zdf.de/de/zdf/16/06/160611_v2_euroalbsui_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: null
            }
        },
        '03': {
            date: '2016/06/11 18:00',
            home: 'Wales', homeCode: 'WAL', homeGoals: '2',
            away: 'Slovakia', awayCode: 'SVK', awayGoals: '1',
            group: 'B', stage: 0, venue: 2, uefaMatchId: 2017880,
            video: {
                source: {broadcastId: 1, time: '1:37', url: 'nrodl.zdf.de/de/zdf/16/06/160611_eurowalsvk_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: null
            }
        },
        '04': {
            date: '2016/06/11 21:00',
            home: 'England', homeCode: 'ENG', homeGoals: '1',
            away: 'Russia', awayCode: 'RUS', awayGoals: '1',
            group: 'B', stage: 0, venue: 3, uefaMatchId: 2017879,
            video: {
                source: {broadcastId: 1, time: '1:34', url: 'nrodl.zdf.de/de/zdf/16/06/160611_euroengrus_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: null
            }
        },
        '05': {
            date: '2016/06/12 15:00',
            home: 'Turkey', homeCode: 'TUR', homeGoals: '0',
            away: 'Croatia', awayCode: 'CRO', awayGoals: '1',
            group: 'D', stage: 0, venue: 4, uefaMatchId: 2017884,
            video: {
                source: {broadcastId: 0, time: '1:44', url: 'ondemand-de.wdr.de/medp/fsk0/113/1137674/1137674_13111486.mp4'},
                streamcloud: null
            }
        },
        '06': {
            date: '2016/06/12 18:00',
            home: 'Poland', homeCode: 'POL', homeGoals: '1',
            away: 'Northern Ireland', awayCode: 'NIR', awayGoals: '0',
            group: 'C', stage: 0, venue: 5, uefaMatchId: 2017882,
            video: {
                source: null,
                streamcloud: null
            }
        },
        '07': {
            date: '2016/06/12 21:00',
            home: 'Germany', homeCode: 'GER', homeGoals: '2',
            away: 'Ukraine', awayCode: 'UKR', awayGoals: '0',
            group: 'C', stage: 0, venue: 6, uefaMatchId: 2017881,
            video: {
                source: null,
                streamcloud: null
            }
        },
        '08': {
            date: '2016/06/13 15:00',
            home: 'Spain', homeCode: 'ESP', homeGoals: '1',
            away: 'Czech Republic', awayCode: 'CZE', awayGoals: '0',
            group: 'D', stage: 0, venue: 7, uefaMatchId: 2017883,
            video: {
                source: {broadcastId: 0, time: '1:41', url: 'ondemand-de.wdr.de/medp/fsk0/113/1137448/1137448_13122326.mp4'},
                streamcloud: null
            }
        },
        '09': {
            date: '2016/06/13 18:00',
            home: 'Republic of Ireland', homeCode: 'IRL', homeGoals: '1',
            away: 'Sweden', awayCode: 'SWE', awayGoals: '1',
            group: 'E', stage: 0, venue: 0, uefaMatchId: 2017954,
            video: {
                source: {broadcastId: 0, time: '1:37', url: 'ondemand-de.wdr.de/medp/fsk0/113/1137460/1137460_13123680.mp4'},
                streamcloud: null
            }
        },
        '10': {
            date: '2016/06/13 21:00',
            home: 'Belgium', homeCode: 'BEL', homeGoals: '0',
            away: 'Italy', awayCode: 'ITA', awayGoals: '2',
            group: 'E', stage: 0, venue: 8, uefaMatchId: 2017953,
            video: {
                source: {broadcastId: 0, time: '1:38', url: 'ondemand-de.wdr.de/medp/fsk0/113/1137470/1137470_13124979.mp4'},
                streamcloud: null
            }
        },
        '11': {
            date: '2016/06/14 18:00',
            home: 'Austria', homeCode: 'AUS', homeGoals: '0',
            away: 'Hungary', awayCode: 'HUN', awayGoals: '2',
            group: 'F', stage: 0, venue: 2, uefaMatchId: 2017960,
            video: {
                source: {broadcastId: 1, time: '1:37', url: 'nrodl.zdf.de/de/zdf/16/06/160614_euroauthun_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: null
            }
        },
        '12': {
            date: '2016/06/14 21:00',
            home: 'Belgium', homeCode: 'BEL', homeGoals: '1',
            away: 'Italy', awayCode: 'ITA', awayGoals: '1',
            group: 'F', stage: 0, venue: 9, uefaMatchId: 2017959,
            video: {
                source: {broadcastId: 1, time: '1:35', url: 'nrodl.zdf.de/de/zdf/16/06/160614_europorisl_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: null
            }
        },
        '13': {
            date: '2016/06/15 15:00',
            home: 'Russia', homeCode: 'RUS', homeGoals: '1',
            away: 'Slovakia', awayCode: 'SVK', awayGoals: '2',
            group: 'B', stage: 1, venue: 6, uefaMatchId: 2017888,
            video: {
                source: {broadcastId: 0, time: '1:37', url: 'ondemand-de.wdr.de/medp/fsk0/113/1137509/1137509_13146879.mp4'},
                streamcloud: null
            }
        },
        '14': {
            date: '2016/06/15 18:00',
            home: 'Romania', homeCode: 'ROU', homeGoals: '1',
            away: 'Switzerland', awayCode: 'SUI', awayGoals: '1',
            group: 'A', stage: 1, venue: 4, uefaMatchId: 2017886,
            video: {
                source: {broadcastId: 0, time: '1:36', url: 'ondemand-de.wdr.de/medp/fsk0/114/1140762/1140762_13149025.mp4'},
                streamcloud: null
            }
        },
        '15': {
            date: '2016/06/15 21:00',
            home: 'France', homeCode: 'FRA', homeGoals: '2',
            away: 'Albania', awayCode: 'ALB', awayGoals: '0',
            group: 'A', stage: 1, venue: 3, uefaMatchId: 2017885,
            video: {
                source: {broadcastId: 0, time: '1:41', url: 'hbbtv-de.wdr.de/medp/fsk0/113/1137952/1137952_13150111.mp4'},
                streamcloud: null
            }
        },
        '16': {
            date: '2016/06/16 15:00',
            home: 'England', homeCode: 'ENG', homeGoals: '2',
            away: 'Wales', awayCode: 'WAL', awayGoals: '1',
            group: 'B', stage: 1, venue: 1, uefaMatchId: 2017887,
            video: {
                source: {broadcastId: 1, time: '1:36', url: 'nrodl.zdf.de/de/zdf/16/06/160616_euroengwal_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: null
            }
        },
        '17': {
            date: '2016/06/16 18:00',
            home: 'Ukraine', homeCode: 'UKR', homeGoals: '0',
            away: 'Northern Ireland', awayCode: 'NIR', awayGoals: '2',
            group: 'C', stage: 1, venue: 8, uefaMatchId: 2017890,
            video: {
                source: {broadcastId: 1, time: '1:39', url: 'nrodl.zdf.de/de/zdf/16/06/160616_euroukrnir_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: null
            }
        },
        '18': {
            date: '2016/06/16 21:00',
            home: 'Germany', homeCode: 'GER', homeGoals: '0',
            away: 'Poland', awayCode: 'POL', awayGoals: '0',
            group: 'C', stage: 1, venue: 0, uefaMatchId: 2017889,
            video: {
                source: {broadcastId: 1, time: '1:36', url: 'nrodl.zdf.de/de/zdf/16/06/160616_eurogerpol_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: {broadcastId: 1, time: '1:36', hash: 'mikj0vbxdkao'}
            }
        },
        '19': {
            date: '2016/06/17 15:00',
            home: 'Italy', homeCode: 'ITA', homeGoals: '1',
            away: 'Sweden', awayCode: 'SWE', awayGoals: '0',
            group: 'E', stage: 1, venue: 7, uefaMatchId: 2017956,
            video: {
                source: {broadcastId: 1, time: '1:36', url: 'nrodl.zdf.de/de/zdf/16/06/160617_euroitaswe_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: {broadcastId: 1, time: '1:36', hash: '72q4aigdhixa'}
            }
        },
        '20': {
            date: '2016/06/17 18:00',
            home: 'Czech Republic', homeCode: 'CZE', homeGoals: '2',
            away: 'Croatia', awayCode: 'CRO', awayGoals: '2',
            group: 'D', stage: 1, venue: 9, uefaMatchId: 2017892,
            video: {
                source: {broadcastId: 1, time: '1:41', url: 'nrodl.zdf.de/de/zdf/16/06/160617_euroczecro_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: {broadcastId: 1, time: '1:41', hash: 'ww9gjjqfycmg'}
            }
        },
        '21': {
            date: '2016/06/17 21:00',
            home: 'Spain', homeCode: 'ESP', homeGoals: '3',
            away: 'Turkey', awayCode: 'TUR', awayGoals: '0',
            group: 'D', stage: 1, venue: 5, uefaMatchId: 2017891,
            video: {
                source: {broadcastId: 1, time: '1:34', url: 'nrodl.zdf.de/de/zdf/16/06/160617_euroesptur_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: {broadcastId: 1, time: '1:34', hash: 've0kblepo2e2'}
            }
        },
        '22': {
            date: '2016/06/18 15:00',
            home: 'Belgium', homeCode: 'BEL', homeGoals: '3',
            away: 'Republic of Ireland', awayCode: 'IRE', awayGoals: '0',
            group: 'E', stage: 1, venue: 2, uefaMatchId: 2017955,
            video: {
                source: {broadcastId: 0, time: '1:35', url: 'ondemand-de.wdr.de/medp/fsk0/113/1137962/1137962_13178848.mp4'},
                streamcloud: {broadcastId: 0, time: '1:35', hash: 'oz1h4rt38duw'}
            }
        },
        '23': {
            date: '2016/06/18 18:00',
            home: 'Iceland', homeCode: 'ISL', homeGoals: '1',
            away: 'Hungary', awayCode: 'HUN', awayGoals: '1',
            group: 'F', stage: 1, venue: 3, uefaMatchId: 2017962,
            video: {
                source: {broadcastId: 0, time: '1:39', url: 'ondemand-de.wdr.de/medp/fsk0/113/1137987/1137987_13180464.mp4'},
                streamcloud: {broadcastId: 0, time: '1:39', hash: 'l2pptgzyr13z'}
            }
        },
        '24': {
            date: '2016/06/18 21:00',
            home: 'Portugal', homeCode: 'POR', homeGoals: '0',
            away: 'Austria', awayCode: 'AUS', awayGoals: '0',
            group: 'F', stage: 1, venue: 4, uefaMatchId: 2017961,
            video: {
                source: {broadcastId: 0, time: '1:34', url: 'ondemand-de.wdr.de/medp/fsk0/113/1138039/1138039_13181547.mp4'},
                streamcloud: {broadcastId: 0, time: '1:34', hash: 'ap890q01q63j'}
            }
        },
        '25': {
            date: '2016/06/19 21:00',
            home: 'Romania', homeCode: 'ROU', homeGoals: '0',
            away: 'Albania', awayCode: 'ALB', awayGoals: '1',
            group: 'A', stage: 2, venue: 8, uefaMatchId: 2017894,
            video: {
                source: null,
                streamcloud: null
            }
        },
        '26': {
            date: '2016/06/19 21:00',
            home: 'Switzerland', homeCode: 'SUI', homeGoals: '0',
            away: 'France', awayCode: 'FRA', awayGoals: '0',
            group: 'A', stage: 2, venue: 6, uefaMatchId: 2017893,
            video: {
                source: {broadcastId: 1, time: '1:35', url: 'nrodl.zdf.de/de/zdf/16/06/160619_eurosuifra_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: {broadcastId: 1, time: '1:35', hash: 'suttducuz8kh'}
            }
        },
        '27': {
            date: '2016/06/20 21:00',
            home: 'Russia', homeCode: 'RUS', homeGoals: '0',
            away: 'Wales', awayCode: 'WAL', awayGoals: '3',
            group: 'B', stage: 2, venue: 7, uefaMatchId: 2017896,
            video: {
                source: null,
                streamcloud: null
            }
        },
        '28': {
            date: '2016/06/20 21:00',
            home: 'Slovakia', homeCode: 'SVK', homeGoals: '0',
            away: 'England', awayCode: 'ENG', awayGoals: '0',
            group: 'B', stage: 2, venue: 9, uefaMatchId: 2017895,
            video: {
                source: {broadcastId: 0, time: '1:39', url: 'ondemand-de.wdr.de/medp/fsk0/113/1138062/1138062_13198905.mp4'},
                streamcloud: {broadcastId: 0, time: '1:39', hash: '2wro9onvz0bi'}
            }
        },
        '29': {
            date: '2016/06/21 18:00',
            home: 'Ukraine', homeCode: 'UKR', homeGoals: '0',
            away: 'Poland', awayCode: 'POL', awayGoals: '1',
            group: 'C', stage: 2, venue: 3, uefaMatchId: 2017898,
            video: {
                source: null,
                streamcloud: null
            }
        },
        '30': {
            date: '2016/06/21 18:00',
            home: 'Northern Ireland', homeCode: 'NIR', homeGoals: '0',
            away: 'Germany', awayCode: 'GER', awayGoals: '1',
            group: 'C', stage: 2, venue: 4, uefaMatchId: 2017897,
            video: {
                source: {broadcastId: 0, time: '1:34', url: 'ondemand-de.wdr.de/medp/fsk0/113/1138081/1138081_13209969.mp4'},
                streamcloud: {broadcastId: 0, time: '1:34', hash: '7alf2edf8glt'}
            }
        },
        '31': {
            date: '2016/06/21 21:00',
            home: 'Czech Republic', homeCode: 'CZE', homeGoals: '0',
            away: 'Turkey', awayCode: 'TUR', awayGoals: '2',
            group: 'D', stage: 2, venue: 1, uefaMatchId: 2017900,
            video: {
                source: null,
                streamcloud: {broadcastId: 2, time: '1:47', hash: 'hjkewrvkzpt4'}
            }
        },
        '32': {
            date: '2016/06/21 21:00',
            home: 'Croatia', homeCode: 'CRO', homeGoals: '2',
            away: 'Spain', awayCode: 'ESP', awayGoals: '1',
            group: 'D', stage: 2, venue: 2, uefaMatchId: 2017899,
            video: {
                source: {broadcastId: 0, time: '1:37', url: 'ondemand-de.wdr.de/medp/fsk0/113/1138099/1138099_13211210.mp4'},
                streamcloud: {broadcastId: 0, time: '1:37', hash: 'n5ba1uoeu8z0'}
            }
        },
        '33': {
            date: '2016/06/22 18:00',
            home: 'Iceland', homeCode: 'ISL', homeGoals: '',
            away: 'Austria', awayCode: 'AUS', awayGoals: '',
            group: 'E', stage: 2, venue: 0, uefaMatchId: 2017963,
            video: {
                source: null,
                streamcloud: {broadcastId: 2, time: '1:xx', hash: ''}
            }
        },
        '34': {
            date: '2016/06/22 18:00',
            home: 'Hungary', homeCode: 'HUN', homeGoals: '',
            away: 'Portugal', awayCode: 'POR', awayGoals: '',
            group: 'E', stage: 2, venue: 8, uefaMatchId: 2017864,
            video: {
                source: {broadcastId: 1, time: '1:xx', url: 'nrodl.zdf.de/de/zdf/16/06/160622_eurohunpor_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: {broadcastId: 1, time: '1:xx', hash: ''}
            }
        },
        '35': {
            date: '2016/06/22 21:00',
            home: 'Italy', homeCode: 'ITA', homeGoals: '',
            away: 'Republic of Ireland', awayCode: 'IRL', awayGoals: '',
            group: 'F', stage: 2, venue: 6, uefaMatchId: 2017958,
            video: {
                source: null,
                streamcloud: {broadcastId: 2, time: '1:xx', hash: ''}
            }
        },
        '36': {
            date: '2016/06/22 21:00',
            home: 'Sweden', homeCode: 'SWE', homeGoals: '',
            away: 'Belgium', awayCode: 'BEL', awayGoals: '',
            group: 'F', stage: 2, venue: 5, uefaMatchId: 2017957,
            video: {
                source: {broadcastId: 1, time: '1:xx', url: 'nrodl.zdf.de/de/zdf/16/06/160622_euroswebel_spiel_spo_3328k_p36v12.mp4'},
                streamcloud: {broadcastId: 1, time: '1:xx', hash: ''}
            }
        }
    };

    return matches[matchId];
};
