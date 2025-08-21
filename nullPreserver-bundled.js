!function(e,R){"object"==typeof exports&&"object"==typeof module?module.exports=R():"function"==typeof define&&define.amd?define("dscc",[],R):"object"==typeof exports?exports.dscc=R():e.dscc=R()}(window,function(){return t={},n.m=C={"./src/index.ts":
    /*!**********************!*\
      !*** ./src/index.ts ***!
      \**********************/
    /*! no static exports found */function(e,N,R){"use strict";var i=this&&this.__assign||function(){return(i=Object.assign||function(e){for(var R,C=1,t=arguments.length;C<t;C++)for(var n in R=arguments[C])Object.prototype.hasOwnProperty.call(R,n)&&(e[n]=R[n]);return e}).apply(this,arguments)};Object.defineProperty(N,"__esModule",{value:!0});
    /*!
      @license
      Copyright 2019 Google LLC
    
      Licensed under the Apache License, Version 2.0 (the "License");
      you may not use this file except in compliance with the License.
      You may obtain a copy of the License at
    
      https://www.apache.org/licenses/LICENSE-2.0
    
      Unless required by applicable law or agreed to in writing, software
      distributed under the License is distributed on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      See the License for the specific language governing permissions and
      limitations under the License.
    */
    var _=R(/*! ./types */"./src/types.ts");!function(e){for(var R in e)N.hasOwnProperty(R)||(N[R]=e[R])}(R(/*! ./types */"./src/types.ts")),N.getWidth=function(){return document.body.clientWidth},N.getHeight=function(){return document.documentElement.clientHeight},N.getComponentId=function(){var e=new URLSearchParams(window.location.search);if(null!==e.get("dscId"))return e.get("dscId");throw new Error("dscId must be in the query parameters. This is a bug in ds-component, please file a bug: https://github.com/googledatastudio/ds-component/issues/new")};function E(e){return e.type===_.ConfigDataElementType.DIMENSION||e.type===_.ConfigDataElementType.METRIC}function r(e){return e===_.ConfigDataElementType.DIMENSION?-1:1}function a(e){var R=[];e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){R.push(e)})});var C,t=(C=function(e,R){return r(e.type)-r(R.type)},R.map(function(e,R){return{item:e,index:R}}).sort(function(e,R){return C(e.item,R.item)||e.index-R.index}).map(function(e){return e.item})),n=[];return t.forEach(function(e){e.value.forEach(function(){return n.push(e.id)})}),n}function o(R){return function(e){var C,t,n={};return t=R,((C=e).length<t.length?C.map(function(e,R){return[e,t[R]]}):t.map(function(e,R){return[C[R],e]})).forEach(function(e){var R=e[0],C=e[1];void 0===n[C]&&(n[C]=[]),n[C].push(R)},{}),n}}N.fieldsByConfigId=function(e){var R=e.fields.reduce(function(e,R){return e[R.id]=R,e},{}),C={};return e.config.data.forEach(function(e){e.elements.filter(E).forEach(function(e){C[e.id]=e.value.map(function(e){return R[e]})})}),C};function U(e){var R={};return(e.config.style||[]).forEach(function(e){e.elements.forEach(function(e){if(void 0!==R[e.id])throw new Error("styleIds must be unique. Your styleId: '"+e.id+"' is used more than once.");R[e.id]={value:e.value,defaultValue:e.defaultValue}})},{}),R}function Y(e){return e.config.themeStyle}function n(e){switch(e){case _.DSInteractionType.FILTER:return _.InteractionType.FILTER}}function s(e){var R=e.config.interactions;return void 0===R?{}:R.reduce(function(e,R){var C=R.supportedActions.map(n),t={type:n(R.value.type),data:R.value.data};return e[R.id]={value:t,supportedActions:C},e},{})}N.tableTransform=function(e){return{tables:(R=e,t=N.fieldsByConfigId(R),n=a(R),E={},r=n.map(function(e){void 0===E[e]?E[e]=0:E[e]++;var R=E[e],C=t[e][R];return i(i({},C),{configId:e})}),(C={})[_.TableType.DEFAULT]={headers:[],rows:[]},o=C,R.dataResponse.tables.forEach(function(e){o[e.id]={headers:r,rows:e.rows}}),o),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e)};var R,C,t,n,E,r,o},N.objectTransform=function(e){return{tables:(t=a(R=e),(C={})[_.TableType.DEFAULT]=[],n=C,R.dataResponse.tables.forEach(function(e){var R=e.rows.map(o(t));e.id===_.TableType.DEFAULT?n[e.id]=R:(void 0===n[e.id]&&(n[e.id]=[]),n[e.id]=n[e.id].concat(R))}),n),fields:N.fieldsByConfigId(e),style:U(e),theme:Y(e),interactions:s(e)};var R,C,t,n};function u(e){var R,C=!1;return e===N.tableTransform||e===N.objectTransform?C=!0:(R=!1,"identity"===e("identity")&&(R=!0,console.warn("This is an unsupported data format. Please use one of the supported transforms:\n       dscc.objectFormat or dscc.tableFormat.")),R&&(C=!0)),C}N.subscribeToData=function(R,C){if(u(C.transform)){var e=function(e){e.data.type===_.MessageType.RENDER?R(C.transform(e.data)):console.error("MessageType: "+e.data.type+" is not supported by this version of the library.")};window.addEventListener("message",e);var t={componentId:N.getComponentId(),type:_.ToDSMessageType.VIZ_READY};return window.parent.postMessage(t,"*"),function(){return window.removeEventListener("message",e)}}throw new Error("Only the built in transform functions are supported.")},N.sendInteraction=function(e,R,C){var t=N.getComponentId(),n={type:_.ToDSMessageType.INTERACTION,id:e,data:C,componentId:t};window.parent.postMessage(n,"*")},N.clearInteraction=function(e,R){N.sendInteraction(e,R,void 0)}},"./src/types.ts":
    /*!**********************!*\
      !*** ./src/types.ts ***!
      \**********************/
    /*! no static exports found */function(e,R,C){"use strict";var t,n,E,r,o,N;Object.defineProperty(R,"__esModule",{value:!0}),(t=R.ConceptType||(R.ConceptType={})).METRIC="METRIC",t.DIMENSION="DIMENSION",(R.MessageType||(R.MessageType={})).RENDER="RENDER",(n=R.FieldType||(R.FieldType={})).YEAR="YEAR",n.YEAR_QUARTER="YEAR_QUARTER",n.YEAR_MONTH="YEAR_MONTH",n.YEAR_WEEK="YEAR_WEEK",n.YEAR_MONTH_DAY="YEAR_MONTH_DAY",n.YEAR_MONTH_DAY_HOUR="YEAR_MONTH_DAY_HOUR",n.QUARTER="QUARTER",n.MONTH="MONTH",n.WEEK="WEEK",n.MONTH_DAY="MONTH_DAY",n.DAY_OF_WEEK="DAY_OF_WEEK",n.DAY="DAY",n.HOUR="HOUR",n.MINUTE="MINUTE",n.DURATION="DURATION",n.COUNTRY="COUNTRY",n.COUNTRY_CODE="COUNTRY_CODE",n.CONTINENT="CONTINENT",n.CONTINENT_CODE="CONTINENT_CODE",n.SUB_CONTINENT="SUB_CONTINENT",n.SUB_CONTINENT_CODE="SUB_CONTINENT_CODE",n.REGION="REGION",n.REGION_CODE="REGION_CODE",n.CITY="CITY",n.CITY_CODE="CITY_CODE",n.METRO_CODE="METRO_CODE",n.LATITUDE_LONGITUDE="LATITUDE_LONGITUDE",n.NUMBER="NUMBER",n.PERCENT="PERCENT",n.TEXT="TEXT",n.BOOLEAN="BOOLEAN",n.URL="URL",n.IMAGE="IMAGE",n.CURRENCY_AED="CURRENCY_AED",n.CURRENCY_ALL="CURRENCY_ALL",n.CURRENCY_ARS="CURRENCY_ARS",n.CURRENCY_AUD="CURRENCY_AUD",n.CURRENCY_BDT="CURRENCY_BDT",n.CURRENCY_BGN="CURRENCY_BGN",n.CURRENCY_BOB="CURRENCY_BOB",n.CURRENCY_BRL="CURRENCY_BRL",n.CURRENCY_CAD="CURRENCY_CAD",n.CURRENCY_CDF="CURRENCY_CDF",n.CURRENCY_CHF="CURRENCY_CHF",n.CURRENCY_CLP="CURRENCY_CLP",n.CURRENCY_CNY="CURRENCY_CNY",n.CURRENCY_COP="CURRENCY_COP",n.CURRENCY_CRC="CURRENCY_CRC",n.CURRENCY_CZK="CURRENCY_CZK",n.CURRENCY_DKK="CURRENCY_DKK",n.CURRENCY_DOP="CURRENCY_DOP",n.CURRENCY_EGP="CURRENCY_EGP",n.CURRENCY_ETB="CURRENCY_ETB",n.CURRENCY_EUR="CURRENCY_EUR",n.CURRENCY_GBP="CURRENCY_GBP",n.CURRENCY_HKD="CURRENCY_HKD",n.CURRENCY_HRK="CURRENCY_HRK",n.CURRENCY_HUF="CURRENCY_HUF",n.CURRENCY_IDR="CURRENCY_IDR",n.CURRENCY_ILS="CURRENCY_ILS",n.CURRENCY_INR="CURRENCY_INR",n.CURRENCY_IRR="CURRENCY_IRR",n.CURRENCY_ISK="CURRENCY_ISK",n.CURRENCY_JMD="CURRENCY_JMD",n.CURRENCY_JPY="CURRENCY_JPY",n.CURRENCY_KRW="CURRENCY_KRW",n.CURRENCY_LKR="CURRENCY_LKR",n.CURRENCY_LTL="CURRENCY_LTL",n.CURRENCY_MNT="CURRENCY_MNT",n.CURRENCY_MVR="CURRENCY_MVR",n.CURRENCY_MXN="CURRENCY_MXN",n.CURRENCY_MYR="CURRENCY_MYR",n.CURRENCY_NOK="CURRENCY_NOK",n.CURRENCY_NZD="CURRENCY_NZD",n.CURRENCY_PAB="CURRENCY_PAB",n.CURRENCY_PEN="CURRENCY_PEN",n.CURRENCY_PHP="CURRENCY_PHP",n.CURRENCY_PKR="CURRENCY_PKR",n.CURRENCY_PLN="CURRENCY_PLN",n.CURRENCY_RON="CURRENCY_RON",n.CURRENCY_RSD="CURRENCY_RSD",n.CURRENCY_RUB="CURRENCY_RUB",n.CURRENCY_SAR="CURRENCY_SAR",n.CURRENCY_SEK="CURRENCY_SEK",n.CURRENCY_SGD="CURRENCY_SGD",n.CURRENCY_THB="CURRENCY_THB",n.CURRENCY_TRY="CURRENCY_TRY",n.CURRENCY_TWD="CURRENCY_TWD",n.CURRENCY_TZS="CURRENCY_TZS",n.CURRENCY_UAH="CURRENCY_UAH",n.CURRENCY_USD="CURRENCY_USD",n.CURRENCY_UYU="CURRENCY_UYU",n.CURRENCY_VEF="CURRENCY_VEF",n.CURRENCY_VND="CURRENCY_VND",n.CURRENCY_YER="CURRENCY_YER",n.CURRENCY_ZAR="CURRENCY_ZAR",(E=R.TableType||(R.TableType={})).DEFAULT="DEFAULT",E.COMPARISON="COMPARISON",E.SUMMARY="SUMMARY",(r=R.ConfigDataElementType||(R.ConfigDataElementType={})).METRIC="METRIC",r.DIMENSION="DIMENSION",r.MAX_RESULTS="MAX_RESULTS",(o=R.ConfigStyleElementType||(R.ConfigStyleElementType={})).TEXTINPUT="TEXTINPUT",o.SELECT_SINGLE="SELECT_SINGLE",o.CHECKBOX="CHECKBOX",o.FONT_COLOR="FONT_COLOR",o.FONT_SIZE="FONT_SIZE",o.FONT_FAMILY="FONT_FAMILY",o.FILL_COLOR="FILL_COLOR",o.BORDER_COLOR="BORDER_COLOR",o.AXIS_COLOR="AXIS_COLOR",o.GRID_COLOR="GRID_COLOR",o.OPACITY="OPACITY",o.LINE_WEIGHT="LINE_WEIGHT",o.LINE_STYLE="LINE_STYLE",o.BORDER_RADIUS="BORDER_RADIUS",o.INTERVAL="INTERVAL",o.SELECT_RADIO="SELECT_RADIO",(R.DSInteractionType||(R.DSInteractionType={})).FILTER="FILTER",(N=R.ToDSMessageType||(R.ToDSMessageType={})).VIZ_READY="vizReady",N.INTERACTION="vizAction",(R.InteractionType||(R.InteractionType={})).FILTER="FILTER"}},n.c=t,n.d=function(e,R,C){n.o(e,R)||Object.defineProperty(e,R,{enumerable:!0,get:C})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(R,e){if(1&e&&(R=n(R)),8&e)return R;if(4&e&&"object"==typeof R&&R&&R.__esModule)return R;var C=Object.create(null);if(n.r(C),Object.defineProperty(C,"default",{enumerable:!0,value:R}),2&e&&"string"!=typeof R)for(var t in R)n.d(C,t,function(e){return R[e]}.bind(null,t));return C},n.n=function(e){var R=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(R,"a",R),R},n.o=function(e,R){return Object.prototype.hasOwnProperty.call(e,R)},n.p="",n(n.s="./src/index.ts");function n(e){if(t[e])return t[e].exports;var R=t[e]={i:e,l:!1,exports:{}};return C[e].call(R.exports,R,R.exports,n),R.l=!0,R.exports}var C,t});
