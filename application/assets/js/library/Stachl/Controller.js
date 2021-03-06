Ext.namespace('Stachl');
Stachl.Controller = Ext.extend(Ext.Container, {
	title: 'Stachl Ext Framework',
	copyright: '© 2010 by <a href="http://www.stachl.me/" target="_blank" title="Stachl.me">Stachl.me</a>',
	mainContainer: null,
	views: Stachl.ViewMgr,
	defs: Stachl.DefMgr,
	stores: Ext.StoreMgr,
	forceLayout: true,
	isController: true,
	titleId: null,
	initComponent: function() {	
		this.titleId = Ext.id();
		
		Ext.applyIf(this, {
			flex: 16,
			layout: 'border',
			border: false,
			region: 'center',
			style: 'padding-top:5px;background:transparent;',
			items: [{
		    	xtype: 'container',
		    	region: 'north',
		    	layout: 'column',
		    	height: 50,
		    	items: [{
		    		xtype: 'box',
			    	autoEl: {
		    			id: this.titleId,
		    			tag: 'div',
		    			html: '<h1><span>' + this.title + '</span></h1>',
		    			cls: 'logo'
		    		}
			    }]
			}, this.getMainContainer() , {
				xtype:'box',
				region:'south',
				autoEl:{
					tag:'div',
					html:'<p class="copyright">' + this.copyright + '</p>'
				}
		    }]
		});
		
		Stachl.Controller.superclass.initComponent.call(this);
	},
	show: function() {},	
	setMainContainer: function() {
		this.mainContainer = new Ext.Container({
	    	style: 'padding-top:5px;background:transparent',
	    	border: false,
	    	region: 'center',
	    	layout: 'fit'
		});
		return this;
	},
	getMainContainer: function() {
		if (null === this.mainContainer) {
			this.setMainContainer();
		}
		return this.mainContainer;
	},
	getActiveItem: function() {
		if (Ext.isDefined(this.getMainContainer().getLayout().activeItem)) {
			return this.getMainContainer().getLayout().activeItem;
		}
		return false;
	},
	setActiveItem: function(i) {
		if (this.views.getView(i)) {
			this.getMainContainer().removeAll();
			this.getMainContainer().add(this.views.getView(i));
			this.getMainContainer().doLayout();
			return this.getMainContainer();
		}
		return false;
	},
	setTitle: function(v) {
		Ext.get(this.titleId).child('span').update(v + ' - ' + this.title);
		Ext.getDoc().dom.title = v + ' - ' + this.title;
	}
});
Ext.reg('stachl_controller', Stachl.Controller);