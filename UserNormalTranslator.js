/*------------------------------------------------------------

	UserNormal Translator
	version 1.0, 24 Dec., 2014

	Copyright (c) 2014, Gotetz(http://gotetz-log.blogspot.jp/)
	All rights reserved.
	
	Released under the MIT License.
	http://opensource.org/licenses/mit-license.php

------------------------------------------------------------*/

function XSILoadPlugin(in_reg)
{
	in_reg.Author = "GOTETZ";
	in_reg.Name = "UserNormal Translator";
	in_reg.Email = "";
	in_reg.URL = "";
	in_reg.Major = 1;
	in_reg.Minor = 0;
	in_reg.RegisterCommand("UserNormalTranslator", "UserNormalTranslator");
	in_reg.RegisterProperty("UserNormalTranslator_Prop");
	in_reg.RegisterMenu(siMenuTbModelModifyComponentID, "UserNormalTranslator_Menu", false);
	//	RegistrationInsertionPoint - do not remove this line
	
	return true;
}

//------------------------------------------------------------

function XSIUnloadPlugin(in_reg)
{
	strPluginName = in_reg.Name;
	
	return true;
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_Define(ctxt)
{
	var oProp = ctxt.Source;
	oProp.Addparameter3("mode", siInt4, -1, null, null, false);
	oProp.Addparameter3("modeAdd", siInt4, -1, null, null, false);
	oProp.Addparameter3("modeMulti", siInt4, -1, null, null, false);
	oProp.Addparameter3("offsetX", siFloat, 0, -5, 5, false);
	oProp.Addparameter3("offsetY", siFloat, 0, -5, 5, false);
	oProp.Addparameter3("offsetZ", siFloat, 0, -5, 5, false);
	oProp.Addparameter3("IsWorld", siBool, false, null, null, false);
	oProp.Addparameter3("IsAbsolute", siBool, false, null, null, false);
	oProp.Addparameter3("sphereRatio", siFloat, 0.5, 0, 1, false);
	
	return true;
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_DefineLayout(ctxt)
{
	var oLayout = ctxt.Source;
	oLayout.Clear();
	oLayout.AddGroup("Offset");
		oLayout.AddSpacer(0, 6);
		oLayout.AddRow();
			oUI = oLayout.AddEnumControl("modeAdd", ["Add", 0], "Mode", siControlRadio);
			oUI.SetAttribute(siUILabelPercentage, 55);
			oUI.SetAttribute(siUIWidthPercentage, 45);
			oUI.SetAttribute(siUICX, 40);
			oUI = oLayout.AddEnumControl("modeMulti", ["Multiply", 1], "", siControlRadio);
			oUI.SetAttribute(siUINoLabel, true);
			oLayout.AddSpacer();
		oLayout.EndRow();
		oLayout.AddSpacer(0, 3);
		oLayout.AddRow();
			oLayout.AddGroup("", false, 8)
				var oUI = oLayout.AddButton("btnXApply", "X");
				oUI.SetAttribute(siUICX, 30);
				oUI = oLayout.AddButton("btnYApply", "Y");
				oUI.SetAttribute(siUICX, 30);
				oUI = oLayout.AddButton("btnZApply", "Z");
				oUI.SetAttribute(siUICX, 30);
			oLayout.EndGroup();
			oLayout.AddGroup("", false, 5)
			oLayout.EndGroup();
			oLayout.AddGroup("", false, 38)
				var sldWid = 120;
				var oUI = oLayout.AddItem("offsetX", "X");
				oUI.SetAttribute(siUINoLabel, true);
				oUI.SetAttribute(siUILabelPercentage, 10);
				oUI.SetAttribute(siUIWidthPercentage, 90);
				oUI.SetAttribute(siUICX, sldWid);
				oUI = oLayout.AddItem("offsetY", "Y");
				oUI.SetAttribute(siUINoLabel, true);
				oUI.SetAttribute(siUILabelPercentage, 10);
				oUI.SetAttribute(siUIWidthPercentage, 90);
				oUI.SetAttribute(siUICX, sldWid);
				oUI = oLayout.AddItem("offsetZ", "Z");
				oUI.SetAttribute(siUINoLabel, true);
				oUI.SetAttribute(siUILabelPercentage, 10);
				oUI.SetAttribute(siUIWidthPercentage, 90);
				oUI.SetAttribute(siUICX, sldWid);
			oLayout.EndGroup();
			oLayout.AddGroup("", false, 2)
			oLayout.EndGroup();
			oLayout.AddGroup("", false, 47)
				oLayout.AddRow();
					var oUI = oLayout.AddButton("btnXSub1", "-0.1");
					oUI.SetAttribute(siUICX, 36);
					oUI = oLayout.AddButton("btnXSub5", "-0.5");
					oUI.SetAttribute(siUICX, 36);
					oUI = oLayout.AddButton("btnXAdd5", "+0.5");
					oUI.SetAttribute(siUICX, 36);
					oUI = oLayout.AddButton("btnXAdd1", "+0.1");
					oUI.SetAttribute(siUICX, 36);
				oLayout.EndRow();
				oLayout.AddRow();
					var oUI = oLayout.AddButton("btnYSub1", "-0.1");
					oUI.SetAttribute(siUICX, 36);
					oUI = oLayout.AddButton("btnYSub5", "-0.5");
					oUI.SetAttribute(siUICX, 36);
					oUI = oLayout.AddButton("btnYAdd5", "+0.5");
					oUI.SetAttribute(siUICX, 36);
					oUI = oLayout.AddButton("btnYAdd1", "+0.1");
					oUI.SetAttribute(siUICX, 36);
				oLayout.EndRow();
				oLayout.AddRow();
					var oUI = oLayout.AddButton("btnZSub1", "-0.1");
					oUI.SetAttribute(siUICX, 36);
					oUI = oLayout.AddButton("btnZSub5", "-0.5");
					oUI.SetAttribute(siUICX, 36);
					oUI = oLayout.AddButton("btnZAdd5", "+0.5");
					oUI.SetAttribute(siUICX, 36);
					oUI = oLayout.AddButton("btnZAdd1", "+0.1");
					oUI.SetAttribute(siUICX, 36);
				oLayout.EndRow();
			oLayout.EndGroup();
		oLayout.EndRow();
		oLayout.AddSpacer(0, 3);
		oLayout.AddRow();
			oUI = oLayout.AddButton("btnReset", "Reset");
			oUI.SetAttribute(siUICX, 60);
			oUI.SetAttribute(siUIWidthPercentage, 24);
			oUI = oLayout.AddStaticText(" ");
			//oUI.SetAttribute(siUICX, 20);
			oUI.SetAttribute(siUIWidthPercentage, 10);
			oUI = oLayout.AddItem("IsAbsolute", "Absolute Value");
			oUI.SetAttribute(siUILabelPercentage, 50);
			oUI.SetAttribute(siUIWidthPercentage, 33);
			//oUI.SetAttribute(siUICX, 120);
			oUI = oLayout.AddItem("IsWorld", "World Space");
			oUI.SetAttribute(siUILabelPercentage, 50);
			oUI.SetAttribute(siUIWidthPercentage, 33);
			//oUI.SetAttribute(siUICX, 120);
		oLayout.EndRow();
		oLayout.AddSpacer(0, 6);
		oLayout.AddRow();
			oLayout.AddSpacer();
			var oUI = oLayout.AddButton("btnXYZApply", "Apply");
			oUI.SetAttribute(siUICX, 120);
		oLayout.EndRow();
	oLayout.EndGroup();
	
	oLayout.AddGroup("Spherize");
		oLayout.AddSpacer(0, 6);
		oLayout.AddRow();
			oLayout.AddGroup("", false, 13)
				var oUI = oLayout.AddStaticText("Ratio");
				oUI.SetAttribute(siUICX, 30);
			oLayout.EndGroup();
			oLayout.AddGroup("", false, 38)
				var sldWid = 120;
				var oUI = oLayout.AddItem("sphereRatio", "");
				oUI.SetAttribute(siUINoLabel, true);
				oUI.SetAttribute(siUICX, sldWid);
			oLayout.EndGroup();
			oLayout.AddGroup("", false, 2)
			oLayout.EndGroup();
			oLayout.AddGroup("", false, 47)
				oLayout.AddRow();
					var sldWid = 36;
					var oUI = oLayout.AddButton("btnSphere01", "0.1");
					oUI.SetAttribute(siUICX, sldWid);
					oUI = oLayout.AddButton("btnSphere02", "0.25");
					oUI.SetAttribute(siUICX, sldWid);
					oUI = oLayout.AddButton("btnSphere05", "0.5");
					oUI.SetAttribute(siUICX, sldWid);
					oUI = oLayout.AddButton("btnSphere07", "0.75");
					oUI.SetAttribute(siUICX, sldWid);
				oLayout.EndRow();
			oLayout.EndGroup();
		oLayout.EndRow();
		oLayout.AddSpacer(0, 3);
		oLayout.AddRow();
			var btnWid = 100;
			var oUI = oLayout.AddButton("btnCenter", "Create Center");
			oUI.SetAttribute(siUICX, 120);
			oLayout.AddSpacer(0, 0);
			oUI = oLayout.AddButton("btnSpherize", "Apply");
			oUI.SetAttribute(siUICX, 120);
		oLayout.EndRow();
	oLayout.EndGroup();

	oLayout.AddGroup("Normal Editing Tools");
		oLayout.AddSpacer(0, 6);
		oLayout.AddRow();
			var btnWid = 100;
			var oUI = oLayout.AddButton("btnNormalNormal", "Normalize");
			oUI.SetAttribute(siUICX, btnWid);
			oUI = oLayout.AddButton("btnInvertNormal", "Invert");
			oUI.SetAttribute(siUICX, btnWid);
			oUI = oLayout.AddButton("btnResetNormal", "Reset");
			oUI.SetAttribute(siUICX, btnWid);
		oLayout.EndRow();
		oLayout.AddSpacer(0, 6);
		oLayout.AddRow();
			var oUI = oLayout.AddButton("btnSmoothNormal", "Smooth");
			oUI.SetAttribute(siUICX, 100);
			var oUI = oLayout.AddButton("btnRemakeCluster", "Remake UserNormal");
			oUI.SetAttribute(siUICX, 200);
		oLayout.EndRow();
	oLayout.EndGroup();
	oLayout.AddGroup("Edit Value (Use VertexColor)");
		oLayout.AddSpacer(0, 6);
		oLayout.AddRow();
			var btnWid = 150;
			var oUI = oLayout.AddButton("btnPlotColor", "Normal to VertexColor");
			oUI.SetAttribute(siUICX, btnWid);
			oUI = oLayout.AddButton("btnPlotNormal", "VertexColor to Normal");
			oUI.SetAttribute(siUICX, btnWid);
		oLayout.EndRow();
	oLayout.EndGroup();

	return true;
}

//------------------------------------------------------------
//		PPG Methods
//------------------------------------------------------------

function UserNormalTranslator_Prop_modeAdd_OnChanged()
{
	PPG.mode = 1;
	PPG.modeMulti = -1;
	PPG.IsAbsolute.ReadOnly = false; 
	UserNormalTranslator_ResetOffsetValue()
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_modeMulti_OnChanged()
{
	PPG.mode = 2;
	PPG.modeAdd = -1;
	PPG.IsAbsolute.ReadOnly = true; 
	UserNormalTranslator_ResetOffsetValue()
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnXApply_OnClicked()
{
	if(PPG.mode == 1)
	{
		UserNormalTranslator_ApplyOffset([PPG.offsetX, 0, 0]);
	}
	else if(PPG.mode == 2)
	{
		UserNormalTranslator_ApplyOffset([PPG.offsetX, 1, 1]);
	}
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnXSub1_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = -0.1;
		PPG.offsetY = 0;
		PPG.offsetZ = 0;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = -0.1;
		PPG.offsetY = 1;
		PPG.offsetZ = 1;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnXSub5_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = -0.5;
		PPG.offsetY = 0;
		PPG.offsetZ = 0;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = -0.5;
		PPG.offsetY = 1;
		PPG.offsetZ = 1;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnXAdd5_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0.5;
		PPG.offsetY = 0;
		PPG.offsetZ = 0;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 0.5;
		PPG.offsetY = 1;
		PPG.offsetZ = 1;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnXAdd1_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0.1;
		PPG.offsetY = 0;
		PPG.offsetZ = 0;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 0.1;
		PPG.offsetY = 1;
		PPG.offsetZ = 1;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnYApply_OnClicked()
{
	if(PPG.mode == 1)
	{
		UserNormalTranslator_ApplyOffset([0, PPG.offsetY, 0]);
	}
	else if(PPG.mode == 2)
	{
		UserNormalTranslator_ApplyOffset([1, PPG.offsetY, 1]);
	}
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnYSub1_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0;
		PPG.offsetY = -0.1;
		PPG.offsetZ = 0;	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 1;
		PPG.offsetY = -0.1;
		PPG.offsetZ = 1;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnYSub5_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0;
		PPG.offsetY = -0.5;
		PPG.offsetZ = 0;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 1;
		PPG.offsetY = -0.5;
		PPG.offsetZ = 1;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnYAdd5_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0;
		PPG.offsetY = 0.5;
		PPG.offsetZ = 0;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 1;
		PPG.offsetY = 0.5;
		PPG.offsetZ = 1;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnYAdd1_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0;
		PPG.offsetY = 0.1;
		PPG.offsetZ = 0;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 1;
		PPG.offsetY = 0.1;
		PPG.offsetZ = 1;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnZApply_OnClicked()
{
	if(PPG.mode == 1)
	{
		UserNormalTranslator_ApplyOffset([0, 0, PPG.offsetZ]);
	}
	else if(PPG.mode == 2)
	{
		UserNormalTranslator_ApplyOffset([1, 1, PPG.offsetZ]);
	}
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnZSub1_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0;
		PPG.offsetY = 0;
		PPG.offsetZ = -0.1;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 1;
		PPG.offsetY = 1;
		PPG.offsetZ = -0.1;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnZSub5_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0;
		PPG.offsetY = 0;
		PPG.offsetZ = -0.5;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 1;
		PPG.offsetY = 1;
		PPG.offsetZ = -0.5;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnZAdd5_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0;
		PPG.offsetY = 0;
		PPG.offsetZ = 0.5;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 1;
		PPG.offsetY = 1;
		PPG.offsetZ = 0.5;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnZAdd1_OnClicked()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0;
		PPG.offsetY = 0;
		PPG.offsetZ = 0.1;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 1;
		PPG.offsetY = 1;
		PPG.offsetZ = 0.1;
	}
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnReset_OnClicked()
{
	UserNormalTranslator_ResetOffsetValue();
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnXYZApply_OnClicked()
{
	UserNormalTranslator_ApplyOffset([PPG.offsetX, PPG.offsetY, PPG.offsetZ]);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnSphere01_OnClicked()
{
	PPG.sphereRatio = 0.1;
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnSphere02_OnClicked()
{
	PPG.sphereRatio = 0.25;
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnSphere05_OnClicked()
{
	PPG.sphereRatio = 0.5;
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnSphere07_OnClicked()
{
	PPG.sphereRatio = 0.75;
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnCenter_OnClicked()
{
	var nullName = "UserNormalTrans_Center";
	var oNull = ActiveSceneRoot.FindChild2(nullName, siNullPrimType, siNullPrimitiveFamily, false);
	if(oNull == null)
	{
		oNull = ActiveSceneRoot.AddNull(nullName);
	}
	var aRtn = GetBBox();
	var xmin = aRtn.value("LowerBoundX");
	var ymin = aRtn.value("LowerBoundY");
	var zmin = aRtn.value("LowerBoundZ");
	var xmax = aRtn.value("UpperBoundX");
	var ymax = aRtn.value("UpperBoundY");
	var zmax = aRtn.value("UpperBoundZ");
	var x = xmin + (xmax - xmin) * 0.5;
	var y = ymin + (ymax - ymin) * 0.5;
	var z = zmin + (zmax - zmin) * 0.5;
	
	oNull.LocalTranslation.Set(x, y ,z);
	
	var msg;
	if (Preferences.GetPreferenceValue("General.language") == "jp")
	{
		msg = "センター用ヌルを作成しました。";
	}
	else
	{
		msg = "Created a center null.";
	}
	XSIUIToolkit.MsgBox(msg, siMsgOkOnly, "UserNormalTranslator");

	SelectObj(oNull);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnSphere01_OnClicked()
{
	PPG.sphereRatio = 0.1;
	UserNormalTranslator_SpherizeNormal(PPG.sphereRatio);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnSphere02_OnClicked()
{
	PPG.sphereRatio = 0.25;
	UserNormalTranslator_SpherizeNormal(PPG.sphereRatio);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnSphere05_OnClicked()
{
	PPG.sphereRatio = 0.5;
	UserNormalTranslator_SpherizeNormal(PPG.sphereRatio);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnSphere07_OnClicked()
{
	PPG.sphereRatio = 0.75;
	UserNormalTranslator_SpherizeNormal(PPG.sphereRatio);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnSpherize_OnClicked()
{
	UserNormalTranslator_SpherizeNormal(PPG.sphereRatio);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnResetNormal_OnClicked()
{
	// ユーザー法線をリセット
	ResetUserNormals(null, false);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnNormalizeNormal_OnClicked()
{
	// ユーザー法線を正規化
	NormalizeUserNormals(null, false);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnInvertNormal_OnClicked()
{
	// ユーザー法線を反転
	InvertUserNormals(null, false);
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnSmoothNormal_OnClicked()
{
	// ユーザー法線を平均化
	//SmoothUserNormals(null, 1, true);
	UserNormalTranslator_SmoothUserNormal();
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnRemakeCluster_OnClicked()
{
	UserNormalTranslator_RemakeUserNormal();
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnPlotColor_OnClicked()
{
	UserNormalTranslator_NormalToColor();
}

//------------------------------------------------------------

function UserNormalTranslator_Prop_btnPlotNormal_OnClicked()
{
	UserNormalTranslator_ColorToNormal();
}

//------------------------------------------------------------
//		Plugin Init
//------------------------------------------------------------

function UserNormalTranslator_Menu_Init(ctxt)
{
	var oMenu = ctxt.Source;
	oMenu.AddCommandItem( "UserNormal Translator", "UserNormalTranslator" );

	return true;
}

//------------------------------------------------------------

function UserNormalTranslator_Init(ctxt)
{
	var oCmd = ctxt.Source;
	oCmd.Description = "UserNormal Editor";
	oCmd.ReturnValue = true;

	return true;
}

//------------------------------------------------------------

function UserNormalTranslator_Execute(ctxt)
{
	var oProp = XSIFactory.CreateObject("UserNormalTranslator_Prop");
	oProp.Name = "UserNormalTranslator";
	oProp.mode.Value = 1;
	oProp.modeAdd.Value = 0;
	SetGlobal('UserNormalTranslator_Prop', oProp);

	// 既存のビューが存在する場合は再利用
	oView = Desktop.ActiveLayout.Views("UserNormalTranslator");
	if(oView == null)
	{
		oView = Desktop.ActiveLayout.CreateView("Property Panel", "UserNormalTranslator");
	}
	oView.BeginEdit();
	oView.Resize(344, 420);
	//oView.Resize(344, 340);
	oView.SetAttributeValue("targetcontent", oProp.FullName);
	oView.Name = "UserNormalTranslator";
	oView.EndEdit();
	
	return true;
}

//------------------------------------------------------------

function UserNormalTranslator_GetUserNormal(oObj)
{
	var oNmlProp = null;
	var cCls = oObj.ActivePrimitive.Geometry.Clusters.Filter(siSampledPointCluster);
	for(var i = 0; i < cCls.Count; i++)
	{
		oNmlProp = cCls(i).LocalProperties.Find("normal");
		if(oNmlProp != null)
		{
			break;
		}
	}
	return oNmlProp;
}

//------------------------------------------------------------

function UserNormalTranslator_GetPointIndicies(cComp)
{
	var aPoints = []
	for(var i = 0; i < cComp.Count; i++)
	{
		for(var j = 0; j < cComp(i).Points.Count; j++)
		{
			aPoints.push(cComp(i).Points(j).Index);
		}
	}
	return(aPoints);
}

//------------------------------------------------------------

function UserNormalTranslator_GetSubComp()
{
	var oSel = GetValue("SelectionList")(0);
	var oSelSubcomp;
	var oPntSubComp;
	// 選択・クラスタのサブコンポーネントを取得
	if(oSel != null)
	{
		var selClass = ClassName(oSel);
		if(selClass == "Cluster")
		{
			// クラスタ
			oSelSubcomp = oSel.CreateSubComponent();
		}
		else if(selClass == "CollectionItem")
		{
			// コンポーネント
			oSelSubcomp = oSel.Subcomponent;
		}
		else if(oSel.Type == siPolyMeshType)
		{
			// ポリゴンメッシュオブジェクト
			oSelSubcomp = oSel.ActivePrimitive.Geometry.Points.Subcomponent;
		}
	}
	if(oSelSubcomp == null)
	{
		var msg;
		if (Preferences.GetPreferenceValue("General.language") == "jp")
		{
			msg = "ポリゴンメッシュのコンポーネントかクラスターを選択してください。";
		}
		else
		{
			msg = "Please select components or cluster on polyMesh.";
		}
		XSIUIToolkit.Msgbox(msg, siMsgOkOnly, "UserNormalTranslator");
	}
	else if(oSelSubcomp.Parent3DObject.Type != siPolyMeshType)
	{
		// ポリゴンメッシュのみ対応
		var msg
		if (Preferences.GetPreferenceValue("General.language") == "jp")
		{
			msg = "ポリゴンメッシュのみサポートしています。";
		}
		else
		{
			msg = "Polymesh is only supported.";
		}
		XSIUIToolkit.Msgbox(msg, siMsgOkOnly, "UserNormalTranslator");
		oSelSubcomp = null;
 	}
	else
	{
		var aPoints = [];
		if(oSelSubcomp.Type == "pntSubComponent")
		{
			//pntSubComponent
			aPoints = oSelSubcomp.ComponentCollection.IndexArray.toArray();
		}
		else if(oSelSubcomp.Type == "edgeSubComponent" || oSelSubcomp.Type == "polySubComponent")
		{
			//edgeSubComponent & polySubComponent
			aPoints = UserNormalTranslator_GetPointIndicies(oSelSubcomp.ComponentCollection);
		}
		oPntSubComp = oSelSubcomp.Parent.CreateSubComponent("pnt");
		oPntSubComp.ElementArray = aPoints;
	}
	
	return oPntSubComp;
}

//------------------------------------------------------------
// 近傍頂点間でのユーザ法線の平均化
function UserNormalTranslator_SmoothUserNormal()
{
	var oPntSubComp = UserNormalTranslator_GetSubComp();
	if(oPntSubComp == null)
	{
		return;
	}
	
	var cSelComp = oPntSubComp.ComponentCollection;
	var oGeo = oPntSubComp.Parent;
	
	// ユーザー法線適用
	CreateUserNormals(oPntSubComp, false);
	// ユーザー法線クラスタ取得
	var oNmlProp = UserNormalTranslator_GetUserNormal(oPntSubComp.Parent3DObject);
	// ユーザー法線ベクトルを格納
	var cClsElem = oNmlProp.Parent.Elements;
	var cNmlElem = oNmlProp.Elements;
	var grNmlIn = XSIFactory.CreateGridData();
	grNmlIn.Data = cNmlElem.Array;
	
	// 事前に各頂点の法線を平均化
	var aNormal = new Array(oGeo.Points.Count);
	for(var i = 0; i < oGeo.Points.Count; i++)
	{
		aNormal[oGeo.Points(i).Index] = oGeo.Points(i).Normal;
	}
	for(var i = 0; i < cSelComp.Count; i++)
	{
		var cSample = cSelComp(i).Samples;
		var sumNml = XSIMath.CreateVector3([0, 0, 0]);
		for(var j = 0; j < cSample.Count; j++)
		{
			var index = cClsElem.FindIndex(cSample(j).Index);
			sumNml.AddInPlace(XSIMath.CreateVector3(cNmlElem(index).toArray()));
		}
		sumNml.NormalizeInPlace();	// Average
		//sumNml.ScaleInPlace(1 / cSample.Count)
		//sumNml.NormalizeInPlace();	// Average
		aNormal[cSelComp(i).Index] = sumNml;
	}
	
	// スムージング
	for(var i = 0; i < cSelComp.Count; i++)
	{
		var oPnt = cSelComp(i);
		var cNeighbor = oPnt.NeighborVertices(1);	// 最近傍のみ
		var sumNml = aNormal[oPnt.Index];
		for(var j = 0; j < cNeighbor.Count; j++)
		{
			sumNml.AddInPlace(aNormal[cNeighbor(j).Index]);
		}
		sumNml.NormalizeInPlace();	// Average
		
		for(var j = 0; j < oPnt.Samples.Count; j++)
		{
			var index = cClsElem.FindIndex(oPnt.Samples(j).Index);
			grNmlIn.SetRowValues(index, sumNml.Get2());
		}
	}
	oNmlProp.Elements.Array = grNmlIn.Data;
	
	// 選択更新（SI2013バグ対応）
	SelectObj(GetValue("SelectionList"));
	Undo();
}

//------------------------------------------------------------
// ユーザ法線クラスタの再作成
function UserNormalTranslator_RemakeUserNormal()
{
	var oPntSubComp = UserNormalTranslator_GetSubComp();
	if(oPntSubComp == null)
	{
		return;
	}
	
	var oObj = oPntSubComp.Parent3DObject;

	// 現在のユーザー法線をバックアップ
	var oNmlProp = UserNormalTranslator_GetUserNormal(oObj);
	if(oNmlProp != null)
	{
		var oComp = oNmlProp.Parent.CreateSubComponent()
		var aIndex = oNmlProp.Parent.Elements.Array.toArray();
		var grOldNml = XSIFactory.CreateGridData();
		grOldNml.Data = oNmlProp.Elements.Array;
		
		// ユーザー法線を作り直す
		DeleteObj(oNmlProp.Parent);
		CreateUserNormals(oComp, false);
		
		// 元のユーザー法線を戻す
		oNmlProp = UserNormalTranslator_GetUserNormal(oObj);
		var oCls = oNmlProp.Parent;
		var grNewNml = XSIFactory.CreateGridData();
		grNewNml.RowCount = grOldNml.RowCount;
		grNewNml.ColumnCount = grOldNml.ColumnCount;
		
		for(var i = 1; i < aIndex.length; i++)
		{
			var index = oCls.FindIndex(aIndex[i]);
			grNewNml.SetRowValues(index, grOldNml.GetRowValues(i));
		}
		oNmlProp.Elements.Array = grNewNml.Data;
	}
	else
	{
		CreateUserNormals(oObj, false);
	}
}

//------------------------------------------------------------

function UserNormalTranslator_NormalToColor()
{
	var oPntSubComp = UserNormalTranslator_GetSubComp();
	if(oPntSubComp == null)
	{
		return;
	}
	var cSelComp = oPntSubComp.ComponentCollection;
	
	var oObj = oPntSubComp.Parent3DObject;	
	// ユーザー法線適用
	CreateUserNormals(oPntSubComp, false);
	// ユーザー法線クラスタプロパティ取得
	var oNmlProp = UserNormalTranslator_GetUserNormal(oPntSubComp.Parent3DObject);
	// ユーザー法線クラスタ取得
	var oNmlCls = oNmlProp.Parent;
	var aNmlIndex = oNmlCls.Elements.Array.toArray();
	// ユーザー法線ベクトル取得
	var cNmlElem = oNmlProp.Elements;
	
	var oGeo = oObj.ActivePrimitive.Geometry;
	// 既存の頂点カラーを削除
	var oVtxCol = oGeo.VertexColors.Item("UserNormalTemp");
	if(oVtxCol != null)
	{
		DeleteObj(oVtxCol);
	}
	// 頂点カラー作成	
	oVtxCol = CreateVertexColorSupport(null, "UserNormalTemp", oNmlCls.CreateSubComponent())(0);
	// 頂点カラークラスタ取得
	var oVCCls = oVtxCol.Parent;

	var grVtxCol = XSIFactory.CreateGridData();
	grVtxCol.Data = oVtxCol.Elements.Array;

	// ベクトル --> カラー変換
	for(var i in aNmlIndex)
	{
		var aNmlVal = cNmlElem(i).toArray();
		aNmlVal.push(0);
		// 値を0-1にスケール
		for(j in aNmlVal)
		{
			aNmlVal[j] = (aNmlVal[j] + 1) * 0.5;
		}
		var index = oVCCls.FindIndex([aNmlIndex[i]]);
		grVtxCol.SetRowValues(index, aNmlVal);
	}

	oVtxCol.Elements.Array = grVtxCol.Data;
	oGeo.CurrentVertexColor = oVtxCol;
}

//------------------------------------------------------------

function UserNormalTranslator_ColorToNormal()
{
	var oPntSubComp = UserNormalTranslator_GetSubComp();
	if(oPntSubComp == null)
	{
		return;
	}
	
	var oObj = oPntSubComp.Parent3DObject;
	/*
	var oObj = GetValue("SelectionList")(0);
	// ポリゴンメッシュのみ対応
	if(oObj == null || oObj.type != siPolyMeshType)
	{
		var msg = "Please select polyMesh.";
		XSIUIToolkit.Msgbox(msg, siMsgOkOnly);
		return;
	}
	*/
	var oGeo = oObj.ActivePrimitive.Geometry;
	// 既存の頂点カラーを取得
	var oVtxCol = oGeo.VertexColors.Item("UserNormalTemp");
	if(oVtxCol == null)
	{
		var msg;
		if (Preferences.GetPreferenceValue("General.language") == "jp")
		{
			msg = "頂点カラーマップが見つかりませんでした。";
		}
		else
		{
			msg = "VertexColor was not found.";
		}
		XSIUIToolkit.Msgbox(msg, siMsgOkOnly, "UserNormalTranslator");
		return;
	}
	// 頂点カラークラスタのインデックス
	var aVCIndex = oVtxCol.Parent.Elements.Array.toArray();
	var cVCElem = oVtxCol.Elements;

	// ユーザー法線更新
	CreateUserNormals(oGeo.Points.SubComponent, false);
	// ユーザー法線取得
	var oNmlProp = UserNormalTranslator_GetUserNormal(oObj);
	// ユーザー法線クラスタ
	var oNmlCls = oNmlProp.Parent;
	
	var grNormal = XSIFactory.CreateGridData();
	grNormal.Data = oNmlProp.Elements.Array;
	
	// カラー --> ベクトル変換
	for(var i = 0; i < aVCIndex.length; i++)
	{
		var aVCVal = cVCElem(i).toArray();
		aVCVal = aVCVal.slice(0, 3);
		// 値を-1 ～ 1にスケール
		for(var j = 0; j < aVCVal.length; j++)
		{
			aVCVal[j] = aVCVal[j] * 2 - 1;
		}
		var index = oNmlCls.FindIndex([aVCIndex[i]]);
		grNormal.SetRowValues(index, aVCVal);
	}
	oNmlProp.Elements.Array  = grNormal.Data;
}

//------------------------------------------------------------
// オフセット値初期化
function UserNormalTranslator_ResetOffsetValue()
{
	if(PPG.mode == 1)
	{
		PPG.offsetX = 0;
		PPG.offsetY = 0;
		PPG.offsetZ = 0;
	}
	else if(PPG.mode == 2)
	{
		PPG.offsetX = 1;
		PPG.offsetY = 1;
		PPG.offsetZ = 1;
	}
}

//------------------------------------------------------------
// 加算・乗算分岐
function UserNormalTranslator_ApplyOffset(aMove)
{
	if(PPG.mode == 1)
	{
		UserNormalTranslator_AddOffset(aMove, PPG.IsWorld.Value, PPG.IsAbsolute.Value);
	}
	else if(PPG.mode == 2)
	{
		UserNormalTranslator_MultiplyOffset(aMove);
	}
}

//------------------------------------------------------------
// 加算オフセット
function UserNormalTranslator_AddOffset(aMove, bWorld, bAbs)
{
	var oPntSubComp = UserNormalTranslator_GetSubComp();
	if(oPntSubComp == null)
	{
		return;
	}
	var cSelComp = oPntSubComp.ComponentCollection;
	
	// ユーザー法線適用
	//CreateUserNormals(oPntSubComp, false);
	CreateUserNormals(oPntSubComp.Parent.Points.SubComponent, false);
	// ユーザー法線クラスタ取得
	var oNmlProp = UserNormalTranslator_GetUserNormal(oPntSubComp.Parent3DObject);
	// ユーザー法線ベクトルを格納
	var cClsElem = oNmlProp.Parent.Elements;
	var cNmlElem = oNmlProp.Elements;
	var grNormal = XSIFactory.CreateGridData();
	grNormal.Data = cNmlElem.Array;
	
	// オフセット値
	var vMove = XSIMath.CreateVector3(aMove);
	// オフセット値ワールド変換
	if(bWorld)
	{
		var trs = oPntSubComp.Parent3DObject.Kinematics.Global.Transform;
		trs.SetTranslationFromValues(0, 0, 0);
		var mat = trs.Matrix4;
		mat.Invert(mat);
		vMove.MulByMatrix4InPlace(mat);
	}
	
	for(var i = 0; i < cSelComp.Count; i++)
	{
		var oPnt = cSelComp(i);
		for(var j = 0; j < oPnt.Samples.Count; j++)
		{
			var index = cClsElem.FindIndex(oPnt.Samples(j).Index);
			var vNml;
			if(!bAbs)
			{
				// 加算
				//vNml= XSIMath.CreateVector3(grNormal.GetRowValues(index).toArray());
				vNml= XSIMath.CreateVector3(cNmlElem(index).toArray());
				vNml.AddInPlace(vMove);
			}
			else
			{
				// 絶対値
				vNml = vMove;
			}
			vNml.NormalizeInPlace();
			grNormal.SetRowValues(index, [vNml.x, vNml.y, vNml.z]);
		}
	}
	oNmlProp.Elements.Array = grNormal.Data;
	
	// 選択更新（SI2013バグ対応）
	SelectObj(GetValue("SelectionList"));
	Undo();
}

//------------------------------------------------------------
// 乗算オフセット
function UserNormalTranslator_MultiplyOffset(aMove)
{
	var oPntSubComp = UserNormalTranslator_GetSubComp();
	if(oPntSubComp == null)
	{
		return;
	}
	var cSelComp = oPntSubComp.ComponentCollection;
	
	// ユーザー法線適用
	CreateUserNormals(oPntSubComp, false);
	// ユーザー法線クラスタ取得
	var oNmlProp = UserNormalTranslator_GetUserNormal(oPntSubComp.Parent3DObject);
	// ユーザー法線ベクトルを格納
	var cClsElem = oNmlProp.Parent.Elements;
	var cNmlElem = oNmlProp.Elements;
	var grNormal = XSIFactory.CreateGridData();
	grNormal.Data = cNmlElem.Array;
	
	// オフセット値
	var vMove = XSIMath.CreateVector3(aMove);
	// オフセット値ワールド変換
	if(PPG.IsWorld.Value)
	{
		var trs = oPntSubComp.Parent3DObject.Kinematics.Global.Transform;
		trs.SetTranslationFromValues(0, 0, 0);
		var mat = trs.Matrix4;
		mat.Invert(mat);
		vMove.MulByMatrix4InPlace(mat);
	}
	
	for(var i = 0; i < cSelComp.Count; i++)
	{
		var oPnt = cSelComp(i);
		for(var j = 0; j < oPnt.Samples.Count; j++)
		{
			var index = cClsElem.FindIndex(oPnt.Samples(j).Index);
			// 乗算
			//vNml= XSIMath.CreateVector3(grNormal.GetRowValues(index).toArray());
			var vNml= XSIMath.CreateVector3(cNmlElem(index).toArray());
			vNml.x *= vMove.x;
			vNml.y *= vMove.y;
			vNml.z *= vMove.z;
			vNml.NormalizeInPlace();
			grNormal.SetRowValues(index, [vNml.x, vNml.y, vNml.z]);
		}
	}
	oNmlProp.Elements.Array = grNormal.Data;
	
	// 選択更新（SI2013バグ対応）
	SelectObj(GetValue("SelectionList"));
	Undo();
}

//------------------------------------------------------------

function UserNormalTranslator_SpherizeNormal(ratio)
{
	if(ratio == 0)
	{
		return;
	}

	var oPntSubComp = UserNormalTranslator_GetSubComp();
	if(oPntSubComp == null)
	{
		return;
	}
	var cSelComp = oPntSubComp.ComponentCollection;
	
	// ユーザー法線適用
	//CreateUserNormals(oPntSubComp, false);
	CreateUserNormals(oPntSubComp.Parent.Points.SubComponent, false);
	// ユーザー法線クラスタ取得
	var oNmlProp = UserNormalTranslator_GetUserNormal(oPntSubComp.Parent3DObject);
	// ユーザー法線ベクトルを格納
	var cClsElem = oNmlProp.Parent.Elements;
	var cNmlElem = oNmlProp.Elements;
	var grNormal = XSIFactory.CreateGridData();
	grNormal.Data = cNmlElem.Array;

	// センター位置
	var nullName = "UserNormalTrans_Center";
	var oNull = ActiveSceneRoot.FindChild2(nullName, siNullPrimType, siNullPrimitiveFamily, false);
	var vCenter = XSIMath.CreateVector3();
	if(oNull != null)
	{
		vCenter.Copy(oNull.LocalTranslation);
	}
	else
	{
		var aRtn = GetBBox();
		var xmin = aRtn.value("LowerBoundX");
		var ymin = aRtn.value("LowerBoundY");
		var zmin = aRtn.value("LowerBoundZ");
		var xmax = aRtn.value("UpperBoundX");
		var ymax = aRtn.value("UpperBoundY");
		var zmax = aRtn.value("UpperBoundZ");
		var x = xmin + (xmax - xmin) * 0.5;
		var y = ymin + (ymax - ymin) * 0.5;
		var z = zmin + (zmax - zmin) * 0.5;
		
		vCenter.Set(x, y, z);
	}
	
	// センターの座標をオブジェクトのローカルに変換
	var trs = oPntSubComp.Parent3DObject.Kinematics.Global.Transform;
	var mat = trs.Matrix4;
	mat.Invert(mat);
	vCenter.MulByMatrix4InPlace(mat);
	
	for(var i = 0; i < cSelComp.Count; i++)
	{
		var oPnt = cSelComp(i);
		for(var j = 0; j < oPnt.Samples.Count; j++)
		{
			var index = cClsElem.FindIndex(oPnt.Samples(j).Index);
			var vNml= XSIMath.CreateVector3(cNmlElem(index).toArray());
			var vSphereNml = XSIMath.CreateVector3();
			vSphereNml.Sub(oPnt.Position, vCenter);

			vNml.LinearlyInterpolate(vNml, vSphereNml, ratio);

			vNml.NormalizeInPlace();
			grNormal.SetRowValues(index, [vNml.x, vNml.y, vNml.z]);
		}
	}
	oNmlProp.Elements.Array = grNormal.Data;
	
	// 選択更新（SI2013バグ対応）
	SelectObj(GetValue("SelectionList"));
	Undo();
}

//------------------------------------------------------------