/**
 * Null Preserver Filter - Looker Studio Community Visualization
 * Always includes null values in filtering while hiding them from the UI
 * 
 * Uses official DSCC runtime - No custom helpers
 */

// Main drawing function that DSCC will call
function draw(data) {
  console.log('=== NULL PRESERVER FILTER DEBUG ===');
  console.log('[NullPreserverFilter] draw called with data:', data);
  
  // Sanity checks for official DSCC runtime
  console.debug('[NPF] headers', data.tables?.DEFAULT?.headers);
  console.debug('[NPF] first rows', data.tables?.DEFAULT?.rows?.slice(0,5));
  
  try {
    // Get config from data.style
    const config = {
      showSearch: data.style?.showSearch ?? true,
      selectAll: data.style?.selectAll ?? true
    };
    
    console.log('[NullPreserverFilter] Config from data.style:', config);
    
    // Create container in document.body
    let container = document.getElementById('npf-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'npf-container';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.boxSizing = 'border-box';
      document.body.appendChild(container);
    }
    
    // Clear previous content
    container.innerHTML = '';
    
    console.log('[NullPreserverFilter] Container:', container);
    
    // Initialize the visualization
    const viz = new NullPreserverFilter(container, data, config);
    
  } catch (error) {
    console.error('[NullPreserverFilter] Error in draw function:', error);
    let container = document.getElementById('npf-container');
    if (container) {
      container.innerHTML = '<div class="npf-error">Error loading visualization: ' + error.message + '</div>';
    }
  }
}

