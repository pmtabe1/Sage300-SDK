﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Sage.CA.SBS.ERP.Sage300.IC.Resources.Process {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "15.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class ProcessAdjustmentsResx {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal ProcessAdjustmentsResx() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("Sage.CA.SBS.ERP.Sage300.IC.Resources.Process.ProcessAdjustmentsResx", typeof(ProcessAdjustmentsResx).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Adjustment number {0} has been created.  Do you want to view it now?.
        /// </summary>
        public static string AdjustmentCreated {
            get {
                return ResourceManager.GetString("AdjustmentCreated", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Cost To Use.
        /// </summary>
        public static string CostToUse {
            get {
                return ResourceManager.GetString("CostToUse", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to I/C Process Adjustments.
        /// </summary>
        public static string Entity {
            get {
                return ResourceManager.GetString("Entity", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Generate Adjustment.
        /// </summary>
        public static string GenerateAdjustment {
            get {
                return ResourceManager.GetString("GenerateAdjustment", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Cannot find Item Number {0}..
        /// </summary>
        public static string ItemIdDoesNotExist {
            get {
                return ResourceManager.GetString("ItemIdDoesNotExist", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Cannot find Location {0}..
        /// </summary>
        public static string LocationIDDoesNotExist {
            get {
                return ResourceManager.GetString("LocationIDDoesNotExist", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Processing Adjustments....
        /// </summary>
        public static string MeterCaption {
            get {
                return ResourceManager.GetString("MeterCaption", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to No adjustment has been created..
        /// </summary>
        public static string NoAdjustmentCreated {
            get {
                return ResourceManager.GetString("NoAdjustmentCreated", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Total Cost for Items with Non-Zero Quantities and Zero Total Cost.
        /// </summary>
        public static string TotalCostForItemswithNonZeroQuantitiesAndZeroTotalCost {
            get {
                return ResourceManager.GetString("TotalCostForItemswithNonZeroQuantitiesAndZeroTotalCost", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Total Cost to Zero for Items with Zero Quantities.
        /// </summary>
        public static string TotalCostToZeroForItemswithZeroQuantities {
            get {
                return ResourceManager.GetString("TotalCostToZeroForItemswithZeroQuantities", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Total Quantity to Zero for Items with Zero Total Cost.
        /// </summary>
        public static string TotalQuantityToZeroForItemswithZeroTotalCost {
            get {
                return ResourceManager.GetString("TotalQuantityToZeroForItemswithZeroTotalCost", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Transactions have been posted since the last Day End Process. When costed, it could affect Location Details&apos; total cost and/or quantity. It is recommended that you first run Day End Processing..
        /// </summary>
        public static string WarnDEP {
            get {
                return ResourceManager.GetString("WarnDEP", resourceCulture);
            }
        }
    }
}