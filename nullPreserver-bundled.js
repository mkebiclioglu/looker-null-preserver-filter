/**
 * Null Preserver Filter - Looker Studio Community Visualization
 * Always includes null values in filtering while hiding them from the UI
 */

// Main visualization function (required by Looker Studio)
function drawViz(data, config, container) {
  try {
    console.log('[NullPreserverFilter] Initializing with data:', data);
    
    // Initialize the visualization
    const viz = new NullPreserverFilter(container, data, config);
    
  } catch (error) {
    console.error('[NullPreserverFilter] Error initializing visualization:', error);
    container.innerHTML = '<div class="npf-error">Error loading visualization</div>';
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
    this.init();
  }

  init() {
    this.render();
    this.emitInitialFilter();
  }

  render() {
    // Clear container
    this.container.innerHTML = '';
    
    // Get unique values excluding null sentinel
    const values = this.getUniqueValues();
    if (values.length === 0) {
      this.renderEmptyState();
      return;
    }

    // Create main wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'npf-wrapper';

    // Add search box if enabled
    if (this.config.showSearch) {
      wrapper.appendChild(this.createSearchBox());
    }

    // Add select all option if enabled
    if (this.config.selectAll) {
      wrapper.appendChild(this.createSelectAllOption(values));
    }

    // Add checkbox list
    wrapper.appendChild(this.createCheckboxList(values));

    this.container.appendChild(wrapper);
  }

  getUniqueValues() {
    if (!this.data || !this.data.tables || !this.data.tables.DEFAULT) {
      return [];
    }

    const table = this.data.tables.DEFAULT;
    const values = new Set();
    
    for (const row of table) {
      // Handle both row.dimID and row.dimID[0] (some transforms send arrays)
      let value = row.dimID;
      if (Array.isArray(value)) {
        value = value[0];
      }
      
      if (value && value !== '__NULL__') {
        values.add(value);
      }
    }

    return Array.from(values).sort();
  }

  createSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'npf-search-container';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search values...';
    searchInput.className = 'npf-search-input';
    searchInput.setAttribute('aria-label', 'Search filter values');

    searchInput.addEventListener('input', (e) => {
      this.filterValues(e.target.value);
    });

    searchContainer.appendChild(searchInput);
    return searchContainer;
  }

  createSelectAllOption(values) {
    const selectAllContainer = document.createElement('div');
    selectAllContainer.className = 'npf-select-all-container';

    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.id = 'npf-select-all';
    selectAllCheckbox.className = 'npf-checkbox';

    const selectAllLabel = document.createElement('label');
    selectAllLabel.htmlFor = 'npf-select-all';
    selectAllLabel.textContent = 'Select All';
    selectAllLabel.className = 'npf-label';

    selectAllCheckbox.addEventListener('change', (e) => {
      this.handleSelectAll(e.target.checked, values);
    });

    selectAllContainer.appendChild(selectAllCheckbox);
    selectAllContainer.appendChild(selectAllLabel);
    return selectAllContainer;
  }

  createCheckboxList(values) {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'npf-checkbox-container';

    values.forEach(value => {
      const checkboxItem = document.createElement('div');
      checkboxItem.className = 'npf-checkbox-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `npf-${value}`;
      checkbox.className = 'npf-checkbox';
      checkbox.checked = this.filterState.has(value);

      const label = document.createElement('label');
      label.htmlFor = `npf-${value}`;
      label.textContent = value;
      label.className = 'npf-label';

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
    if (checked) {
      values.forEach(value => {
        this.filterState.add(value);
      });
    } else {
      this.filterState.clear();
    }
    
    this.updateCheckboxes();
    this.emitFilter();
  }

  handleCheckboxChange(value, checked) {
    if (checked) {
      this.filterState.add(value);
    } else {
      this.filterState.delete(value);
    }
    
    this.updateSelectAllState();
    this.emitFilter();
  }

  updateCheckboxes() {
    const checkboxes = this.container.querySelectorAll('.npf-checkbox');
    checkboxes.forEach(checkbox => {
      if (checkbox.id !== 'npf-select-all') {
        const value = checkbox.id.replace('npf-', '');
        checkbox.checked = this.filterState.has(value);
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

  renderEmptyState() {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'npf-empty-state';
    emptyMessage.textContent = 'No data available for filtering';
    this.container.appendChild(emptyMessage);
  }

  emitInitialFilter() {
    // Always include null values in the filter, even with empty dataset
    this.emitFilter();
  }

  emitFilter() {
    // Create filter with chosen values + always include __NULL__
    const filterValues = Array.from(this.filterState);
    
    // Always inject __NULL__ sentinel
    if (!filterValues.includes('__NULL__')) {
      filterValues.push('__NULL__');
    }

    // Use current interactions API
    if (typeof dscc !== 'undefined' && dscc.sendInteraction) {
      // Modern API
      dscc.sendInteraction('FILTER', {
        table: 'DEFAULT',
        column: 'dimID',
        values: filterValues
      });
    } else {
      // Fallback for legacy support
      console.log('[NullPreserverFilter] Filter applied (legacy):', {
        table: 'DEFAULT',
        column: 'dimID',
        values: filterValues
      });
    }
  }
}

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { drawViz, NullPreserverFilter };
}