/**
 * Main visualization class
 */
class NullPreserverFilter {
  constructor(container, data, config) {
    this.container = container;
    this.data = data;
    this.config = config;
    this.filterState = new Set();
    this.SENTINEL = '__NULL__'; // Constant for null sentinel value
    this.init();
  }

  init() {
    console.log('[NullPreserverFilter] Initializing visualization...');
    this.render();
    // emitFilter is now called from render() after setting initial state
  }

  render() {
    console.log('[NullPreserverFilter] Rendering visualization...');
    
    // Clear container
    this.container.innerHTML = '';
    
    // Get unique values excluding null sentinel
    const values = this.getUniqueValues();
    console.log('[NullPreserverFilter] Unique values found:', values);
    
    if (values.length === 0) {
      this.renderEmptyState();
      // If there are no visible values, still call emitFilter() so only __NULL__ is applied
      this.emitFilter();
      return;
    }

    // Create main wrapper with proper sizing
    const wrapper = document.createElement('div');
    wrapper.className = 'npf-wrapper';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.boxSizing = 'border-box';
    wrapper.style.position = 'relative';
    wrapper.style.padding = '10px';

    // Create chip button (shows selection count)
    const chip = this.createChipButton(values);
    wrapper.appendChild(chip);

    // Create dropdown panel (hidden by default)
    const panel = this.createDropdownPanel(values);
    wrapper.appendChild(panel);

    this.container.appendChild(wrapper);
    
    // Ensure container fills the iframe properly
    if (this.container.parentElement === document.body) {
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
    }
    
    // On first render, check them all and set filterState accordingly
    values.forEach(value => {
      this.filterState.add(value);
    });
    
    // Update checkboxes to reflect the selected state
    this.updateCheckboxes();
    
    // Update chip text
    this.updateChipText();
    
    // Emit initial filter after setting state
    this.emitFilter();
    
    console.log('[NullPreserverFilter] Visualization rendered successfully');
  }

