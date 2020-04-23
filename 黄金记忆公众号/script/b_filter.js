?
/**
 * edatagrid - jQuery EasyUI
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2011-2015 www.jeasyui.com 
 * 
 * Dependencies:
 *   datagrid
 *   messager
 * 
 */
(function ($) {
    //��ʼ�����¼�
    $(function () {
       
    });
    $.fn.extend({
        comboboxfilter: function (ops) {
            if (typeof (arguments[0]) != typeof ("string")) {
                return $.fn.comboboxfilter.methods["init"](this, ops);
            } else {
                return $.fn.comboboxfilter.methods[arguments[0]](this, arguments);
            }
        }
    });

    //����
    $.fn.comboboxfilter.methods = {
        options: function (target) {
            var opts = $(target).data("comboboxfilter").options;
            return opts;
        },
        init: function (target, ops) {
            var $this = this;
            var options = $.extend({}, $.fn.comboboxfilter.defaults, ops);
            $(target).data("comboboxfilter", { options: options });
            $(target).removeClass('hotel-filter-list filter-list-has-more hotel-filter-list-min').addClass("hotel-filter-list filter-list-has-more hotel-filter-list-min");
            var listcontainer = $('<div class="con"></div>').addClass(!options.multiple ? "radio" : "checkbox");
            if (options.unlimit) {//����������� ����� 
                var anyNode = $('<ul class="any"><li><a class="filter-unlimit filter-tag selected" href="javascript:;" data-value="">' + options.unlimitText + '</a></li></ul>').bind('click',function() {
                    $(anyNode).find('.filter-unlimit').removeClass('selected').addClass('selected');
                    $this.clear(target);
                });
                listcontainer.append(anyNode);
            }
            listcontainer.append('<ul class="list"></ul> <span class="J_FilterMore filter-more"><span class="open">����</span><span class="close">����</span><i></i></span>');
            listcontainer.find('.open').unbind('click').bind('click', function() {//�󶨵�������¼�
                $(target).removeClass('hotel-filter-list-min');
            });
            listcontainer.find('.close').unbind('click').bind('click', function () {//�󶨵�������¼�
                $(target).addClass('hotel-filter-list-min');
            });
            $(target).html($('<strong class="tit">' + options.text + '</strong>'));
            if (options.inputName) {//������ص�inputName
                $(target).append($('<input type="hidden" name="' + options.inputName + '" value="">'));
            }
            //���з���
            if (options.scope) {
                $(target).attr('scope', options.scope);//����Զ����������
                if ($('#' + options.scope).length>0) {
                    
                } else {
                    var node = $('<div id="' + options.scope + '" class="hotel-filter-list "><strong class="tit">��ѡ</strong><div class="con selected-query"><ul  class="list"><li class="filter-query-clear"><a class="J_FilterQueryClear" href="javascript:;">ȫ�����</a></li></ul></div></div>');
                    node.find('.J_FilterQueryClear').unbind('click').bind('click',function() {//ȫ������¼�
                        $('div[scope="' + options.scope + '"]').comboboxfilter('clear');
                    });
                    $('div[scope="' + options.scope + '"]:eq(0)').before(node);
                }
            }
            $(target).append(listcontainer);
            this.load(target,{});

        },
        reload: function (target) {
            this.load(target,{});
        },
        load: function (target, opts) {
            var $this = this;
            var options = $.extend({}, $.fn.comboboxfilter.methods["options"](target), opts);
            if (opts.url) {
                $.ajax({
                    type: 'post',
                    data: options.param,
                    url: options.url,
                    success: function(data) {
                        if (typeof (data) == typeof ("string")) {
                            data = $.parseJSON(data);
                        }
                        var listTarget = $(target).find('.list').html('');
                        $this.setData(listTarget, options, data, target);
                    },
                    error: function(e) {
                        $this.onError(e);
                    }
                });
            } else {
                var listTarget = $(target).find('.list').html('');
                $this.setData(listTarget, options, options.data, target);
            }
            
        },
        loadData: function (target, data) {
            var $this = this;
            var options = $this.options(target);
            var listTarget = $(target).find('.list').html('');
            $this.setData(listTarget, options, data, target);

        },
        setData: function (target, options, data, targetContain) {
            var $this = this;
            $.each(data, function (i, item) {
                var listnode = $(' <li></li>');
                var clicka = $('<a class="filter-tag" href="javascript:;" data-value="' + item[options.idField] + '" data-text="' + item[options.textField] + '">' + item[options.textField] + '<i></i></a>').data('data', item);
                clicka.unbind('click').bind('click', function (e) {
                    if (clicka.hasClass('selected')) {//��֤�Ƿ�ѡ���Ѿ�ѡ����ȡ��ѡ�񣬷�֮ѡ��
                        clicka.removeClass('selected');//����ȥ����Ϊ�˼���Value����ȷ�ԣ�
                    } else {
                        if (!options.multiple) {//��ѡִ��
                            $(targetContain).find('.selected').trigger("click.selected-tag");//�����¼����ȫ��ѡ��
                        }
                        clicka.addClass('selected');
                        $this.addSelected($('#' + options.scope), clicka, item, options, targetContain);//���������ѡ����
                    }
                    $this.reSetValue(targetContain); //���¼���Value
                    options.onClick(item);//���������¼�
                });
                listnode.append(clicka);
                target.append(listnode);
            });
            options.onLoadSuccess(data);//������������¼�
        },
        getValue: function(target) {
            var selected = $(target).find('.list .selected');
            var array = new Array();
            $.each(selected, function(i,item) {
                array.push($(item).attr('data-value'));
            });
            return array.join(",");
        },
        setValue: function (target, value) {
            $(target).find('.selected').trigger("click.selected-tag");//�����¼����ȫ��ѡ���������¸�ֵ
            var options = this.options(target);
            var clicka = $(target).find('.filter-tag[data-value="' + value[1] + '"]');
            if (clicka.length > 0) {
                clicka.addClass('selected');
                var item = $(clicka).data('data');//ȡֵ
                this.addSelected($('#' + options.scope), clicka, item, options, target);//���������ѡ����
            }
            this.reSetValue(target); //���¼���Value
        },
        setValues: function (target, valueArray) {
            var $this = this;
            var options = this.options(target);
            if (options.multiple) {//������ѡ����
                $(target).find('.selected').trigger("click.selected-tag");//�����¼����ȫ��ѡ���������¸�ֵ
                $.each(valueArray[1], function (i, itemData) {
                    var clicka = $(target).find('.filter-tag[data-value="' + itemData + '"]');
                    if (clicka.length > 0) {
                        clicka.addClass('selected');
                        var item = $(clicka).data('data');//ȡֵ
                        $this.addSelected($('#' + options.scope), clicka, item, options, target);//���������ѡ����
                    }
                });
                $this.reSetValue(target); //���¼���Value
            }
        },
        //����Ѿ�ѡ����
        //pointTarget��ѡ��������
        //target ���������
        //itemData ��ѡ������
        addSelected: function (pointTarget, target, itemData, options, targetContain) {
            var $this = this;
          var anode = $('<a href="javascript:;">' + itemData[options.textField] + '</a>');
                //����X ,������Ƴ�ѡ����
                var inode = $('<i class="J_FilterQueryDel" data-type="ParentCatelog" data-value="' + itemData[options.idField] + '"></i>').unbind('click').bind('click', function (e) {
                    $(target).trigger("click.selected-tag");//�����¼�
                   // $(e.target).closest('.selected-tag').remove();
                    $this.reSetValue(targetContain); //���¼���Value
                });
                //��ָ�������ռ�ĵ����¼�
                $(target).unbind('click.selected-tag').bind('click.selected-tag', function (e) {
                    $(target).removeClass('selected');
                    $(anode).closest('.selected-tag').remove();
                    $(target).unbind('click.selected-tag');
                });
                anode.append(inode);
                pointTarget.find('.list').append($('<li data-type="ParentCatelog" class="selected-tag"></li>').append(anode));
        },
        //���¼���Value
        reSetValue: function (target) {
            var value = this.getValue(target);
            $(target).find('input[name="' + this.options(target).inputName + '"]').val(value);
            //��ֵ
            if (value) {
                $(target).find('.filter-unlimit').removeClass('selected');
            }
            //��ֵ
            else {
                $(target).find('.filter-unlimit').addClass('selected');
            }
            this.options(target).onChange(value);
        },
        clear: function (target) {
            $(target).find('.selected').trigger("click.selected-tag");//�����¼�
            this.reSetValue(target); //���¼���Value
        }
    }
    $.fn.comboboxfilter.parseOptions = function (target) {
        return $.extend({}, $.fn.datagrid.parseOptions(target), {
        });
    };
   
    $.fn.comboboxfilter.defaults = {
        url: '',	
        idField: 'id',
        textField: 'text',
        scope: 'FilterQuery',
        text: '',
        multiple: false,
	data:[],
        inputName: '',
        unlimit: true,//�Ƿ���ʾ���ޣ�Ĭ����ʾ
        unlimitText:'����',
        param:{},
        onClick: function (itemData) { },
        onChange: function (newValue) { },
        onLoadSuccess: function (data) { },
        onError: function (e) { }
    };
})(jQuery);
