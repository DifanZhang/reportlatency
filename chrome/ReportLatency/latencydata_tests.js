
/**

 * @fileoverview This file contains QUnit tests for the LatencyData
 * object - the top data object used in ReportLatency.
 * @author dld@google.com (DrakeDiedrich)
 *
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

test('LatencyData.*Request', function() {
  var ld = new LatencyData();
  var data = {
    url: 'http://server/path',
    tabId: 1,
    requestId: 20,
    timeStamp: 1000
  };

  ld.startRequest(data);

  data.timeStamp = 2000;
  ld.endRequest(data);

  var ts = ld.tab[1].stat;
  equal(ts.count('request'), 1, '1 request for tab 1');
});

test('LatencyData.tabUpdated', function() {
  var ld = new LatencyData();
  var tab = {
    status: 'loading',
    url: 'http://server/path',
    tabId: 1,
  };
  var changeInfo = {};
  ld.tabUpdated(1, changeInfo, tab);
  tab.status = 'complete';
  ld.tabUpdated(1, changeInfo, tab);

  var ts = ld.tab[1].stat;
  equal(ts.count('tabupdate'), 1, '1 tabupdate for tab 1');
});

test('LatencyData.*Navigation', function() {
  var ld = new LatencyData();
  var data = { frameId:0, parentFrameId:-1, processId:2999, tabId:30,
	       timeStamp:1000, url:'http://host/' };

  ld.startNavigation(data);

  data.timeStamp = 2000;
  ld.endNavigation(data);

  var ts = ld.tab[30].stat;
  equal(ts.count('navigation'), 1, '1 navigation for tab 30');
});