  getUniqueValues() {
    if (!this.data || !this.data.tables || !this.data.tables.DEFAULT) {
      console.error('[NullPreserverFilter] No data available for getUniqueValues');
      return [];
    }

    const table = this.data.tables.DEFAULT;
    console.log('[NullPreserverFilter] Table structure:', table);
    
    // Official DSCC runtime shape: data.tables.DEFAULT = { headers: [...], rows: [...] }
    if (table.headers && table.rows) {
      console.log('[NullPreserverFilter] Using official DSCC runtime format with headers/rows');
      
      // Read the tableTransform shape correctly
      const headers = table.headers;
      const configuredFieldId = this.data.fields?.dimID?.[0]?.id;     // from your config
      let dimIdx = headers.findIndex(h => h.id === configuredFieldId);
      if (dimIdx === -1) dimIdx = 0; // single-dimension fallback
      
      // Enhanced debugging for field resolution
      console.log('[NullPreserverFilter] Field resolution:', {
        configuredFieldId,
        dimIdx,
        headers: headers.map(h => ({ id: h.id, name: h.name, conceptType: h.conceptType })),
        fields: this.data.fields
      });
      
      const rawVals = table.rows.map(r => r[dimIdx]);
      
      console.log('[NullPreserverFilter] Raw values from rows:', rawVals);
      
      // Keep your hidden-null behavior, but preselect & render
      const SENTINEL = "__NULL__";
      const visible = [...new Set(rawVals.filter(v => v != null && v !== SENTINEL))];
      
      const result = visible.sort();
      console.log('[NullPreserverFilter] Unique values extracted (official DSCC):', result);
      return result;
      
    } else {
      console.error('[NullPreserverFilter] Expected official DSCC runtime format with headers/rows:', table);
      return [];
    }
  }

  createSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'npf-search-container';
    searchContainer.style.marginBottom = '10px';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search values...';
    searchInput.className = 'npf-search-input';
    searchInput.setAttribute('aria-label', 'Search filter values');
    searchInput.style.width = '100%';
    searchInput.style.padding = '5px';

    searchInput.addEventListener('input', (e) => {
      this.filterValues(e.target.value);
    });

    searchContainer.appendChild(searchInput);
    return searchContainer;
  }

  createSelectAllOption(values) {
    const selectAllContainer = document.createElement('div');
    selectAllContainer.className = 'npf-select-all-container';
    selectAllContainer.style.marginBottom = '10px';
    selectAllContainer.style.padding = '5px';
    selectAllContainer.style.borderBottom = '1px solid #ddd';

    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.id = 'npf-select-all';
    selectAllCheckbox.className = 'npf-checkbox';

    const selectAllLabel = document.createElement('label');
    selectAllLabel.htmlFor = 'npf-select-all';
    selectAllLabel.textContent = 'Select All';
    selectAllLabel.className = 'npf-label';
    selectAllLabel.style.marginLeft = '5px';

    selectAllCheckbox.addEventListener('change', (e) => {
      this.handleSelectAll(e.target.checked, values);
    });

    selectAllContainer.appendChild(selectAllCheckbox);
    selectAllContainer.appendChild(selectAllLabel);
    return selectAllContainer;
  }

  sanitizeId(value) {
    // Replace non-alphanumeric characters with underscores to create safe IDs
    return `npf-${value.toString().replace(/[^a-zA-Z0-9]/g, '_')}`;
  }

  createCheckboxList(values) {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'npf-checkbox-container';

    values.forEach(value => {
      const checkboxItem = document.createElement('div');
      checkboxItem.className = 'npf-checkbox-item';
      checkboxItem.style.marginBottom = '5px';
      checkboxItem.style.padding = '2px';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      const safeId = this.sanitizeId(value);
      checkbox.id = safeId;
      checkbox.className = 'npf-checkbox';

      const label = document.createElement('label');
      label.htmlFor = safeId;
      label.textContent = value;
      label.className = 'npf-label';
      label.style.marginLeft = '5px';

      checkbox.addEventListener('change', (e) => {
        this.handleCheckboxChange(value, e.target.checked);
      });

      checkboxItem.appendChild(checkbox);
      checkboxItem.appendChild(label);
      checkboxContainer.appendChild(checkboxItem);
    });

    return checkboxContainer;
  }

  filterValues(searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    const checkboxes = this.container.querySelectorAll('.npf-checkbox-item');
    
    checkboxes.forEach(item => {
      const label = item.querySelector('.npf-label');
      const text = label.textContent.toLowerCase();
      
      if (text.includes(searchLower)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  handleSelectAll(checked, values) {
    console.log('[NullPreserverFilter] Select all changed:', checked, 'for values:', values);
    
    if (checked) {
      values.forEach(value => {
        this.filterState.add(value);
      });
    } else {
      this.filterState.clear();
    }
    
    this.updateCheckboxes();
    this.updateChipText();
    this.emitFilter();
  }

  handleCheckboxChange(value, checked) {
    console.log('[NullPreserverFilter] Checkbox changed:', value, checked);
    
    if (checked) {
      this.filterState.add(value);
    } else {
      this.filterState.delete(value);
    }
    
    this.updateSelectAllState();
    this.updateChipText();
    this.emitFilter();
  }

  updateCheckboxes() {
    const checkboxes = this.container.querySelectorAll('.npf-checkbox');
    checkboxes.forEach(checkbox => {
      if (checkbox.id !== 'npf-select-all') {
        // Find the original value by matching the sanitized ID
        const values = this.getUniqueValues();
        const value = values.find(v => this.sanitizeId(v) === checkbox.id);
        if (value !== undefined) {
          checkbox.checked = this.filterState.has(value);
        }
      }
    });
  }

  updateSelectAllState() {
    const selectAllCheckbox = this.container.querySelector('#npf-select-all');
    if (selectAllCheckbox) {
      const values = this.getUniqueValues();
      const allSelected = values.every(value => this.filterState.has(value));
      selectAllCheckbox.checked = allSelected;
      selectAllCheckbox.indeterminate = this.filterState.size > 0 && !allSelected;
    }
  }

  createChipButton(values) {
    const chip = document.createElement('button');
    chip.className = 'npf-chip';
    chip.setAttribute('aria-expanded', 'false');
    chip.setAttribute('aria-label', 'Toggle filter options');
    chip.style.cssText = `
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
      text-align: left;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      position: relative;
    `;
    
    // Add click handler to toggle panel
    chip.addEventListener('click', () => {
      this.toggleDropdown();
    });
    
    return chip;
  }

  createDropdownPanel(values) {
    const panel = document.createElement('div');
    panel.className = 'npf-panel';
    panel.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-height: 300px;
      overflow-y: auto;
      z-index: 1000;
      display: none;
      margin-top: 4px;
    `;

    // Add search box if enabled
    if (this.config.showSearch) {
      panel.appendChild(this.createSearchBox());
    }

    // Add select all option if enabled
    if (this.config.selectAll) {
      panel.appendChild(this.createSelectAllOption(values));
    }

    // Add checkbox list
    panel.appendChild(this.createCheckboxList(values));

    return panel;
  }

  toggleDropdown() {
    const chip = this.container.querySelector('.npf-chip');
    const panel = this.container.querySelector('.npf-panel');
    
    if (!chip || !panel) return;
    
    const isExpanded = chip.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      // Close panel
      panel.style.display = 'none';
      chip.setAttribute('aria-expanded', 'false');
      this.removeOutsideClickHandlers();
    } else {
      // Open panel
      panel.style.display = 'block';
      chip.setAttribute('aria-expanded', 'true');
      this.addOutsideClickHandlers();
    }
  }

  addOutsideClickHandlers() {
    // Close on Escape key
    this.escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.toggleDropdown();
      }
    };
    document.addEventListener('keydown', this.escapeHandler);
    
    // Close on outside click
    this.outsideClickHandler = (e) => {
      if (!this.container.contains(e.target)) {
        this.toggleDropdown();
      }
    };
    document.addEventListener('click', this.outsideClickHandler);
    
    // Close on window resize to prevent positioning issues
    this.resizeHandler = () => {
      this.toggleDropdown();
    };
    window.addEventListener('resize', this.resizeHandler);
  }

  removeOutsideClickHandlers() {
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = null;
    }
    if (this.outsideClickHandler) {
      document.removeEventListener('click', this.outsideClickHandler);
      this.outsideClickHandler = null;
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
  }

  destroy() {
    // Clean up event listeners when visualization is destroyed
    this.removeOutsideClickHandlers();
    console.log('[NullPreserverFilter] Visualization destroyed and cleaned up');
  }

  updateChipText() {
    const chip = this.container.querySelector('.npf-chip');
    if (!chip) return;
    
    const values = this.getUniqueValues();
    const selectedCount = this.filterState.size;
    const allSelected = values.every(value => this.filterState.has(value));
    
    if (allSelected) {
      chip.textContent = `All (${values.length})`;
    } else if (selectedCount === 0) {
      chip.textContent = 'None selected';
    } else {
      chip.textContent = `${selectedCount} selected`;
    }
  }

  renderEmptyState() {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'npf-empty-state';
    emptyMessage.textContent = 'No data available for filtering';
    emptyMessage.style.padding = '20px';
    emptyMessage.style.textAlign = 'center';
    emptyMessage.style.color = '#666';
    this.container.appendChild(emptyMessage);
    console.log('[NullPreserverFilter] Rendered empty state');
  }



  emitFilter() {
    // Create filter with chosen values + always include __NULL__
    const selected = Array.from(this.filterState);
    
    // Always inject the sentinel before emitting the filter
    if (!selected.includes(this.SENTINEL)) {
      selected.push(this.SENTINEL);
    }

    console.log('[NullPreserverFilter] Emitting filter with values:', selected);

    try {
      // Emit the filter with the canonical payload
      const actionId = "DEFAULT";                       // from viz-config.json
      
      // Get the correct field ID using the same logic as getUniqueValues
      const headers = this.data.tables.DEFAULT.headers;
      const configuredFieldId = this.data.fields?.dimID?.[0]?.id;
      let dimIdx = headers.findIndex(h => h.id === configuredFieldId);
      if (dimIdx === -1) dimIdx = 0; // single-dimension fallback
      
      const fieldId = headers[dimIdx].id;
      const chosen = [...selected];
      if (!chosen.includes(this.SENTINEL)) chosen.push(this.SENTINEL);
      const values = chosen.map(v => [v]);
      
      // Enhanced debugging for filtering issues
      console.log('[NullPreserverFilter] Filter details:', {
        actionId,
        fieldId,
        configuredFieldId,
        dimIdx,
        headers: headers.map(h => ({ id: h.id, name: h.name })),
        values,
        concepts: [fieldId]
      });
      
      dscc.sendInteraction(actionId, dscc.InteractionType.FILTER, {
        concepts: [fieldId],
        values
      });
      
      console.log('[NullPreserverFilter] Filter sent with canonical payload');
      
    } catch (error) {
      console.error('[NullPreserverFilter] Error sending filter:', error);
      // Fallback logging
      console.log('[NullPreserverFilter] Filter applied (fallback):', {
        actionId: 'DEFAULT',
        concepts: ['dimID'],
        values: selected.map(v => [v])
      });
    }
  }
}

// Register the standard subscription (no polling, no custom postMessage)
dscc.subscribeToData(draw, { transform: dscc.tableTransform });

// Log that the script has loaded
console.log('[NullPreserverFilter] Script loaded successfully');
console.log('[NullPreserverFilter] Using official DSCC runtime');
console.log('[NullPreserverFilter] draw function available:', typeof draw);
console.log('[NullPreserverFilter] DSCC subscription registered');
