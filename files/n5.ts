// @ts-nocheck
"use strict";

function n5LogErr(tag, err) {
  try {
    const msg = err && (err.stack || err.message || String(err));
    console.error("[" + tag + "]", msg);
  } catch (_) {
    console.error("[" + tag + "]", err);
  }
}

const N5_BRIDGE_PATHS = [
  "C:/modding/dumpers/ac_bridge.js",
  "C:\\modding\\dumpers\\ac_bridge.js",
  "./ac_bridge.js",
  "ac_bridge.js",
];

function n5ReadBridgeText(path) {
  if (typeof File === "undefined") throw new Error("Frida File API missing");
  if (typeof File.readAllText === "function") return File.readAllText(path);
  const file = new File(path, "r");
  try {
    if (typeof file.readText === "function") return file.readText();
    const chunks = [];
    let total = 0;
    while (true) {
      const bytes = file.readBytes(16384);
      if (!bytes || bytes.byteLength === 0) break;
      const chunk = new Uint8Array(bytes);
      chunks.push(chunk);
      total += chunk.length;
      if (chunk.length < 16384) break;
    }
    const merged = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      merged.set(chunk, offset);
      offset += chunk.length;
    }
    if (typeof TextDecoder !== "undefined")
      return new TextDecoder("utf-8").decode(merged);
    let text = "";
    for (let i = 0; i < merged.length; i += 4096)
      text += String.fromCharCode.apply(null, merged.slice(i, i + 4096));
    return decodeURIComponent(escape(text));
  } finally {
    try {
      file.close();
    } catch (_) {}
  }
}

function n5LoadSeparateBridge() {
  if (
    typeof Il2Cpp !== "undefined" &&
    Il2Cpp &&
    Il2Cpp.perform &&
    Il2Cpp.$config
  )
    return;
  let lastError = null;
  for (const path of N5_BRIDGE_PATHS) {
    try {
      const source = n5ReadBridgeText(path);
      (0, eval)(source);
      if (
        typeof Il2Cpp !== "undefined" &&
        Il2Cpp &&
        Il2Cpp.perform &&
        Il2Cpp.$config
      ) {
        console.log("[N5] loaded separate bridge: " + path);
        return;
      }
      lastError = new Error("bridge loaded but Il2Cpp was not initialized");
    } catch (e) {
      lastError = e;
    }
  }
  throw new Error("[N5] failed to load ac_bridge.js: " + lastError);
}

n5LoadSeparateBridge();
Il2Cpp.$config.exports = {
	il2cpp_init: () => Il2Cpp.module.findExportByName("SJfBleTMgEo"),
	il2cpp_init_utf16: () => Il2Cpp.module.findExportByName("OZxyXpxHhww"),
	il2cpp_shutdown: () => Il2Cpp.module.findExportByName("wassUEilxGP"),
	il2cpp_set_config_dir: () => Il2Cpp.module.findExportByName("wIlMuAcvQEV"),
	il2cpp_set_data_dir: () => Il2Cpp.module.findExportByName("LarMkRRUHrt"),
	il2cpp_set_temp_dir: () => Il2Cpp.module.findExportByName("jFoxQrUxryK"),
	il2cpp_set_commandline_arguments: () => Il2Cpp.module.findExportByName("qcKUCWdvIEE"),
	il2cpp_set_commandline_arguments_utf16: () => Il2Cpp.module.findExportByName("aRIRXaq_LOx"),
	il2cpp_set_config_utf16: () => Il2Cpp.module.findExportByName("RPwzFMQoTir"),
	il2cpp_set_config: () => Il2Cpp.module.findExportByName("OmGLFrIAIub"),
	il2cpp_set_memory_callbacks: () => Il2Cpp.module.findExportByName("lmhnixqlOdV"),
	il2cpp_memory_pool_set_region_size: () => Il2Cpp.module.findExportByName("jlOQTkjgCSU"),
	il2cpp_memory_pool_get_region_size: () => Il2Cpp.module.findExportByName("loYsjoRZTkp"),
	il2cpp_get_corlib: () => Il2Cpp.module.findExportByName("iLojOzhXxmZ"),
	il2cpp_add_internal_call: () => Il2Cpp.module.findExportByName("xDdzceTRZXq"),
	il2cpp_resolve_icall: () => Il2Cpp.module.findExportByName("WlIgTYBDzRa"),
	il2cpp_alloc: () => Il2Cpp.module.findExportByName("IYLXjuk_ZUh"),
	il2cpp_free: () => Il2Cpp.module.findExportByName("VGIxOvLdEQI"),
	il2cpp_array_class_get: () => Il2Cpp.module.findExportByName("VrXMcWIscQO"),
	il2cpp_array_length: () => Il2Cpp.module.findExportByName("iUFsHOalsfA"),
	il2cpp_array_get_byte_length: () => Il2Cpp.module.findExportByName("pYFIjratcZv"),
	il2cpp_array_new: () => Il2Cpp.module.findExportByName("HOQVXYMLqvW"),
	il2cpp_array_new_specific: () => Il2Cpp.module.findExportByName("qMFXpNCpzSG"),
	il2cpp_array_new_full: () => Il2Cpp.module.findExportByName("iEzTDYHDfSV"),
	il2cpp_bounded_array_class_get: () => Il2Cpp.module.findExportByName("usNfFwLdxdI"),
	il2cpp_array_element_size: () => Il2Cpp.module.findExportByName("oFOgRrGKJfP"),
	il2cpp_assembly_get_image: () => Il2Cpp.module.findExportByName("cKtedesMczV"),
	il2cpp_class_for_each: () => Il2Cpp.module.findExportByName("bEfvBswVBjs"),
	il2cpp_class_enum_basetype: () => Il2Cpp.module.findExportByName("jxyCrheYVar"),
	il2cpp_class_is_inited: () => Il2Cpp.module.findExportByName("soHViEKrWqP"),
	il2cpp_class_is_generic: () => Il2Cpp.module.findExportByName("KEGjyOAEjtq"),
	il2cpp_class_is_inflated: () => Il2Cpp.module.findExportByName("PaWOsKcIGZU"),
	il2cpp_class_is_assignable_from: () => Il2Cpp.module.findExportByName("vtlHGEpgtLM"),
	il2cpp_class_is_subclass_of: () => Il2Cpp.module.findExportByName("VdEoRGmajea"),
	il2cpp_class_has_parent: () => Il2Cpp.module.findExportByName("EXRsNBGWBKY"),
	il2cpp_class_from_il2cpp_type: () => Il2Cpp.module.findExportByName("MAQfGwQG_nS"),
	il2cpp_class_from_name: () => Il2Cpp.module.findExportByName("YThRyBcKaOo"),
	il2cpp_class_from_system_type: () => Il2Cpp.module.findExportByName("YpRALbapERe"),
	il2cpp_class_get_element_class: () => Il2Cpp.module.findExportByName("BLwQsQNgEgr"),
	il2cpp_class_get_events: () => Il2Cpp.module.findExportByName("_HewSQjgbss"),
	il2cpp_class_get_fields: () => Il2Cpp.module.findExportByName("nBicuaCPBuk"),
	il2cpp_class_get_nested_types: () => Il2Cpp.module.findExportByName("yUveKUTHsIY"),
	il2cpp_class_get_interfaces: () => Il2Cpp.module.findExportByName("xoxyFFakGfW"),
	il2cpp_class_get_properties: () => Il2Cpp.module.findExportByName("tOnRysCUBHB"),
	il2cpp_class_get_property_from_name: () => Il2Cpp.module.findExportByName("DWiYXluygre"),
	il2cpp_class_get_field_from_name: () => Il2Cpp.module.findExportByName("lLwpkqgeJGF"),
	il2cpp_class_get_methods: () => Il2Cpp.module.findExportByName("SUQqPOjvzVG"),
	il2cpp_class_get_method_from_name: () => Il2Cpp.module.findExportByName("VWwphAxWHra"),
	il2cpp_class_get_name: () => Il2Cpp.module.findExportByName("PzaJiD_GuGm"),
	il2cpp_type_get_name_chunked: () => Il2Cpp.module.findExportByName("lZaHhutHtAp"),
	il2cpp_class_get_namespace: () => Il2Cpp.module.findExportByName("ovudlyBOzbf"),
	il2cpp_class_get_parent: () => Il2Cpp.module.findExportByName("ERSgyVdsrKP"),
	il2cpp_class_get_declaring_type: () => Il2Cpp.module.findExportByName("vdMyuFxQrKX"),
	il2cpp_class_instance_size: () => Il2Cpp.module.findExportByName("XdpUzZFSDcJ"),
	il2cpp_class_num_fields: () => Il2Cpp.module.findExportByName("ouscUzCEsbe"),
	il2cpp_class_is_valuetype: () => Il2Cpp.module.findExportByName("XJPPhiDKYCc"),
	il2cpp_class_value_size: () => Il2Cpp.module.findExportByName("DnCSapiqoJZ"),
	il2cpp_class_is_blittable: () => Il2Cpp.module.findExportByName("cSADQnwgrTE"),
	il2cpp_class_get_flags: () => Il2Cpp.module.findExportByName("SOxAteaHBoP"),
	il2cpp_class_is_abstract: () => Il2Cpp.module.findExportByName("DK_yptLCjwN"),
	il2cpp_class_is_interface: () => Il2Cpp.module.findExportByName("YiXMXuFiIZZ"),
	il2cpp_class_array_element_size: () => Il2Cpp.module.findExportByName("HhRIIFEpTDM"),
	il2cpp_class_from_type: () => Il2Cpp.module.findExportByName("NaX_dkxrdBc"),
	il2cpp_class_get_type: () => Il2Cpp.module.findExportByName("UtWRtpJYHts"),
	il2cpp_class_get_type_token: () => Il2Cpp.module.findExportByName("znofTdjyFsx"),
	il2cpp_class_has_attribute: () => Il2Cpp.module.findExportByName("whuU_EKpjuk"),
	il2cpp_class_has_references: () => Il2Cpp.module.findExportByName("NDzSsgjivGB"),
	il2cpp_class_is_enum: () => Il2Cpp.module.findExportByName("tgmyUcDOpMd"),
	il2cpp_class_get_image: () => Il2Cpp.module.findExportByName("apPqbXeKSbU"),
	il2cpp_class_get_assemblyname: () => Il2Cpp.module.findExportByName("gwVQJGLRrkt"),
	il2cpp_class_get_rank: () => Il2Cpp.module.findExportByName("TBmjikkNfoU"),
	il2cpp_class_get_data_size: () => Il2Cpp.module.findExportByName("bLedyXskYEK"),
	il2cpp_class_get_static_field_data: () => Il2Cpp.module.findExportByName("ohPnbcuwFMw"),
	il2cpp_stats_dump_to_file: () => Il2Cpp.module.findExportByName("rewFxzvFsPn"),
	il2cpp_stats_get_value: () => Il2Cpp.module.findExportByName("BPdjezoyUWy"),
	il2cpp_domain_get: () => Il2Cpp.module.findExportByName("ZPitRzNLYRp"),
	il2cpp_domain_assembly_open: () => Il2Cpp.module.findExportByName("zhIVRSVxbOn"),
	il2cpp_domain_get_assemblies: () => Il2Cpp.module.findExportByName("qKgSFiqGOWB"),
	il2cpp_raise_exception: () => Il2Cpp.module.findExportByName("EkxqKfamTvf"),
	il2cpp_exception_from_name_msg: () => Il2Cpp.module.findExportByName("qBSincSStve"),
	il2cpp_get_exception_argument_null: () => Il2Cpp.module.findExportByName("MkSkRlJdxjB"),
	il2cpp_format_exception: () => Il2Cpp.module.findExportByName("QzjrMghdRaw"),
	il2cpp_format_stack_trace: () => Il2Cpp.module.findExportByName("cKtZpkXaZQN"),
	il2cpp_unhandled_exception: () => Il2Cpp.module.findExportByName("rxbwtkXOHlW"),
	il2cpp_native_stack_trace: () => Il2Cpp.module.findExportByName("MdqiYpdTQEU"),
	il2cpp_field_get_flags: () => Il2Cpp.module.findExportByName("chJCZFygUqu"),
	il2cpp_field_get_from_reflection: () => Il2Cpp.module.findExportByName("ezKt_wrSiLy"),
	il2cpp_field_get_name: () => Il2Cpp.module.findExportByName("aYTjGeFxdhe"),
	il2cpp_field_get_parent: () => Il2Cpp.module.findExportByName("HlDgECIeaGU"),
	il2cpp_field_get_object: () => Il2Cpp.module.findExportByName("lwdalUFtPcK"),
	il2cpp_field_get_offset: () => Il2Cpp.module.findExportByName("spRYBGjmYWd"),
	il2cpp_field_get_type: () => Il2Cpp.module.findExportByName("vOybeKhXZtz"),
	il2cpp_field_get_value: () => Il2Cpp.module.findExportByName("qHGefXdcWvA"),
	il2cpp_field_get_value_object: () => Il2Cpp.module.findExportByName("GEzDxe_lhyA"),
	il2cpp_field_has_attribute: () => Il2Cpp.module.findExportByName("hLtSjlkqGRg"),
	il2cpp_field_set_value: () => Il2Cpp.module.findExportByName("fMNODHDSidr"),
	il2cpp_field_static_get_value: () => Il2Cpp.module.findExportByName("jicw_PBYaaI"),
	il2cpp_field_static_set_value: () => Il2Cpp.module.findExportByName("DHxsQmkuBfi"),
	il2cpp_field_set_value_object: () => Il2Cpp.module.findExportByName("vXpPioCiaaF"),
	il2cpp_field_is_literal: () => Il2Cpp.module.findExportByName("YmtbyjXzRSh"),
	il2cpp_gc_collect: () => Il2Cpp.module.findExportByName("_SqMuRzUIhs"),
	il2cpp_gc_collect_a_little: () => Il2Cpp.module.findExportByName("uZGkimOIYCr"),
	il2cpp_gc_start_incremental_collection: () => Il2Cpp.module.findExportByName("EitftImjqZs"),
	il2cpp_gc_disable: () => Il2Cpp.module.findExportByName("rsp_OKstdCO"),
	il2cpp_gc_enable: () => Il2Cpp.module.findExportByName("VYijVSpkNpC"),
	il2cpp_gc_is_disabled: () => Il2Cpp.module.findExportByName("ONXEelvkXoK"),
	il2cpp_gc_set_mode: () => Il2Cpp.module.findExportByName("XjbgQUVPBso"),
	il2cpp_gc_get_max_time_slice_ns: () => Il2Cpp.module.findExportByName("QPTthYndttt"),
	il2cpp_gc_set_max_time_slice_ns: () => Il2Cpp.module.findExportByName("jCr_GjfiBXi"),
	il2cpp_gc_is_incremental: () => Il2Cpp.module.findExportByName("GNBogHKxnCX"),
	il2cpp_gc_get_used_size: () => Il2Cpp.module.findExportByName("Vqp_BJeXnOM"),
	il2cpp_gc_get_heap_size: () => Il2Cpp.module.findExportByName("mnCdPwTfqAk"),
	il2cpp_gc_wbarrier_set_field: () => Il2Cpp.module.findExportByName("USyLgauDIQT"),
	il2cpp_gc_has_strict_wbarriers: () => Il2Cpp.module.findExportByName("uJdNhLtejbU"),
	il2cpp_gc_set_external_allocation_tracker: () => Il2Cpp.module.findExportByName("tPUrxjQzfsK"),
	il2cpp_gc_set_external_wbarrier_tracker: () => Il2Cpp.module.findExportByName("PHyxEiQko_F"),
	il2cpp_gc_foreach_heap: () => Il2Cpp.module.findExportByName("Ajk_nKCLFiR"),
	il2cpp_stop_gc_world: () => Il2Cpp.module.findExportByName("tgbSFkWBbVF"),
	il2cpp_start_gc_world: () => Il2Cpp.module.findExportByName("IKmkJgrlIIj"),
	il2cpp_gc_alloc_fixed: () => Il2Cpp.module.findExportByName("ooljQFvqPNT"),
	il2cpp_gc_free_fixed: () => Il2Cpp.module.findExportByName("wgfadLnMKvO"),
	il2cpp_gchandle_new: () => Il2Cpp.module.findExportByName("IldrOSUykoo"),
	il2cpp_gchandle_new_weakref: () => Il2Cpp.module.findExportByName("ztCExAqbTIN"),
	il2cpp_gchandle_get_target: () => Il2Cpp.module.findExportByName("lBemHULfYhl"),
	il2cpp_gchandle_free: () => Il2Cpp.module.findExportByName("TGAfHNpPNDN"),
	il2cpp_gchandle_foreach_get_target: () => Il2Cpp.module.findExportByName("vGZbyQbfIJv"),
	il2cpp_object_header_size: () => Il2Cpp.module.findExportByName("oMSqslVlrnF"),
	il2cpp_array_object_header_size: () => Il2Cpp.module.findExportByName("_QFWxbQzJPJ"),
	il2cpp_offset_of_array_length_in_array_object_header: () => Il2Cpp.module.findExportByName("mQQFKrFsawE"),
	il2cpp_offset_of_array_bounds_in_array_object_header: () => Il2Cpp.module.findExportByName("yYkhESUHNPl"),
	il2cpp_allocation_granularity: () => Il2Cpp.module.findExportByName("vVwsVtHTFLY"),
	il2cpp_unity_liveness_allocate_struct: () => Il2Cpp.module.findExportByName("WmOTtqYIFac"),
	il2cpp_unity_liveness_calculation_from_root: () => Il2Cpp.module.findExportByName("cAibVtFHE_p"),
	il2cpp_unity_liveness_calculation_from_statics: () => Il2Cpp.module.findExportByName("eoBRLdmOJaN"),
	il2cpp_unity_liveness_finalize: () => Il2Cpp.module.findExportByName("WsTCwUEolJF"),
	il2cpp_unity_liveness_free_struct: () => Il2Cpp.module.findExportByName("FFSPcweyeCe"),
	il2cpp_method_get_return_type: () => Il2Cpp.module.findExportByName("xDwgSlRLoCx"),
	il2cpp_method_get_declaring_type: () => Il2Cpp.module.findExportByName("kfuDcmTLrvR"),
	il2cpp_method_get_name: () => Il2Cpp.module.findExportByName("ZCkrXlvnevi"),
	il2cpp_method_get_from_reflection: () => Il2Cpp.module.findExportByName("XqSNNxuCdVk"),
	il2cpp_method_get_object: () => Il2Cpp.module.findExportByName("tnqHCVTGXCC"),
	il2cpp_method_is_generic: () => Il2Cpp.module.findExportByName("caZkIEgdhHN"),
	il2cpp_method_is_inflated: () => Il2Cpp.module.findExportByName("oD_XpLOzCsI"),
	il2cpp_method_is_instance: () => Il2Cpp.module.findExportByName("IsMqGXQQUoi"),
	il2cpp_method_get_param_count: () => Il2Cpp.module.findExportByName("vErWEeQR_nI"),
	il2cpp_method_get_param: () => Il2Cpp.module.findExportByName("blZCLOAmJNA"),
	il2cpp_method_get_class: () => Il2Cpp.module.findExportByName("Mv_wbiFHhjE"),
	il2cpp_method_has_attribute: () => Il2Cpp.module.findExportByName("QUoFYxJjnD_"),
	il2cpp_method_get_flags: () => Il2Cpp.module.findExportByName("wzEPndWJYgI"),
	il2cpp_method_get_token: () => Il2Cpp.module.findExportByName("ieIFZGrtiTT"),
	il2cpp_method_get_param_name: () => Il2Cpp.module.findExportByName("gsUHbfpWPCr"),
	il2cpp_property_get_flags: () => Il2Cpp.module.findExportByName("hFbhyXFuMAI"),
	il2cpp_property_get_get_method: () => Il2Cpp.module.findExportByName("etLwktHYVLj"),
	il2cpp_property_get_set_method: () => Il2Cpp.module.findExportByName("FhoQgAuyTRo"),
	il2cpp_property_get_name: () => Il2Cpp.module.findExportByName("oWpQQgXEQpF"),
	il2cpp_property_get_parent: () => Il2Cpp.module.findExportByName("LCXoSVVLkPi"),
	il2cpp_object_get_class: () => Il2Cpp.module.findExportByName("YVwXbzuBsDm"),
	il2cpp_object_get_size: () => Il2Cpp.module.findExportByName("oBrDCnwzqkB"),
	il2cpp_object_get_virtual_method: () => Il2Cpp.module.findExportByName("hVOEUvJVjps"),
	il2cpp_object_new: () => Il2Cpp.module.findExportByName("qMkGLSlELMk"),
	il2cpp_object_unbox: () => Il2Cpp.module.findExportByName("VoJFMwaWffw"),
	il2cpp_value_box: () => Il2Cpp.module.findExportByName("uhqIwPXJ_UD"),
	il2cpp_monitor_enter: () => Il2Cpp.module.findExportByName("nzXzRvipxGj"),
	il2cpp_monitor_try_enter: () => Il2Cpp.module.findExportByName("KqkQJkMgtHx"),
	il2cpp_monitor_exit: () => Il2Cpp.module.findExportByName("cwPBPxGSPTf"),
	il2cpp_monitor_pulse: () => Il2Cpp.module.findExportByName("sIJkhOQIjIi"),
	il2cpp_monitor_pulse_all: () => Il2Cpp.module.findExportByName("INDXmYtIgnv"),
	il2cpp_monitor_wait: () => Il2Cpp.module.findExportByName("FbpWExXgSpV"),
	il2cpp_monitor_try_wait: () => Il2Cpp.module.findExportByName("OLPZSpZAgra"),
	il2cpp_runtime_invoke: () => Il2Cpp.module.findExportByName("hohzLEBZgQv"),
	il2cpp_runtime_invoke_convert_args: () => Il2Cpp.module.findExportByName("CoUHSBUoPCN"),
	il2cpp_runtime_class_init: () => Il2Cpp.module.findExportByName("kW_GbirgdRc"),
	il2cpp_runtime_object_init: () => Il2Cpp.module.findExportByName("eVImNbrFztb"),
	il2cpp_runtime_object_init_exception: () => Il2Cpp.module.findExportByName("vRJsPrMJWrh"),
	il2cpp_runtime_unhandled_exception_policy_set: () => Il2Cpp.module.findExportByName("bqqMMgWo_sD"),
	il2cpp_string_length: () => Il2Cpp.module.findExportByName("CNCQYBYEYXG"),
	il2cpp_string_chars: () => Il2Cpp.module.findExportByName("V_KogKszNqs"),
	il2cpp_string_new: () => Il2Cpp.module.findExportByName("qHhvEJfxPBE"),
	il2cpp_string_new_len: () => Il2Cpp.module.findExportByName("lLORKVvUEKS"),
	il2cpp_string_new_utf16: () => Il2Cpp.module.findExportByName("MOoOSpmhUzW"),
	il2cpp_string_new_wrapper: () => Il2Cpp.module.findExportByName("GQbqjAsAhtU"),
	il2cpp_string_intern: () => Il2Cpp.module.findExportByName("OKazpZPStLB"),
	il2cpp_string_is_interned: () => Il2Cpp.module.findExportByName("VhObgPDXSrD"),
	il2cpp_thread_current: () => Il2Cpp.module.findExportByName("WPdnbDcjusz"),
	il2cpp_thread_attach: () => Il2Cpp.module.findExportByName("XdlqVyKLkko"),
	il2cpp_thread_detach: () => Il2Cpp.module.findExportByName("tAVObQfxPXf"),
	il2cpp_is_vm_thread: () => Il2Cpp.module.findExportByName("jywinFSbcOY"),
	il2cpp_current_thread_walk_frame_stack: () => Il2Cpp.module.findExportByName("ABPaxmpgPzq"),
	il2cpp_thread_walk_frame_stack: () => Il2Cpp.module.findExportByName("HBMRzyBbiOP"),
	il2cpp_current_thread_get_top_frame: () => Il2Cpp.module.findExportByName("KqIOYiKROfe"),
	il2cpp_thread_get_top_frame: () => Il2Cpp.module.findExportByName("jMocnhnwpap"),
	il2cpp_current_thread_get_frame_at: () => Il2Cpp.module.findExportByName("bswbKvLSQmP"),
	il2cpp_thread_get_frame_at: () => Il2Cpp.module.findExportByName("BfLJadcXhNG"),
	il2cpp_current_thread_get_stack_depth: () => Il2Cpp.module.findExportByName("MIyndmUgWrB"),
	il2cpp_thread_get_stack_depth: () => Il2Cpp.module.findExportByName("PFFOOxJIJRc"),
	il2cpp_override_stack_backtrace: () => Il2Cpp.module.findExportByName("MmrOxdYgCRF"),
	il2cpp_type_get_object: () => Il2Cpp.module.findExportByName("moxUMPwvTvl"),
	il2cpp_type_get_type: () => Il2Cpp.module.findExportByName("IEjtivnViJl"),
	il2cpp_type_get_class_or_element_class: () => Il2Cpp.module.findExportByName("zVUOVchUeUV"),
	il2cpp_type_get_name: () => Il2Cpp.module.findExportByName("tEbnuUuPYCE"),
	il2cpp_type_is_byref: () => Il2Cpp.module.findExportByName("zpQTztVENsx"),
	il2cpp_type_get_attrs: () => Il2Cpp.module.findExportByName("IrlJEHXXMwW"),
	il2cpp_type_equals: () => Il2Cpp.module.findExportByName("eyeMPaduhCC"),
	il2cpp_type_get_assembly_qualified_name: () => Il2Cpp.module.findExportByName("TFtWDQUHMlj"),
	il2cpp_type_get_reflection_name: () => Il2Cpp.module.findExportByName("hjsGruCzilr"),
	il2cpp_type_is_static: () => Il2Cpp.module.findExportByName("ASsIKnDyMEH"),
	il2cpp_type_is_pointer_type: () => Il2Cpp.module.findExportByName("utJmIabQWrZ"),
	il2cpp_image_get_assembly: () => Il2Cpp.module.findExportByName("cQDKjSawRRw"),
	il2cpp_image_get_name: () => Il2Cpp.module.findExportByName("MyFHRktRtOE"),
	il2cpp_image_get_filename: () => Il2Cpp.module.findExportByName("wSISVnAoUcg"),
	il2cpp_image_get_entry_point: () => Il2Cpp.module.findExportByName("reBlOpIgWRj"),
	il2cpp_image_get_class_count: () => Il2Cpp.module.findExportByName("wKlWOSaDyUr"),
	il2cpp_image_get_class: () => Il2Cpp.module.findExportByName("lLvzGQuaNwo"),
	il2cpp_capture_memory_snapshot: () => Il2Cpp.module.findExportByName("JTkWYcTya__"),
	il2cpp_free_captured_memory_snapshot: () => Il2Cpp.module.findExportByName("BMWpgdHdqSS"),
	il2cpp_set_find_plugin_callback: () => Il2Cpp.module.findExportByName("vwgwVpwDwFs"),
	il2cpp_register_log_callback: () => Il2Cpp.module.findExportByName("lwbPQmiaMzk"),
	il2cpp_debugger_set_agent_options: () => Il2Cpp.module.findExportByName("KCHrOlPyvYb"),
	il2cpp_is_debugger_attached: () => Il2Cpp.module.findExportByName("nLpytINmjJg"),
	il2cpp_register_debugger_agent_transport: () => Il2Cpp.module.findExportByName("TOficVEhItF"),
	il2cpp_debug_foreach_method: () => Il2Cpp.module.findExportByName("UPWrjWIeaZC"),
	il2cpp_debug_get_method_info: () => Il2Cpp.module.findExportByName("nTIEPvPivRK"),
	il2cpp_unity_install_unitytls_interface: () => Il2Cpp.module.findExportByName("qDsJIyJJqrD"),
	il2cpp_custom_attrs_from_class: () => Il2Cpp.module.findExportByName("akvGX_qrsPs"),
	il2cpp_custom_attrs_from_method: () => Il2Cpp.module.findExportByName("toiEYrXExFq"),
	il2cpp_custom_attrs_from_field: () => Il2Cpp.module.findExportByName("vngWRGVAMYm"),
	il2cpp_custom_attrs_get_attr: () => Il2Cpp.module.findExportByName("G_gySXvBkdr"),
	il2cpp_custom_attrs_has_attr: () => Il2Cpp.module.findExportByName("TTYzFWYzroR"),
	il2cpp_custom_attrs_construct: () => Il2Cpp.module.findExportByName("B_ARFNbcxrc"),
	il2cpp_custom_attrs_free: () => Il2Cpp.module.findExportByName("FJwDpkHuIfU"),
	il2cpp_class_set_userdata: () => Il2Cpp.module.findExportByName("hrNfRFuocIy"),
	il2cpp_class_get_userdata_offset: () => Il2Cpp.module.findExportByName("NGPuUAREhye"),
	il2cpp_set_default_thread_affinity: () => Il2Cpp.module.findExportByName("BUzWzzWwSNs"),
	il2cpp_unity_set_android_network_up_state_func: () => Il2Cpp.module.findExportByName("skTbfrJYAMl"),
};
function n5RemapBridgeExports() {
  const bridgeNames = {
    il2cpp_init: "ITAtHOcJERU",
    il2cpp_init_utf16: "BlSILClfTep",
    il2cpp_shutdown: "jCVEUrxpedn",
    il2cpp_set_config_dir: "JryofZSebey",
    il2cpp_set_data_dir: "cgaouadRzLD",
    il2cpp_set_temp_dir: "HdRIGbVLnGY",
    il2cpp_set_commandline_arguments: "saQPIPNVdZU",
    il2cpp_set_commandline_arguments_utf16: "XvXKfb_yQaZ",
    il2cpp_set_config_utf16: "j_LI_KVfkVR",
    il2cpp_set_config: "zJjLhNYNYiI",
    il2cpp_set_memory_callbacks: "hEJfNbmJJxm",
    il2cpp_memory_pool_set_region_size: "ayTpxtziFgv",
    il2cpp_memory_pool_get_region_size: "XBJCaQzTRzd",
    il2cpp_get_corlib: "W_EZfNinobw",
    il2cpp_add_internal_call: "zqFIKBCzVXG",
    il2cpp_resolve_icall: "VDohxPcfmOo",
    il2cpp_alloc: "nbgkwNMFMWS",
    il2cpp_free: "NKdwYSJKuWa",
    il2cpp_array_class_get: "uGAKdfVXUYF",
    il2cpp_array_length: "zkLVaBozXmK",
    il2cpp_array_get_byte_length: "EzrhlBEPUnt",
    il2cpp_array_new: "uyODkVCPbB_",
    il2cpp_array_new_specific: "DzDXafEZdYY",
    il2cpp_array_new_full: "vXjAPzjdlRx",
    il2cpp_bounded_array_class_get: "AV_RyTzfUjq",
    il2cpp_array_element_size: "KHIS_rBpjOx",
    il2cpp_assembly_get_image: "jSgUUtKmzjJ",
    il2cpp_class_for_each: "qTaypczsgNu",
    il2cpp_class_enum_basetype: "xCrKFJVatRx",
    il2cpp_class_is_inited: "gohwXWMoVsP",
    il2cpp_class_is_generic: "YAnWWaaSyxY",
    il2cpp_class_is_inflated: "BsaDwKfCNUz",
    il2cpp_class_is_assignable_from: "YUSKnDCkyvb",
    il2cpp_class_is_subclass_of: "XzXAfzwGxpu",
    il2cpp_class_has_parent: "JyPTPPoncKG",
    il2cpp_class_from_il2cpp_type: "wNBNvEBtQlW",
    il2cpp_class_from_name: "FyvyMhNLRDJ",
    il2cpp_class_from_system_type: "nAMbSbUGKXf",
    il2cpp_class_get_element_class: "bXWTIbdsnKM",
    il2cpp_class_get_events: "BEcsOEyuyjx",
    il2cpp_class_get_fields: "ZiMTlEgMOse",
    il2cpp_class_get_nested_types: "tqxCIJuCNxS",
    il2cpp_class_get_interfaces: "bSipThwVkzk",
    il2cpp_class_get_properties: "pFBYzvaneKA",
    il2cpp_class_get_property_from_name: "hCSUmsEHcYJ",
    il2cpp_class_get_field_from_name: "JxphAhsacRP",
    il2cpp_class_get_methods: "rkYWCsMMSRJ",
    il2cpp_class_get_method_from_name: "KehkDYpuqtm",
    il2cpp_class_get_name: "BKyvutYOQWy",
    il2cpp_type_get_name_chunked: "WVd_wXShTtc",
    il2cpp_class_get_namespace: "jUIxtjpaEgZ",
    il2cpp_class_get_parent: "EpBIFuvgYkH",
    il2cpp_class_get_declaring_type: "blRcfaOEkdA",
    il2cpp_class_instance_size: "vGzmvsgxiLa",
    il2cpp_class_num_fields: "lZlznRxDwlE",
    il2cpp_class_is_valuetype: "_yg__YmkhDx",
    il2cpp_class_value_size: "PELMfsGlYBZ",
    il2cpp_class_is_blittable: "wsSMQyuNKUT",
    il2cpp_class_get_flags: "nZLTJNkZFfG",
    il2cpp_class_is_abstract: "niLRakrIsUc",
    il2cpp_class_is_interface: "pHHrkHlFFxT",
    il2cpp_class_array_element_size: "imPLRdorAxR",
    il2cpp_class_from_type: "DqxnMROBhFx",
    il2cpp_class_get_type: "NzhKMx_zMAJ",
    il2cpp_class_get_type_token: "HyxXnCDkecx",
    il2cpp_class_has_attribute: "JeSnHuExdXB",
    il2cpp_class_has_references: "EkalqYpjVcc",
    il2cpp_class_is_enum: "ZaZWOL_XAAG",
    il2cpp_class_get_image: "ULpdDBUoYyf",
    il2cpp_class_get_assemblyname: "CkeihoBVqsA",
    il2cpp_class_get_rank: "_pDSOzAxRxU",
    il2cpp_class_get_data_size: "MyS_hpoaRFP",
    il2cpp_class_get_static_field_data: "BTDPpKx_xsF",
    il2cpp_stats_dump_to_file: "xGrkIVbsYvQ",
    il2cpp_stats_get_value: "TNFyIMmnJYn",
    il2cpp_domain_get: "QXGKPSTsshv",
    il2cpp_domain_assembly_open: "CDpeHBKPTjI",
    il2cpp_domain_get_assemblies: "HvmuUYxcjJQ",
    il2cpp_raise_exception: "OpifnxBSIGQ",
    il2cpp_exception_from_name_msg: "zlpZvaBeFzF",
    il2cpp_get_exception_argument_null: "VRbZnnSLRxy",
    il2cpp_format_exception: "AUGxm_hdVby",
    il2cpp_format_stack_trace: "gTXVUdSQKbL",
    il2cpp_unhandled_exception: "BjOGxXDEyfb",
    il2cpp_native_stack_trace: "EEHjoOaDjxY",
    il2cpp_field_get_flags: "sPTtiWyVLvA",
    il2cpp_field_get_from_reflection: "KeLPjHSGaBe",
    il2cpp_field_get_name: "cFFMPsnQkYN",
    il2cpp_field_get_parent: "tTAKxvovSsn",
    il2cpp_field_get_object: "MRdaMwgCpuK",
    il2cpp_field_get_offset: "LHgbcouwEdH",
    il2cpp_field_get_type: "vTjLsZNYsgm",
    il2cpp_field_get_value: "WpIpaCLVtoX",
    il2cpp_field_get_value_object: "FmTZgtZLpcx",
    il2cpp_field_has_attribute: "BmRPqycjkIA",
    il2cpp_field_set_value: "hYFOwqDwWmw",
    il2cpp_field_static_get_value: "SKmtNUnQodL",
    il2cpp_field_static_set_value: "CDXcwprKcDQ",
    il2cpp_field_set_value_object: "ELfQKYxtWjA",
    il2cpp_field_is_literal: "kofUhyXWhsx",
    il2cpp_gc_collect: "rxMnIkmwwfr",
    il2cpp_gc_collect_a_little: "SwDfg_deZSI",
    il2cpp_gc_start_incremental_collection: "G_fzrBpwCAR",
    il2cpp_gc_disable: "wDInLGLkAey",
    il2cpp_gc_enable: "l_zrrZmryYB",
    il2cpp_gc_is_disabled: "YJSHDwxYChD",
    il2cpp_gc_set_mode: "EuiIVss_doF",
    il2cpp_gc_get_max_time_slice_ns: "cmIWAzRixkW",
    il2cpp_gc_set_max_time_slice_ns: "uztINxPKuvv",
    il2cpp_gc_is_incremental: "EThwCrxZBrf",
    il2cpp_gc_get_used_size: "EUxUI_FEuYV",
    il2cpp_gc_get_heap_size: "Jh__gmjiyRU",
    il2cpp_gc_wbarrier_set_field: "ZBkRwmxBszr",
    il2cpp_gc_has_strict_wbarriers: "iGsugrYeSiG",
    il2cpp_gc_set_external_allocation_tracker: "MlekwcLdkV_",
    il2cpp_gc_set_external_wbarrier_tracker: "KcJlGhmUlKj",
    il2cpp_gc_foreach_heap: "CpPYcguYHdT",
    il2cpp_stop_gc_world: "daGRpZwGJWi",
    il2cpp_start_gc_world: "bamnjNlEeUN",
    il2cpp_gc_alloc_fixed: "DvWJRvbEHSE",
    il2cpp_gc_free_fixed: "SqPTWHPOedy",
    il2cpp_gchandle_new: "XWHBgdaTbpZ",
    il2cpp_gchandle_new_weakref: "rLGufLFxvaK",
    il2cpp_gchandle_get_target: "nmuHCRJdURA",
    il2cpp_gchandle_free: "vhbSCe_tXHi",
    il2cpp_gchandle_foreach_get_target: "h_myBtxOvDN",
    il2cpp_object_header_size: "ZUdwTNNUuRH",
    il2cpp_array_object_header_size: "YmEHeZNSJMo",
    il2cpp_offset_of_array_length_in_array_object_header: "paWBeqlyuHj",
    il2cpp_offset_of_array_bounds_in_array_object_header: "kOUHuocCvJW",
    il2cpp_allocation_granularity: "R_FAxsUMiEw",
    il2cpp_unity_liveness_allocate_struct: "xGozcIPTgvq",
    il2cpp_unity_liveness_calculation_from_root: "jyztBfwKdVu",
    il2cpp_unity_liveness_calculation_from_statics: "mVdIOVxZehR",
    il2cpp_unity_liveness_finalize: "cD_AxP_DLxj",
    il2cpp_unity_liveness_free_struct: "YCaFJbsWOQL",
    il2cpp_method_get_return_type: "wNWoU_rKrWK",
    il2cpp_method_get_declaring_type: "JxdNRDLRSCZ",
    il2cpp_method_get_name: "ayDZwIpRwyB",
    il2cpp_method_get_from_reflection: "uzMqolwNNHg",
    il2cpp_method_get_object: "QJLdHBQonMo",
    il2cpp_method_is_generic: "McrI_RbkHcj",
    il2cpp_method_is_inflated: "PVjShiOvsxt",
    il2cpp_method_is_instance: "uXbnEwTdviU",
    il2cpp_method_get_param_count: "ZBshdAOKZYu",
    il2cpp_method_get_param: "neTyOIDNdQt",
    il2cpp_method_get_class: "uBl_utkxpVH",
    il2cpp_method_has_attribute: "gWAUjWoURJM",
    il2cpp_method_get_flags: "QtneASmrREC",
    il2cpp_method_get_token: "lgVrRBIYKqQ",
    il2cpp_method_get_param_name: "dFHZqoystRU",
    il2cpp_property_get_flags: "OJuYYtUNNGv",
    il2cpp_property_get_get_method: "Eg_ruGcFlCn",
    il2cpp_property_get_set_method: "FSwZUZsOjNE",
    il2cpp_property_get_name: "jtpOMctdvlh",
    il2cpp_property_get_parent: "hItzOVJNJkY",
    il2cpp_object_get_class: "ZjrdMEkmuJA",
    il2cpp_object_get_size: "VwFJVFspdOf",
    il2cpp_object_get_virtual_method: "fmuimZSfNxX",
    il2cpp_object_new: "ScVayGdXprz",
    il2cpp_object_unbox: "anLbQchRyPa",
    il2cpp_value_box: "IrRrDTFMtkv",
    il2cpp_monitor_enter: "lwoSVwUWIXX",
    il2cpp_monitor_try_enter: "ZZuGJzswWUL",
    il2cpp_monitor_exit: "GLGovyiNsre",
    il2cpp_monitor_pulse: "qpvHJVrwjle",
    il2cpp_monitor_pulse_all: "fkadyvVPmVs",
    il2cpp_monitor_wait: "spIC_FwfAON",
    il2cpp_monitor_try_wait: "OikhWlbtzjR",
    il2cpp_runtime_invoke: "SzNqsCMVqNX",
    il2cpp_runtime_invoke_convert_args: "XvgHXOcOilK",
    il2cpp_runtime_class_init: "StBVUcvptdh",
    il2cpp_runtime_object_init: "PNZXyaADrSE",
    il2cpp_runtime_object_init_exception: "DVKCCvtTKOd",
    il2cpp_runtime_unhandled_exception_policy_set: "YoeEYsRYUDm",
    il2cpp_string_length: "JMiFbyvMzDo",
    il2cpp_string_chars: "_JxuSxXJkxu",
    il2cpp_string_new: "OHHYrn_OLCw",
    il2cpp_string_new_len: "DaL_bTFWwLM",
    il2cpp_string_new_utf16: "NIsxj_nmDdi",
    il2cpp_string_new_wrapper: "Itm_zyYHBRf",
    il2cpp_string_intern: "ONirQBHHmjO",
    il2cpp_string_is_interned: "_Nguducyldj",
    il2cpp_thread_current: "brgaqnrsLjx",
    il2cpp_thread_attach: "XZkKiKosyHC",
    il2cpp_thread_detach: "HWyKlOeVHgV",
    il2cpp_is_vm_thread: "tOniezYQdLe",
    il2cpp_current_thread_walk_frame_stack: "VVkKMpWMRPm",
    il2cpp_thread_walk_frame_stack: "dwQnauFAnWw",
    il2cpp_current_thread_get_top_frame: "HaLYfKsToXA",
    il2cpp_thread_get_top_frame: "DFqEEXfVVgu",
    il2cpp_current_thread_get_frame_at: "VTAZaJamXif",
    il2cpp_thread_get_frame_at: "EPfxEBbbVva",
    il2cpp_current_thread_get_stack_depth: "AAurdoCYvce",
    il2cpp_thread_get_stack_depth: "TmpTUDznYUN",
    il2cpp_override_stack_backtrace: "MTngjclvBeM",
    il2cpp_type_get_object: "PFwXVWGeckf",
    il2cpp_type_get_type: "jDLSsrBahVH",
    il2cpp_type_get_class_or_element_class: "ZZhKRUWWOib",
    il2cpp_type_get_name: "VNwdSYN_Ac_",
    il2cpp_type_is_byref: "JACoGlJjCCC",
    il2cpp_type_get_attrs: "cvxuQAlmPys",
    il2cpp_type_equals: "ZQcDKobJMFm",
    il2cpp_type_get_assembly_qualified_name: "jsLiEGdBz_G",
    il2cpp_type_get_reflection_name: "krqMStJVxEC",
    il2cpp_type_is_static: "VyZMlTfANyg",
    il2cpp_type_is_pointer_type: "NJTtQPEmFPK",
    il2cpp_image_get_assembly: "cqfGzZtAbZi",
    il2cpp_image_get_name: "FZa_z_AueBS",
    il2cpp_image_get_filename: "oytwlOhdSXu",
    il2cpp_image_get_entry_point: "wXXCxtShaIZ",
    il2cpp_image_get_class_count: "FIGgipFzgMY",
    il2cpp_image_get_class: "NWWdAoXBDBY",
    il2cpp_capture_memory_snapshot: "IpzYwEzNyAK",
    il2cpp_free_captured_memory_snapshot: "lXeeYyqKDhC",
    il2cpp_set_find_plugin_callback: "pAkICKehGFC",
    il2cpp_register_log_callback: "gXEFLzgaVtv",
    il2cpp_debugger_set_agent_options: "yIpecOtGPCL",
    il2cpp_is_debugger_attached: "XtYfuqdCIbt",
    il2cpp_register_debugger_agent_transport: "DKCQIqXjPYD",
    il2cpp_debug_foreach_method: "dEXqxwPqxij",
    il2cpp_debug_get_method_info: "SmfSoPUDjlb",
    il2cpp_unity_install_unitytls_interface: "BMmxhoqLNeZ",
    il2cpp_custom_attrs_from_class: "qWXIOQxZSnI",
    il2cpp_custom_attrs_from_method: "k_kCMxiXNDK",
    il2cpp_custom_attrs_from_field: "O_nquqNBkem",
    il2cpp_custom_attrs_get_attr: "hkiBhXTKVPq",
    il2cpp_custom_attrs_has_attr: "pBrTnTuumkx",
    il2cpp_custom_attrs_construct: "ajXoRvRYfdX",
    il2cpp_custom_attrs_free: "fmIkkpoyoEW",
    il2cpp_class_set_userdata: "QNtCJwCnlQZ",
    il2cpp_class_get_userdata_offset: "HInTIGwaBVN",
    il2cpp_set_default_thread_affinity: "bQdgGOrZMaz",
    il2cpp_unity_set_android_network_up_state_func: "sYMiZ_dajKA",
  };
  const exports = Il2Cpp.$config.exports;
  for (const key in bridgeNames) {
    if (exports[key]) exports[bridgeNames[key]] = exports[key];
  }
}

n5RemapBridgeExports();
console.log(
  "[N5] applied ac.js IL2CPP symbols: " +
    Object.keys(Il2Cpp.$config.exports).length,
);

function QuestDih() {
  console.log("Switching servers.");
  Il2Cpp.perform(() => {
    const findClass = (className) => {
      for (const assembly of Il2Cpp.domain.assemblies) {
        try {
          const foundClass = assembly.image.tryClass(className);
          if (foundClass) return foundClass;
        } catch (_) {}
      }
      return null;
    };

    const appUtilsClass = findClass("AnimalCompany.AppUtils");
    if (!appUtilsClass) {
      console.log("No apputiles lmfao");
      return;
    }

    const versionMethod = appUtilsClass.methods.find(
      (method) =>
        /CalculatePhotonAppVersion/i.test(method.name) &&
        (method.returnType?.name || "") === "System.String",
    );
    if (!versionMethod) {
      console.log("an error happened");
      return;
    }

    Interceptor.attach(versionMethod.virtualAddress, {
      onEnter(args) {
        try {
          args[2] = ptr(1);
        } catch (_) {}
      },
    });
    console.log("This means it worked");
  });
}

QuestDih();

const itemIDs = [
    "item_ac_cola",
    "item_alien_cube",
    "item_alphablade",
    "item_ampbattery",
    "item_ampbattery_mega",
    "item_anti_gravity_grenade",
    "item_apple",
    "item_arena_pistol",
    "item_arena_shotgun",
    "item_arrow",
    "item_arrow_bomb",
    "item_arrow_heart",
    "item_arrow_lightbulb",
    "item_arrow_teleport",
    "item_axe",
    "item_backpack",
    "item_backpack_black",
    "item_backpack_fish",
    "item_backpack_green",
    "item_backpack_large_base",
    "item_backpack_large_basketball",
    "item_backpack_large_clover",
    "item_backpack_monkey",
    "item_backpack_pink",
    "item_backpack_realistic",
    "item_backpack_small_base",
    "item_backpack_space",
    "item_backpack_white",
    "item_backpack_with_flashlight",
    "item_bait_beetle",
    "item_bait_fly",
    "item_bait_glowworm",
    "item_bait_magmar_ball",
    "item_bait_mouse_trap",
    "item_bait_sardine",
    "item_bait_shell",
    "item_bait_starfish",
    "item_bait_wallet",
    "item_balloon",
    "item_balloon_heart",
    "item_bamboo_fishing_rod",
    "item_banana",
    "item_banana_chips",
    "item_baseball_bat",
    "item_basic_fishing_rod",
    "item_batterycell_hydra",
    "item_beans",
    "item_big_cup",
    "item_bighead_larva",
    "item_bloodlust_vial",
    "item_blox_cube",
    "item_blox_moon",
    "item_blox_sphere",
    "item_blox_star",
    "item_blox_triangle",
    "item_boombox",
    "item_boombox_fishing",
    "item_boombox_neon",
    "item_boomerang",
    "item_box_fan",
    "item_brain_chunk",
    "item_brainslug_blue",
    "item_brainslug_green",
    "item_brainslug_pink",
    "item_broccoli_grenade",
    "item_broccoli_shrink_grenade",
    "item_broom",
    "item_broom_halloween",
    "item_bubble_gun",
    "item_bubble_staff",
    "item_burrito",
    "item_butcherpipe",
    "item_butcherspear",
    "item_butchersword",
    "item_calculator",
    "item_cardboard_box",
    "item_cardboard_dragon_body",
    "item_cardboard_dragon_head",
    "item_carrot",
    "item_ceo_plaque",
    "item_chakra",
    "item_clapper",
    "item_cluster_grenade",
    "item_coconut_shell",
    "item_cola",
    "item_cola_large",
    "item_company_ration",
    "item_company_ration_heal",
    "item_cracker",
    "item_crate",
    "item_crossbow",
    "item_crossbow_heart",
    "item_crowbar",
    "item_cube_frame",
    "item_cubetrident",
    "item_cuboid_anomaly",
    "item_cutie_dead",
    "item_d20",
    "item_deadmans_draw",
    "item_deadmans_draw_card",
    "item_deadmans_draw_card_comedy_drama",
    "item_deadmans_draw_comedy_drama",
    "item_demon_sword",
    "item_disc",
    "item_disposable_camera",
    "item_dragons_claw",
    "item_drill",
    "item_drill_fists",
    "item_drill_galaxy",
    "item_drill_neon",
    "item_dwarven_hammer",
    "item_dynamite",
    "item_dynamite_cube",
    "item_easter_egg",
    "item_egg",
    "item_egg_easter_blue",
    "item_egg_easter_red",
    "item_egg_easter_yellow",
    "item_electrical_tape",
    "item_energy_axe",
    "item_energy_sword_dual",
    "item_energy_sword_green",
    "item_energy_sword_red",
    "item_eraser",
    "item_eye_googly",
    "item_film_reel",
    "item_finger_board",
    "item_fish_anglerfish",
    "item_fish_big_shark",
    "item_fish_boomfish",
    "item_fish_boot",
    "item_fish_bottled_message",
    "item_fish_carp",
    "item_fish_chewna",
    "item_fish_clam_hookshot",
    "item_fish_cowfish",
    "item_fish_crappie",
    "item_fish_crispie",
    "item_fish_cube",
    "item_fish_diamond_jade_koi",
    "item_fish_dollar_bill",
    "item_fish_dragonfish",
    "item_fish_fishsword",
    "item_fish_ghost_sword",
    "item_fish_gold_fish",
    "item_fish_hydracarp",
    "item_fish_irontusk",
    "item_fish_kissy",
    "item_fish_license_plate",
    "item_fish_magma_carp",
    "item_fish_nebula_fish",
    "item_fish_nutfish",
    "item_fish_pufferfish",
    "item_fish_rainbow_trout",
    "item_fish_redacted",
    "item_fish_rotten_fish",
    "item_fish_salmon",
    "item_fish_salmonster",
    "item_fish_scaldfish",
    "item_fish_seahorse",
    "item_fish_seamine",
    "item_fish_shellfish_shield",
    "item_fish_spicy_salmon",
    "item_fish_teeth",
    "item_fish_triclops",
    "item_fish_tuna",
    "item_fish_yellowcake",
    "item_fishing_terminal_bait_button",
    "item_flamethrower",
    "item_flamethrower_skull",
    "item_flamethrower_skull_ruby",
    "item_flaregun",
    "item_flashbang",
    "item_flashlight",
    "item_flashlight_galaxy",
    "item_flashlight_mega",
    "item_flashlight_red",
    "item_flipflop_realistic",
    "item_floppy3",
    "item_floppy5",
    "item_football",
    "item_four_leaf_clover",
    "item_four_leaf_clover_gold",
    "item_four_leaf_radar",
    "item_friend_launcher",
    "item_frying_pan",
    "item_fungi_blue",
    "item_fungi_red",
    "item_gameboy",
    "item_glitched_banana",
    "item_glowing_fishing_rod",
    "item_glowstick",
    "item_goldbar",
    "item_goldcoin",
    "item_goop",
    "item_goopfish",
    "item_grappling_hook",
    "item_great_sword",
    "item_great_sword_galaxy",
    "item_grenade",
    "item_grenade_gold",
    "item_grenade_launcher",
    "item_guided_boomerang",
    "item_gyroid_anomaly",
    "item_hammer_candy_cane",
    "item_harddrive",
    "item_hatchet",
    "item_hawaiian_drum",
    "item_heart_chunk",
    "item_heart_gun",
    "item_heartchocolatebox",
    "item_hh_key",
    "item_hookshot",
    "item_hookshot_galaxy",
    "item_hookshot_sword",
    "item_hot_cocoa",
    "item_hoverpad",
    "item_hoverpad_galaxy",
    "item_hydra",
    "item_impulse_grenade",
    "item_jetpack",
    "item_joystick",
    "item_joystick_inv_y",
    "item_katana_big",
    "item_katana_medium",
    "item_keycard",
    "item_lance",
    "item_landmine",
    "item_landmine_bee",
    "item_lantern_cny",
    "item_large_banana",
    "item_lava_fishing_rod",
    "item_love_grenade",
    "item_mage_pirate_sword",
    "item_mannequin_arm",
    "item_mannequin_arm_left",
    "item_mannequin_arm_right",
    "item_mannequin_head",
    "item_mannequin_leg",
    "item_mannequin_leg_left",
    "item_mannequin_leg_right",
    "item_mannequin_torso",
    "item_marshmallow_bunny_bomb",
    "item_megaphone",
    "item_metal_ball",
    "item_metal_ball_easter",
    "item_metal_ball_xmas",
    "item_metal_plate",
    "item_metal_plate_small",
    "item_metal_plate_xmas",
    "item_metal_rod",
    "item_metal_rod_curved",
    "item_metal_rod_easter",
    "item_metal_rod_small",
    "item_metal_rod_xmas",
    "item_metal_triangle",
    "item_midipad",
    "item_midipad_animal",
    "item_mining_laser",
    "item_mining_laser_orange",
    "item_module_gun_1",
    "item_module_gun_2",
    "item_module_gun_3",
    "item_module_hull_1",
    "item_module_hull_2",
    "item_module_hull_3",
    "item_module_joust_1",
    "item_module_joust_2",
    "item_module_joust_3",
    "item_module_laser_1",
    "item_module_laser_2",
    "item_module_laser_3",
    "item_module_tether_1",
    "item_module_tractor_beam_1",
    "item_momboss_box",
    "item_moneygun",
    "item_moonhorror_key",
    "item_moonrock",
    "item_moonrock_cheesy",
    "item_moonrock_friend",
    "item_motor",
    "item_mountain_key",
    "item_mug",
    "item_needle",
    "item_nut",
    "item_nut_drop",
    "item_ogre_hands",
    "item_orange",
    "item_ore_copper_l",
    "item_ore_copper_m",
    "item_ore_copper_s",
    "item_ore_gold_l",
    "item_ore_gold_m",
    "item_ore_gold_s",
    "item_ore_hell",
    "item_ore_silver_l",
    "item_ore_silver_m",
    "item_ore_silver_s",
    "item_painting_canvas",
    "item_paperpack",
    "item_pelican_case",
    "item_pennant_spring",
    "item_pickaxe",
    "item_pickaxe_cny",
    "item_pickaxe_cube",
    "item_pickaxe_realistic",
    "item_pickaxe_realistic_galaxy",
    "item_pickaxe_spacedwarf",
    "item_pinata_bat",
    "item_pineapple",
    "item_pipe",
    "item_pistol_dragon",
    "item_plank",
    "item_plank_easter",
    "item_plate_round",
    "item_plunger",
    "item_pogostick",
    "item_police_baton",
    "item_popcorn",
    "item_portable_safe_zone",
    "item_portable_teleporter",
    "item_prismatic_anomaly",
    "item_prop_scanner",
    "item_pumpkin_bomb",
    "item_pumpkin_pie",
    "item_pumpkinjack",
    "item_pumpkinjack_small",
    "item_pyramidal_anomaly",
    "item_quest_gy_skull",
    "item_quest_gy_skull_special",
    "item_quest_hlal_brain",
    "item_quest_hlal_eyeball",
    "item_quest_hlal_flesh",
    "item_quest_hlal_heart",
    "item_quest_key_graveyard",
    "item_quest_vhs",
    "item_quest_vhs_backlots",
    "item_quest_vhs_basement",
    "item_quest_vhs_cave",
    "item_quest_vhs_circus_day",
    "item_quest_vhs_circus_ext",
    "item_quest_vhs_circus_fac",
    "item_quest_vhs_dam_facility",
    "item_quest_vhs_dam_servers",
    "item_quest_vhs_dark_forest",
    "item_quest_vhs_eden",
    "item_quest_vhs_forest",
    "item_quest_vhs_foundation",
    "item_quest_vhs_graveyard",
    "item_quest_vhs_haunted_house",
    "item_quest_vhs_hell",
    "item_quest_vhs_lab",
    "item_quest_vhs_lake",
    "item_quest_vhs_lobby",
    "item_quest_vhs_megalodon",
    "item_quest_vhs_megalodon_lake",
    "item_quest_vhs_mines",
    "item_quest_vhs_moon",
    "item_quest_vhs_moon_horror_rocket",
    "item_quest_vhs_mountain",
    "item_quest_vhs_mountainbot",
    "item_quest_vhs_mountainshack",
    "item_quest_vhs_mountainvault",
    "item_quest_vhs_obsidianhalls",
    "item_quest_vhs_odd_core",
    "item_quest_vhs_office",
    "item_quest_vhs_office_basement",
    "item_quest_vhs_powerplant_microwave",
    "item_quest_vhs_powerplant_reactorcore",
    "item_quest_vhs_powerplant_security",
    "item_quest_vhs_powerplant_supportfacility",
    "item_quest_vhs_sandbox",
    "item_quest_vhs_sewers",
    "item_quest_vhs_vhs-core",
    "item_quiver",
    "item_quiver_heart",
    "item_radiation_gun",
    "item_radioactive_broccoli",
    "item_radioactive_fishing_rod",
    "item_randombox_mobloot_big",
    "item_randombox_mobloot_medium",
    "item_randombox_mobloot_small",
    "item_randombox_mobloot_weapons",
    "item_randombox_mobloot_weapons_big",
    "item_randombox_mobloot_zombie",
    "item_rare_card",
    "item_remote_controller",
    "item_repair_wrench",
    "item_revolver",
    "item_revolver_ammo",
    "item_revolver_gold",
    "item_ring_buoy",
    "item_ringmaster_staff",
    "item_robo_monke",
    "item_robot_arm_left",
    "item_robot_arm_left_galaxy",
    "item_robot_arm_right",
    "item_robot_arm_right_galaxy",
    "item_robot_head",
    "item_rope",
    "item_rpg",
    "item_rpg_ammo",
    "item_rpg_ammo_egg",
    "item_rpg_ammo_shoe",
    "item_rpg_ammo_spear",
    "item_rpg_cny",
    "item_rpg_easter",
    "item_rpg_shoe",
    "item_rpg_smshr",
    "item_rpg_spear",
    "item_rubberducky",
    "item_ruby",
    "item_saddle",
    "item_salmoncannon",
    "item_sawblade",
    "item_sawblade_launcher",
    "item_scanner",
    "item_scissors",
    "item_server_pad",
    "item_shadowboss_key",
    "item_shield",
    "item_shield_bones",
    "item_shield_candy_cane",
    "item_shield_galaxy",
    "item_shield_police",
    "item_shield_viking_1",
    "item_shield_viking_2",
    "item_shield_viking_3",
    "item_shield_viking_4",
    "item_shotgun",
    "item_shotgun_ammo",
    "item_shotgun_gold",
    "item_shotgun_sawed",
    "item_shotgun_viper",
    "item_shovel",
    "item_shredder",
    "item_shrinking_broccoli",
    "item_skipole",
    "item_skishoe",
    "item_skishoe_2",
    "item_skishoe_3",
    "item_skishoe_4",
    "item_snail_friend",
    "item_snowball",
    "item_snowboard",
    "item_snowboard_2",
    "item_snowboard_3",
    "item_snowboard_4",
    "item_snowboard_auto",
    "item_snowboard_galaxy",
    "item_spear_candy_cane",
    "item_special_fishing_rod",
    "item_special_fishing_rod_radar_part",
    "item_special_fishing_rod_with_radar",
    "item_stapler",
    "item_stash_grenade",
    "item_steel_beam",
    "item_steel_beam_xmas",
    "item_stellarsword_blue",
    "item_stellarsword_gold",
    "item_stellate_anomaly",
    "item_stick_armbones",
    "item_stick_bone",
    "item_sticker_dispenser",
    "item_sticky_dynamite",
    "item_stinky_cheese",
    "item_stopwatch",
    "item_tablet",
    "item_tapedispenser",
    "item_tele_grenade",
    "item_tele_pearl",
    "item_teleport_dagger",
    "item_teleport_gun",
    "item_teleport_gun_galaxy",
    "item_theremin",
    "item_timebomb",
    "item_toilet_paper",
    "item_toilet_paper_mega",
    "item_toilet_paper_roll_empty",
    "item_token_circus",
    "item_trampoline",
    "item_treestick",
    "item_tripwire_explosive",
    "item_trophy",
    "item_truss",
    "item_truss_easter",
    "item_truss_small",
    "item_truss_xmas",
    "item_turkey_leg",
    "item_turkey_whole",
    "item_ukulele",
    "item_ukulele_gold",
    "item_umbrella",
    "item_umbrella_clover",
    "item_umbrella_squirrel",
    "item_unidentified",
    "item_upsidedown_loot",
    "item_uranium_chunk_l",
    "item_uranium_chunk_m",
    "item_uranium_chunk_s",
    "item_viking_hammer",
    "item_viking_hammer_twilight",
    "item_war_fan",
    "item_wheelhandle",
    "item_wheelhandle_big",
    "item_whoopie",
    "item_wireframe_cube",
    "item_wireframe_gun",
    "item_wood_log",
    "item_wood_pallet",
    "item_wood_pallet_easter",
    "item_wyrmpiercer",
    "item_zipline_gun",
    "item_zombie_meat",
  ],
  prefabList = [
    "Blackhole",
    "blackhole",
    "Arena",
    "ArenaDefault",
    "ArenaGame",
    "ArenaGamemanager",
    "ArenaMap",
    "InflatedBalloon",
    "InflatedHeartBalloon",
    "ChristmasBox",
    "ChristmasBoxManager",
    "RPGRocket",
    "RPGRocketEgg",
    "RPGRocketSpear",
    "item_randombox_base",
    "StickyAnchor",
    "SpawnableZipline",
    "NetLootSpawnGroup",
    "Vehicle_Buggy",
    "NetPlayer",
    "NetSpectator",
    "TeleportationManager",
    "FlareGunProjectile",
    "AutoDestroyItem_DeadBody_Poop",
    "AutoDestroyItem_DeadBody_Splash",
    "AutoDestroyItem_Splash (0)",
    "AutoDestroyItem_Splash (1)",
    "AutoDestroyItem_Splash (2)",
    "AutoDestroyItem_Splash (3)",
    "AutoDestroyItem_Splash (4)",
    "AutoDestroyItem_Splash (5)",
    "SpaceshipTeleporter",
    "MazeManager",
    "ThunderController",
    "SlenderMonster",
    "ItemSellingMachineController",
    "Landmine",
    "LeaderBoardMonsterKill",
    "GiantRockObject",
    "HordeMobController",
    "HordeMobLobbyHandler",
    "LongAisleController",
    "Duplicator",
    "HH_LockedDoor",
    "HingedDoorNetworked",
    "ScaffoldTrap",
    "Pillar_Arched_Broken_01",
    "RuinTower_FloatingPlatform",
    "RuinTower_FloatingSmall",
    "Shipwheel",
    "TeleportMachine",
    "FourLeafQuest_FourLeafSpawner",
    "EasterEgg_QuestSpawner",
    "RadarPartSpawner",
    "SimpleKeypadDoor",
    "GiantController_GraveyardBoss_backup",
    "MetaCameraControls",
    "GrenadeProjectile",
    "LaserMirror",
    "mom_pillow",
    "RiggedPlank",
    "SharkScareTriggerObject",
    "Uvula",
    "BaitShopButton_Spawner",
    "NetworkedLever_SecretLeft",
    "CoreTeleporter",
    "LaserSource",
    "LaserSink",
    "grababble_fish_paper_message",
    "AutoDestroyItem_OilSplatter",
    "AutoDestroyItem_Splash0",
    "AutoDestroyItem_Splash1",
    "AutoDestroyItem_Splash2",
    "AutoDestroyItem_Splash3",
    "AutoDestroyItem_Splash4",
    "AutoDestroyItem_Splash5",
    "BarrelBeansDynamic",
    "BarrelBeansStatic",
    "BarrelExplodingDynamic",
    "BarrelExplodingStatic",
    "BarrelOilDynamic",
    "BarrelOilStatic",
    "Basketball",
    "BigBanana",
    "BigHatchdoorNetObject",
    "BigWheelhandleSpawner",
    "BonfireController",
    "BrainPowerPlug",
    "ChoppableTreeManager",
    "ClawMachineNetObject",
    "DiggableGrave",
    "DummyPlayerTarget",
    "DummyTarget",
    "EscherToyBlockObject",
    "FortuneTellerNet",
    "FuelCanisterNetObject",
    "FuelCanisterSpawner",
    "GenericWorldItemSpawner",
    "GiantRockObject_Fire",
    "GreenscreenNET",
    "HatchdoorGrabHandle",
    "HatchdoorNetObject",
    "HellAltar",
    "KeypadDoorNetObject",
    "LakePineapple_Spawner",
    "LockedDoor_KeySpawner",
    "LockedShippingContainer_Quest",
    "LogQuestItemSpawner",
    "LootLantern",
    "Mausoleum_01",
    "MimicSpawner_CemeteryTile1",
    "MimicSpawner_CemeteryTile3",
    "MomToyBlockObject",
    "MomToyBlockObject_DisappearOnDrop",
    "MovieTheater",
    "Net",
    "NetGameTimeManager",
    "NetMobSpawnGroup",
    "RamEventNet",
    "remote_controller_receiver",
    "RobotDogRPG",
    "SkiRaceController",
    "Snail_Spawner",
    "Spawner_Key",
    "TubeMonster",
  ],
  mobIDs = [
    "AnglerController",
    "AnglerMadController",
    "ArmstrongController",
    "ArmstrongMadController",
    "BansheeController",
    "BigHeadController",
    "BigSharkController",
    "BlobController",
    "BombController",
    "BomberController",
    "BomberFlashbangController",
    "BomberMadController",
    "ChickenController",
    "CutieController",
    "CystController",
    "EdenZombieController",
    "EvilEyeController",
    "EvilEyePinataController",
    "EvilEyePinataLargeController",
    "FakeGorillaController",
    "FlyingSwarmController",
    "ForestMobController",
    "GiantController",
    "GiantGreenController",
    "GiantThrower",
    "GiantThrowerController",
    "Giant_GreenController",
    "GraveyardBossController",
    "GreenGiantController",
    "Green_GiantController",
    "HeartController",
    "LankyController",
    "MimicController",
    "NextBotController",
    "NextBotStaticController",
    "PhantomController",
    "PolypMassController",
    "PrototypeSlenderController",
    "PuppetController",
    "RedGreenController",
    "RedGreenMadController",
    "RingmasterController",
    "RobotDogController",
    "SegwayController",
    "ShadowBossController",
    "ShadowController",
    "SkinwalkerController",
    "SlimeyController",
    "SpiderCaveController",
    "SpiderController",
    "YanWormController",
    "YangWormController",
    "YinWormController",
    "YinYanWormController",
    "YingWormController",
    "YingYangWormController",
  ],
  VFXTypes = {
    None: 255,
    MuzzleFlash_Shotgun: 0,
    MuzzleFlash_FlareGun: 1,
    CrateBreak: 2,
    MuzzleFlash_SmallGun: 3,
    MuzzleFlash_GoldRevolver: 4,
    MuzzleFlash_DragonPistol: 5,
    MuzzleFlash_ViperShotgun: 6,
    GlassBreak: 7,
    MuzzleFlash_Hydra: 8,
    Explosion_FlareGun: 32,
    Explosion_Coins: 33,
    Explosion_Nuts: 34,
    Explosion_Keys: 35,
    Explosion_Balloon: 36,
    Explosion_TeleGrenadeSrc: 37,
    Player_Touch_Lava: 38,
    Portal_Teleport: 39,
    Explosion_Coins_Vertical: 40,
    Autumn_Leaves_Burst: 41,
    Explosion_Feathers: 42,
    Explosion_Popcorn: 43,
    Electricity_Small: 44,
    Impact_Snowball: 65,
    Impact_GoldRevolver: 66,
    Impact_MeleeHit: 67,
    Impact_BigGroundHit: 68,
    Impact_MeleeHit_CriticalSmall: 69,
    Impact_MeleeHit_CriticalLarge: 70,
    Impact_MeleeHit_AoE: 71,
    Impact_WaterSplash: 72,
    Research_ZiplineAttachDetach: 96,
    Research_Purchase1RP: 97,
    Research_Purchase5RP: 98,
    Research_Purchase10RP: 99,
    Research_PurchaseRPBundle: 100,
    Rope_ZiplineAttachDetach: 110,
    MeatExplosion_1: 128,
    MeatExplosion_2: 129,
    MeatExplosion_Headshot: 130,
    ServerRoomSplash_Small: 160,
    ServerRoomSplash_Big: 161,
    RAMActivationSparks: 162,
    GreenBlink: 170,
    ConfettiBurst: 174,
    Ethereal_Void: 180,
    MomBoss_NailBreak: 181,
    MidAirJump_Fart: 182,
    FuelExplosion: 183,
    HeartBurst: 184,
    EatingLoop: 185,
    SmileyBurst: 186,
  },
  TeleTarget = {
    Lobby_DefaultSpawn: 0,
    Lobby_Teleporter: 1,
    Lab_RespawnTube: 2,
    OldLobby_Scary: 3,
    ResearchWorldEntry: 4,
    InsideStash: 7,
    UndergroundHookshotRoom: 8,
    Office_Skydome: 9,
    RingmasterGameRoom: 10,
    Lobby_SkiLift: 11,
    FishTank_Interior: 12,
    FishTank_WayBack: 13,
    Arena_RedSpawn: 16,
    Arena_BlueSpawn: 17,
    Arena_Lobby: 18,
    BetweenLobbyLoading: 19,
    MoonCrashSite: 20,
    Arena_SpectatorSpawn: 21,
    Dam_LobbyDrama: 30,
    Dam_Pier: 31,
    Dam_CrackEntrance: 32,
    Dam_CrackLanding: 33,
    Dam_PipesCrossing: 34,
    Dam_Diving: 35,
    Dam_ServerRooms: 36,
    Dam_BeforeBrain: 37,
    Dam_LoadingScreen: 38,
    Studios_Greenscreen: 48,
    Studios_City: 49,
    Studios_Podcast: 50,
    Studios_Streamer: 51,
    Studios_News: 52,
    Circus_Exterior: 60,
    Circus_InteriorPlinth: 61,
    Circus_InteriorChangeover: 62,
    Circus_Escher_1: 63,
    Circus_Escher_Puzzle: 64,
    Circus_Escher_2: 65,
    Circus_Void: 66,
    Circus_DaycareTeleport: 67,
    Circus_BossRoom: 68,
    HH_Foyer: 70,
    GY_Entrance: 80,
    GY_Middle: 81,
    GY_Summoning: 82,
    Mine_DropTunnel: 90,
    Mine_Hell: 91,
    Office_Lobby: 100,
    Office_Duplicator: 101,
    PowerPlant_Security: 102,
    PowerPlant_Control: 103,
    PowerPlant_Core: 104,
    PowerPlant_Entrance: 105,
    PowerPlant_Silo1: 106,
    PowerPlant_Silo2: 107,
    PowerPlant_Turbine: 108,
    PowerPlant_Microwave: 109,
    Ski_Top: 128,
    Ski_ChallengeStart: 129,
    Ski_ChallengeCP1: 130,
    Ski_ChallengeCP2: 131,
    Ski_ChallengeCP3: 132,
    Ski_Midpoint: 133,
    Ski_Bottom: 134,
    Ski_Credits: 135,
    Ski_Vault: 136,
    Ski_WinterHouse: 137,
    Megalodon_Entrance: 140,
    Megalodon_MidBelly: 141,
    Megalodon_LoreRoom: 142,
    Megalodon_EndLake: 143,
    Megalodon_HeartRoom: 144,
    PirateShip: 170,
    Fishing_Forest: 200,
    Fishing_Foundation: 201,
    Underbelly_JumpingPuzzle: 220,
    Underbelly_BigHeadPipes: 221,
    Underbelly_Foundation: 222,
    Dig_Sandbox: 239,
    Dig_ObsidianHalls: 240,
    Dig_ObsidianBoss: 241,
    Dig_Eden: 242,
    Dig_Eden_Underbelly: 243,
    Dig_Eden_Facility: 244,
    Dig_The_Pit: 245,
    Dig_Earth_Core_Top: 246,
    Dig_Earth_Core: 247,
    Dig_Moon_Core: 248,
    Moon_Rocket_Exterior: 251,
    Moon_Rocket_InteriorStart: 252,
    Moon_Rocket_InteriorEnd: 253,
    Moon_Rocket_AirlocksA: 254,
    Moon_Rocket_AirlocksB: 255,
    Smiley_Start: 260,
  },
  mapIDs = Object.entries(TeleTarget).map(([_name, _id]) => ({
    name: _name,
    id: _id,
  }));
const version = "2.0";

let n5AccentColor = [0.0, 1.0, 0.42, 1.0];
function n5ToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) =>
        Math.round(Math.min(1, x) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
function n5FormatMenuLabel(text) {
  if (!text) return text;
  const s = String(text);
  if (s.indexOf("<color") >= 0) return s;
  return s.replace(/(^|\s)([a-z])/g, (_, sp, c) => sp + c.toUpperCase());
}

function n5GetMenuName() {
  const _theme = n5ThemeKeys[n5ThemeIndex % n5ThemeKeys.length];
  return (
    "<b><color=#ffffff>N5</color><color=#9b7cff>.</color><color=#d9ccff>exe</color></b>  <color=#8f7cff>OWNER</color>  <color=#b7a8e8>[ " +
    _theme +
    " ]</color>"
  );
}
let menuName =
  "<b><color=#ffffff>N5</color><color=#9b7cff>.</color><color=#d9ccff>exe</color></b>  <color=#8f7cff>OWNER</color>";
let rpcAlertMsg = "",
  rpcAlertExpiry = 0,
  rpcAlertObj = null,
  rpcAlertLastShown = "";

const n5RpcBlocks = {
  ApplyBuff: true,
  AddForce: true,
  Teleport: true,
  Stinky: true,
  Stun: true,
  SetColor: true,
  KickPlayer: true,
};

let _n5RpcOverlayObj = null,
  _n5RpcOverlayText = null,
  _n5RpcOverlayLastMsg = "";
let n5SoundLoading = false;
let menu = null,
  reference = null,
  referenceCollider = null,
  buttonClickDelay = 0,
  LerpMenu = true,
  menuscale = 0.9,
  righthand = false,
  n5ImGuiMode = false,
  deltaTime = 0,
  time = 604 + -604,
  stashDupeEnabled = false,
  stashDupe = false,
  itemIndex = 0,
  itemGunDelay = 0,
  mobIndex = 0,
  prefabIndex = 0,
  mobGunDelay2 = 0,
  flySpeed = 20,
  bgColor = [0.04, 0.0, 0.1, 0.92],
  textColor = [0.0, 1.0, 0.35, 1.0],
  buttonColor = [0.08, 0.0, 0.18, 0.82],
  buttonPressedColor = [0.55, 0.0, 1.0, 1.0],
  gunColor = [0.0, 1.0, 0.42, 0.9],
  cachedItems = null,
  currentNotification = "",
  notifactionResetTime = 0,
  currentCategory = -5168 + 5168,
  currentPage = 0,
  hueVal = 0,
  satVal = 0,
  tagGunDelay = 0,
  lagGunDelay = 0,
  frameCount = -15192,
  leftPrimary = false,
  leftSecondary = false,
  rightPrimary = false,
  rightSecondary = false,
  leftGrab = false,
  rightGrab = false,
  leftTrigger = false,
  rightTrigger = false,
  leftStick = false,
  rightStick = false,
  InfAmmo = false,
  n5ShotgunNoCooldown = false,
  n5GiveawayBagDelay = 0,
  n5ArenaSpamDelay = 0,
  ejectDupeAmount = 2,
  ejectDupeIndex = 0;
let n5InfiniteHoverpadBattery = false;

let _n5FlatCache = null,
  _n5FlatDirty = true;

let _n5MenuLastCat = -1,
  _n5MenuLastPage = -1;
let _n5MenuAnim = 0,
  _n5MenuAnimTarget = 0,
  _n5MenuAnimKick = 0,
  _n5MenuClickBounce = 0,
  _n5MenuClosing = false,
  _n5MenuBaseScale = null;
let _n5LastMenuWanted = false;
let n5SearchActive = false,
  n5SearchQuery = "",
  n5SearchKeyState = {},
  n5VRSearchLastKeyTime = 0;

let _n5PCMode = false;
let _n5PCMenuOpen = false;
let _n5PCMenuSelector = 0;
let _n5PCYaw = 0;
let _n5PCPitch = 0;
let _n5PCFlyEnabled = false;
let _n5PCLastCursorX = -1;
let _n5PCLastCursorY = -1;
let _n5PCRmbWasDown = false;
let _n5PCQWasDown = false;
let _n5PCEscWasDown = false;
let _n5PCUpWasDown = false;
let _n5PCDownWasDown = false;
let _n5PCEnterWasDown = false;
let _n5PCLeftWasDown = false;
let _n5PCRightWasDown = false;
let _n5PC5WasDown = false;
let _n5PCLmbMenuWasDown = false;
let _n5GAKS = null;
let _n5GCP = null;
let _n5PCPoint = Memory.alloc(8);
function _n5FindExport(_moduleName, _exportName) {
  try {
    if (Module.findExportByName)
      return Module.findExportByName(_moduleName, _exportName);
  } catch (_) {}
  try {
    if (Module.getExportByName)
      return Module.getExportByName(_moduleName, _exportName);
  } catch (_) {}
  try {
    if (Module.findGlobalExportByName)
      return Module.findGlobalExportByName(_exportName);
  } catch (_) {}
  try {
    if (Module.getGlobalExportByName)
      return Module.getGlobalExportByName(_exportName);
  } catch (_) {}
  try {
    const _m = Process.getModuleByName(_moduleName);
    try {
      if (_m.findExportByName) return _m.findExportByName(_exportName);
    } catch (_) {}
    try {
      if (_m.getExportByName) return _m.getExportByName(_exportName);
    } catch (_) {}
  } catch (_) {}
  return null;
}
function _n5PCInitWin32() {
  try {
    const user32 = _n5FindExport("user32.dll", "GetAsyncKeyState");
    if (user32) _n5GAKS = new NativeFunction(user32, "int", ["int"]);
    const gcp = _n5FindExport("user32.dll", "GetCursorPos");
    if (gcp) _n5GCP = new NativeFunction(gcp, "bool", ["pointer"]);
    if (_n5GAKS)
      console.log("[N5 PC] Win32 input ready. Press Q to enter PC mode.");
  } catch (e) {
    console.error("[N5 PC] Win32 init failed:", e);
  }
}
function _n5KeyDown(vk) {
  if (!_n5GAKS) return false;
  try {
    return (_n5GAKS(vk) & 32768) !== 0;
  } catch (_) {
    return false;
  }
}
const _VK_Q = 81;
const _VK_W = 87;
const _VK_A = 65;
const _VK_S = 83;
const _VK_D = 68;
const _VK_ESCAPE = 27;
const _VK_LBUTTON = 1;
const _VK_RBUTTON = 2;
const _VK_MBUTTON = 4;
const _VK_RETURN = 13;
const _VK_SPACE = 32;
const _VK_SHIFT = 16;
const _VK_BACK = 8;
const _VK_UP = 38;
const _VK_DOWN = 40;
const _VK_LEFT = 37;
const _VK_RIGHT = 39;
const _VK_5 = 53;

let _n5InputBuf = null;

let _n5ToastHandler = null,
  _n5ToastCtx = null,
  _n5ToastClass = null;

const N5_THEMES = {
  Default: {
    bg: [0.03, 0.0, 0.12, 0.95],
    btn: [0.07, 0.0, 0.22, 0.85],
    btnOn: [0.3, 0.0, 0.7, 0.97],
    text: [0.0, 1.0, 0.42, 1.0],
    gun: [0.0, 1.0, 0.42, 0.9],
    pulse: false,
  },
  Galaxy: {
    bg: [0.01, 0.0, 0.1, 0.97],
    btn: [0.04, 0.0, 0.18, 0.92],
    btnOn: [0.4, 0.05, 0.8, 0.97],
    text: [0.7, 0.35, 1.0, 1.0],
    gun: [0.7, 0.35, 1.0, 0.9],
    pulse: true,
  },
  Rainbow: {
    bg: [0.03, 0.0, 0.12, 0.95],
    btn: [0.07, 0.0, 0.22, 0.85],
    btnOn: [0.3, 0.0, 0.7, 0.97],
    text: [1.0, 1.0, 1.0, 1.0],
    gun: [1.0, 1.0, 1.0, 0.9],
    pulse: true,
  },
  "Blood Red": {
    bg: [0.1, 0.0, 0.0, 0.96],
    btn: [0.22, 0.0, 0.0, 0.9],
    btnOn: [0.9, 0.0, 0.05, 0.97],
    text: [1.0, 0.15, 0.1, 1.0],
    gun: [1.0, 0.15, 0.1, 0.9],
    pulse: true,
  },
  Ocean: {
    bg: [0.0, 0.04, 0.13, 0.96],
    btn: [0.0, 0.08, 0.25, 0.9],
    btnOn: [0.0, 0.5, 0.95, 0.97],
    text: [0.0, 0.82, 1.0, 1.0],
    gun: [0.0, 0.82, 1.0, 0.9],
    pulse: false,
  },
  Gold: {
    bg: [0.1, 0.06, 0.0, 0.96],
    btn: [0.18, 0.12, 0.0, 0.9],
    btnOn: [0.75, 0.5, 0.0, 0.97],
    text: [1.0, 0.88, 0.0, 1.0],
    gun: [1.0, 0.88, 0.0, 0.9],
    pulse: true,
  },
  Ice: {
    bg: [0.0, 0.06, 0.15, 0.95],
    btn: [0.04, 0.12, 0.25, 0.9],
    btnOn: [0.25, 0.6, 0.95, 0.97],
    text: [0.75, 0.92, 1.0, 1.0],
    gun: [0.75, 0.92, 1.0, 0.9],
    pulse: false,
  },
  Neon: {
    bg: [0.0, 0.0, 0.07, 0.97],
    btn: [0.0, 0.06, 0.13, 0.92],
    btnOn: [0.0, 0.95, 1.0, 0.97],
    text: [0.0, 1.0, 1.0, 1.0],
    gun: [0.0, 1.0, 1.0, 0.9],
    pulse: true,
  },
  Sunset: {
    bg: [0.12, 0.03, 0.06, 0.96],
    btn: [0.24, 0.06, 0.06, 0.9],
    btnOn: [0.95, 0.35, 0.0, 0.97],
    text: [1.0, 0.55, 0.12, 1.0],
    gun: [1.0, 0.55, 0.12, 0.9],
    pulse: true,
  },
  Matrix: {
    bg: [0.0, 0.06, 0.0, 0.97],
    btn: [0.0, 0.1, 0.0, 0.92],
    btnOn: [0.0, 0.75, 0.0, 0.97],
    text: [0.0, 1.0, 0.0, 1.0],
    gun: [0.0, 1.0, 0.0, 0.9],
    pulse: false,
  },
  Midnight: {
    bg: [0.02, 0.02, 0.1, 0.97],
    btn: [0.06, 0.06, 0.2, 0.92],
    btnOn: [0.25, 0.25, 0.95, 0.97],
    text: [0.55, 0.55, 1.0, 1.0],
    gun: [0.55, 0.55, 1.0, 0.9],
    pulse: false,
  },
  Toxic: {
    bg: [0.02, 0.08, 0.0, 0.96],
    btn: [0.05, 0.13, 0.0, 0.9],
    btnOn: [0.35, 0.95, 0.0, 0.97],
    text: [0.65, 1.0, 0.0, 1.0],
    gun: [0.65, 1.0, 0.0, 0.9],
    pulse: true,
  },
  Fire: {
    bg: [0.12, 0.02, 0.0, 0.96],
    btn: [0.25, 0.06, 0.0, 0.9],
    btnOn: [1.0, 0.45, 0.0, 0.97],
    text: [1.0, 0.65, 0.0, 1.0],
    gun: [1.0, 0.65, 0.0, 0.9],
    pulse: true,
  },
  Void: {
    bg: [0.012, 0.014, 0.026, 0.988],
    btn: [0.052, 0.056, 0.082, 0.94],
    btnOn: [0.16, 0.42, 0.72, 0.985],
    text: [0.74, 0.9, 1.0, 1.0],
    gun: [0.34, 0.78, 1.0, 0.94],
    pulse: true,
  },
  Snow: {
    bg: [0.09, 0.1, 0.12, 0.94],
    btn: [0.14, 0.16, 0.2, 0.9],
    btnOn: [0.65, 0.75, 0.9, 0.97],
    text: [0.92, 0.97, 1.0, 1.0],
    gun: [0.92, 0.97, 1.0, 0.9],
    pulse: false,
  },
  Cyber: {
    bg: [0.0, 0.0, 0.04, 0.98],
    btn: [0.0, 0.0, 0.1, 0.94],
    btnOn: [1.0, 0.0, 0.5, 0.97],
    text: [1.0, 0.0, 0.6, 1.0],
    gun: [1.0, 0.0, 0.6, 0.9],
    pulse: true,
  },
  Jade: {
    bg: [0.0, 0.07, 0.05, 0.96],
    btn: [0.0, 0.13, 0.09, 0.9],
    btnOn: [0.0, 0.8, 0.55, 0.97],
    text: [0.0, 1.0, 0.65, 1.0],
    gun: [0.0, 1.0, 0.65, 0.9],
    pulse: false,
  },
  Sakura: {
    bg: [0.1, 0.0, 0.06, 0.95],
    btn: [0.2, 0.0, 0.12, 0.9],
    btnOn: [1.0, 0.2, 0.55, 0.97],
    text: [1.0, 0.55, 0.75, 1.0],
    gun: [1.0, 0.55, 0.75, 0.9],
    pulse: true,
  },
};
const n5ThemeKeys = Object.keys(N5_THEMES);
const N5_DEFAULT_THEME_INDEX = Math.max(0, n5ThemeKeys.indexOf("Void"));
let n5ThemeIndex = N5_DEFAULT_THEME_INDEX,
  n5MenuScale = 1.0,
  n5PulsePhase = 0,
  n5RainbowPhase = 0;

let _n5LastThemeKey = null,
  _n5LastItemIdx = -1,
  _n5LastMobIdx = -1,
  _n5LastPrefabIdx = -1,
  _n5LastVfxIdx = -1;

const n5ItemDisplay = {
  buttonText: "ITEM: ...",
  isTogglable: false,
  enabled: false,
};
const n5MobDisplay = {
  buttonText: "MOB: ...",
  isTogglable: false,
  enabled: false,
};
const n5PrefabDisplay = {
  buttonText: "PREFAB: ...",
  isTogglable: false,
  enabled: false,
};

const n5VFXDisplay = {
  buttonText: ">>> VFX: None",
  isTogglable: false,
  enabled: false,
};
let vfxIndex = 0;
let vfxKeys = Object.keys(VFXTypes).filter((k) => k !== "None");
const n5VisualAssetTypes = {
  Asset_ArenaOreMined: 3,
  Asset_BubbleStream: 5,
  Asset_BulletTrace: 7,
  Asset_CoinEarn: 9,
  Asset_ElectricityArc: 11,
  Asset_ElectricitySurface: 12,
  Asset_FartTag: 14,
  Asset_FishEarn: 15,
  Asset_FlyingDustParticles: 16,
  Asset_GhostReviveText: 17,
  Asset_HealthBurst: 20,
  Asset_HellGigaSiphon: 22,
  Asset_HellSiphon: 23,
  Asset_NutEarn: 26,
  Asset_OreBreak: 27,
  Asset_OreHit: 28,
  Asset_PlayerHitTest: 31,
  Asset_PowerPlugSparks: 32,
  Asset_ProximityHeal: 33,
  Asset_RadiationAmbience: 35,
  Asset_RAMActivation: 36,
  Asset_RamBreakdown: 37,
  Asset_ReactorCoreAmbience: 38,
  Asset_RPEarn: 39,
  Asset_SnowstormAmbience: 42,
  Asset_SwimBubbles: 43,
  Asset_VFX_SpiderBlood: 45,
  Asset_VoxelBreak: 47,
  Asset_WoosterSplash: 48,
};
const n5VisualAssetKeys = Object.keys(n5VisualAssetTypes);
for (const _vak of n5VisualAssetKeys)
  VFXTypes[_vak] = 1000 + n5VisualAssetTypes[_vak];
vfxKeys = Object.keys(VFXTypes).filter((k) => k !== "None");

let orbitAllEnabled = false;
let orbitPhase = 0;
let orbitSpeed = 0.35;
const n5Names = [
  "hi",
  "epstein",
  "hellen keller",
  "garfield",
  "woostergames",
  "<color=red>OWNER</color>",
  "<color=blue>N5</color>",
  "<color=yellow>mcdonalds</color>",
  "<color=green>Donald Trump</color>",
  "<color=blue>MrBeast</color>",
  "<color=blue>GunyahJohnVR</color>",
  "unknown",
  "porn enjoyer",
  "???",
  "unknown",
];
let n5NameIndex = 0;

let disableDangerousPrefabs = false;
let _n5OrbitSnowBalls = null,
  _n5OrbitSnowHues = null,
  _n5OrbitSnowScales = null;
let n5OrbitFuckeryObjects = [];
let n5OrbitFuckeryOrbiters = [];
let n5TowerOrbitObjects = [];
let n5TowerOrbitOrbiters = [];
let n5OrbitFuckeryPrefabName = "AnglerController";
let n5OrbitFuckeryRadius = 6.5;
let n5OrbitFuckeryCount = 16;
let n5OrbitFuckeryShootDelay = 0;
let allowAllContainers = false;
let n5ArenaStartStopSpam = false,
  n5ArenaStartStopDelay = 0,
  n5ServerAudioId = 420,
  n5ServerAudioDelay = 0,
  n5ProjectileIndex = 0,
  n5ProjectileSwapEnabled = false,
  n5FlarePrefabImpactEnabled = false,
  n5FlarePrefabDelay = 0,
  n5LeftPlatform = null,
  n5RightPlatform = null,
  n5FlareImpactSeen = new Set(),
  n5FlareProjectileSeen = {};
let n5BagDropDupeEnabled = false,
  n5NoBackpackRemoveEnabled = false,
  n5NeverDespawnItems = false,
  n5NeverDespawnHookInstalled = false,
  n5BagDropDupeHooksInstalled = false,
  n5InfiniteGunStats = false,
  n5BagDropDupeAmount = 3,
  n5BagDropDupeDelay = 0,
  n5BagDropDupeValues = [1, 2, 3, 5, 10, 15, 25, 50],
  n5BagDropDupeIndex = 2;
let n5NeverDespawnDelay = 0,
  n5GunStatsDelay = 0,
  n5ItemForceDelay = 0,
  n5VoxelNukeDelay = 0,
  n5PickupGunDelay = 0,
  n5NoRecoilEnabled = false,
  n5HeldValueAmount = 999999;
let n5ShopUnlockEnabled = false,
  n5CosmeticOwnEnabled = false,
  n5NoSpendEnabled = false,
  n5VendingBypassEnabled = false,
  n5BlueprintAbuseEnabled = false,
  n5DevSpoofEnabled = false,
  n5GoodShitHooksInstalled = false;
let n5InfFartEnabled = false,
  n5InfFartDelay = 0,
  n5InfiniteJetpackEnabled = false,
  n5InfiniteJetpackDelay = 0,
  n5TimebombSpamDelay = 0;
let n5RigDupeDelay = 0,
  n5RigSpasmEnabled = false,
  n5RigSpamDelay = 0,
  n5RigSpasmBase = null;
let n5BuffId = 0,
  n5BuffSpam = false,
  n5BuffSpamDelay = 0,
  n5WorldSpamDelay = 0,
  n5MachineSpamDelay = 0,
  n5TeleSpamDelay = 0,
  n5UserIndex = 0,
  n5MapIndex = 0,
  n5AutoKickAllDelay = 0,
  n5RandomSpawnConfig = true,
  n5SellingSpasm = false,
  n5ToiletSpam = false,
  n5SellAmountSpam = false,
  _n5OutgoingKick = false;
const n5ProjectilePrefabs = [
  "FlareGunProjectile",
  "RPGRocket",
  "RPGRocketSpear",
  "RPGRocketEgg",
  "GrenadeProjectile",
  "RobotDogRPG",
  "Landmine",
  "InflatedBalloon",
  "InflatedHeartBalloon",
];
const dangerousPrefabs = ["NetPlayer", "NetSpectator"];

let assemblyImages,
  acImage,
  coreImage,
  physImage,
  uiImage,
  uiModuleImage,
  textRenderImage,
  fusionImage,
  tmpImage,
  xrImage,
  audioImage,
  OculusPlatformSettings,
  GorillaLocomotionCls,
  NetPlayerCls,
  ItemVendingMachineViewCls,
  ElevatorManagerCls,
  ArenaGameManagerCls,
  GrabbableObjectCls,
  ItemSellingMachineControllerCls,
  PrefabGeneratorCls,
  GrabbableItemCls,
  PlayerControllerCls,
  GrabbableObjectCls2,
  SFXManagerCls,
  NetworkManagerCls,
  ComputerTerminalKeyCls,
  InputDevicesCls,
  XRCommonUsagesCls,
  GameObjectCls,
  UnityObjectCls,
  Vector3Cls,
  QuaternionCls,
  TimeCls,
  ResourcesCls,
  MaterialCls,
  MeshRendererCls,
  ShaderCls,
  RectTransformCls,
  LineRendererCls,
  BoxColliderCls,
  ColliderCls,
  RigidbodyCls,
  PhysicsCls,
  ComponentCls,
  ParticleManagerCls,
  ParticleManagerCls2,
  CanvasCls,
  CanvasScalerCls,
  GraphicRaycasterCls,
  UITextCls,
  FontCls,
  gorillaLocomotionInstance,
  urpUnlitShader,
  uiDefaultShader,
  vec3Zero,
  vec3One,
  identityRotation,
  leftHandTransform,
  rightHandTransform,
  headCollider,
  bodyCollider,
  arialFont;
let _vx53f,
  _vx2eb,
  _n5WlPruneTimer = 0,
  whitelist = [],
  _vx5c4,
  _iterItem,
  _iterMob,
  _vx574,
  _vx2a4,
  _gunOverrideLayer;

let vfxGunDelay = 0;
let n5VFXRateBypassInstalled = false;
let joystickFlyEnabled = false;
let platformSpawnDelay = 0;
let allItemsGunDelay = 0;
let allMobsGunDelay = 0;
let allPrefabsGunDelay = 0;

let n5ControlledPrefab = null;
let n5ControlPrefabEnabled = false;
let n5ControlPrefabVel = [0, 0, 0];
let n5BecomePrefabObj = null;
let n5BecomePrefabEnabled = false;
let n5HeldPrefabObj = null;
let n5HeldPrefabTransform = null;
let n5HeldPrefabEnabled = false;
let n5HeldPrefabName = "";
let n5LarpPrefabObj = null;
let n5LarpPrefabEnabled = false;
let n5LarpPrefabName = "";
let n5HelixSpawnDelay = 0;
const n5QuiverSlots = Array(15)
  .fill(null)
  .map((_, i) => "item_snowball");
let n5QuiverSlotIndex = 0;
let n5SidebarPanel = null;
let n5SidebarText = null;
let n5SpeedBoostEnabled = false;
let n5SuperJumpEnabled = false;
let n5BigHandsEnabled = false;
let n5GodModeEnabled = false;
let n5GodModeHookSet = false;
let n5BetterGodModeEnabled = false;
let n5BetterGodModeHookSet = false;
let n5FullbrightEnabled = false;
let n5FullbrightHookSet = false;
let n5AutoReviveSelfEnabled = false;
let n5AutoReviveSelfDelay = 0;
let n5ReviveSelfHookSet = false;
let n5FreezeAllEnabled = false;
let n5AntiKickEnabled = false;
let n5ItemRainEnabled = false;
let n5ItemRainDelay = 0;
let n5CloneSelfDelay = 0;
let n5NetMirrorClone = null;
let n5NetMirrorCloneGo = null;
let n5NetMirrorCloneTf = null;
let n5NetMirrorCloneEnabled = false;
let n5NetMirrorCloneOffset = 1.35;
let n5ServerNetClone = null;
let n5ServerNetCloneTf = null;
let n5ServerNetCloneEnabled = false;
let n5StrafeFlyEnabled = false;
let n5BlueprintFiles = [];
let n5BlueprintIndex = 0;
let n5BlueprintGunDelay = 0;
let n5GoopSpamDelay = 0;
let n5BlueprintQueue = [];

const N5_PRESET_SLOTS = 5;
const n5PresetSaveItems = Array.from({ length: N5_PRESET_SLOTS }, (_, i) => ({
  buttonText: "Save Slot " + (i + 1),
  isTogglable: false,
  enabled: false,
}));
const n5PresetLoadItems = Array.from({ length: N5_PRESET_SLOTS }, (_, i) => ({
  buttonText: "Load Slot " + (i + 1),
  isTogglable: false,
  enabled: false,
}));

function n5Hue2RGB(h) {
  const i = Math.floor(h * 6),
    f = h * 6 - i,
    q = 1 - f,
    t = f;
  switch (i % 6) {
    case 0:
      return [1, t, 0];
    case 1:
      return [q, 1, 0];
    case 2:
      return [0, 1, t];
    case 3:
      return [0, q, 1];
    case 4:
      return [t, 0, 1];
    case 5:
      return [1, 0, q];
  }
  return [1, 1, 1];
}

function n5UpdateTheme(dt) {
  n5PulsePhase += dt * 2.5;
  n5RainbowPhase += dt * 0.8;
  const k = n5ThemeKeys[n5ThemeIndex % n5ThemeKeys.length];
  const t = N5_THEMES[k];
  const p = t.pulse ? Math.sin(n5PulsePhase) * 0.5 + 0.5 : 1.0;
  if (k === "Rainbow") {
    const [r, g, b] = n5Hue2RGB(n5RainbowPhase % 1);
    textColor = [r, g, b, 1];
    gunColor = [r, g, b, 0.9];
    const [r2, g2, b2] = n5Hue2RGB((n5RainbowPhase + 0.5) % 1);
    bgColor = [r2 * 0.15, g2 * 0.15, b2 * 0.15, 0.92];
    buttonColor = [r2 * 0.22, g2 * 0.22, b2 * 0.22, 0.88];
    buttonPressedColor = [r2 * 0.8, g2 * 0.8, b2 * 0.8, 0.95];
  } else if (k === "Galaxy") {
    const s = Math.sin(n5RainbowPhase * 0.5);
    bgColor = [t.bg[0] + s * 0.02, t.bg[1], t.bg[2] + s * 0.04, t.bg[3]];
    buttonColor = [
      t.btn[0] + s * 0.04,
      t.btn[1],
      t.btn[2] + s * 0.08,
      t.btn[3],
    ];
    buttonPressedColor = [
      t.btnOn[0] * p,
      t.btnOn[1] * p,
      t.btnOn[2] * p,
      t.btnOn[3],
    ];
    textColor = [t.text[0] + s * 0.1, t.text[1], t.text[2] + s * 0.2, 1];
    gunColor = textColor.slice(0, 3).concat([0.9]);
  } else {
    if (k !== _n5LastThemeKey) {
      bgColor = t.bg.slice();
      buttonColor = t.btn.slice();
      textColor = t.text.slice();
      gunColor = t.gun.slice();
      _n5LastThemeKey = k;
    }
    const soft = 0.82 + p * 0.18;
    buttonPressedColor[0] = t.btnOn[0] * soft;
    buttonPressedColor[1] = t.btnOn[1] * soft;
    buttonPressedColor[2] = t.btnOn[2] * soft;
    buttonPressedColor[3] = t.btnOn[3];
  }
  menuscale = 0.9 * n5MenuScale;
  menuName = n5GetMenuName();

  const ap = 0.5 + 0.5 * Math.sin(n5PulsePhase * 1.5);
  n5AccentColor[0] = textColor[0] + ap * (1.0 - textColor[0]);
  n5AccentColor[1] = textColor[1] + ap * (1.0 - textColor[1]);
  n5AccentColor[2] = textColor[2] + ap * (1.0 - textColor[2]);
  n5AccentColor[3] = 1.0;

  if (itemIndex !== _n5LastItemIdx) {
    n5ItemDisplay.buttonText = ">>> ITEM: " + itemIDs[itemIndex];
    _n5LastItemIdx = itemIndex;
  }
  if (mobIndex !== _n5LastMobIdx) {
    n5MobDisplay.buttonText = ">>> MOB:  " + mobIDs[mobIndex];
    _n5LastMobIdx = mobIndex;
  }
  if (prefabIndex !== _n5LastPrefabIdx) {
    n5PrefabDisplay.buttonText = ">>> PREFAB: " + prefabList[prefabIndex];
    _n5LastPrefabIdx = prefabIndex;
  }
  if (vfxKeys && vfxKeys.length) {
    const vi = vfxIndex % vfxKeys.length;
    if (vi !== _n5LastVfxIdx) {
      n5VFXDisplay.buttonText =
        ">>> VFX: " +
        vfxKeys[vi] +
        " (0x" +
        VFXTypes[vfxKeys[vi]].toString(16) +
        ")";
      _n5LastVfxIdx = vi;
    }
  }
}

function n5PresetPath(slot) {
  return "/sdcard/N5Presets/preset_" + (slot + 1) + ".json";
}
function n5PresetExists(slot) {
  try {
    Java.perform(() => {});
    const f = Java.use("java.io.File").$new(n5PresetPath(slot));
    return f.exists();
  } catch (e) {
    return false;
  }
}
function n5SavePreset(slot) {
  try {
    Java.perform(function () {
      const File = Java.use("java.io.File");
      File.$new("/sdcard/N5Presets").mkdirs();
      const fw = Java.use("java.io.FileWriter").$new(n5PresetPath(slot), false);
      fw.write(
        JSON.stringify({
          itemIndex: itemIndex,
          mobIndex: mobIndex,
          prefabIndex: prefabIndex,
          theme: n5ThemeIndex,
          scale: n5MenuScale,
        }),
      );
      fw.flush();
      fw.close();
    });
    currentNotification = "Saved to Slot " + (slot + 1);
    notifactionResetTime = time + 3;
  } catch (e) {
    currentNotification = "Save failed: " + e;
    notifactionResetTime = time + 3;
  }
}
function n5LoadPreset(slot) {
  try {
    let loaded = null;
    Java.perform(function () {
      const File = Java.use("java.io.File");
      const f = File.$new(n5PresetPath(slot));
      if (!f.exists()) {
        currentNotification = "Slot " + (slot + 1) + " empty";
        notifactionResetTime = time + 3;
        return;
      }
      const sb = Java.use("java.lang.StringBuilder").$new();
      const br = Java.use("java.io.BufferedReader").$new(
        Java.use("java.io.FileReader").$new(f),
      );
      let line;
      while ((line = br.readLine()) !== null) sb.append(line);
      br.close();
      loaded = JSON.parse(sb.toString());
    });
    if (loaded) {
      itemIndex = loaded.itemIndex || 0;
      mobIndex = loaded.mobIndex || 0;
      prefabIndex = loaded.prefabIndex || 0;
      n5ThemeIndex =
        typeof loaded.theme === "number"
          ? loaded.theme
          : N5_DEFAULT_THEME_INDEX;
      n5MenuScale = loaded.scale || 1.0;
      currentNotification = "Loaded Slot " + (slot + 1);
      notifactionResetTime = time + 3;
    }
  } catch (e) {
    currentNotification = "Load failed: " + e;
    notifactionResetTime = time + 3;
  }
}

function n5GetLocalPlayer() {
  try {
    return NetPlayerCls.method("get_localPlayer").invoke();
  } catch (_e) {
    return null;
  }
}

function n5InstallGodModeHook() {
  if (n5GodModeHookSet) return true;
  try {
    let _n5MaxHealthSetter = null;
    let _n5NetPlayerCls = null;
    for (const _asm of Il2Cpp.domain.assemblies) {
      try {
        _n5NetPlayerCls = _asm.image.class("AnimalCompany.NetPlayer");
      } catch (_) {}
      if (_n5NetPlayerCls) break;
      try {
        _n5NetPlayerCls = _asm.image.class("NetPlayer");
      } catch (_) {}
      if (_n5NetPlayerCls) break;
    }
    if (_n5NetPlayerCls) {
      try {
        _n5MaxHealthSetter = _n5NetPlayerCls.method("set_maxHealth", 1);
      } catch (_) {}
    }
    if (!_n5MaxHealthSetter) {
      for (const _asm of Il2Cpp.domain.assemblies) {
        try {
          for (const _klass of _asm.image.classes) {
            try {
              const _m = _klass.method("set_maxHealth", 1);
              if (_m) {
                _n5MaxHealthSetter = _m;
                break;
              }
            } catch (_) {}
          }
        } catch (_) {}
        if (_n5MaxHealthSetter) break;
      }
    }
    if (!_n5MaxHealthSetter)
      throw new Error("set_maxHealth(StatePrimitive`1 value) not found");
    _n5MaxHealthSetter.implementation = function (_value) {
      try {
        if (n5GodModeEnabled) {
          try {
            if (this.method("get_IsMine").invoke()) return;
          } catch (_) {}
          try {
            if (this.method("get_isMine").invoke()) return;
          } catch (_) {}
          if (!_n5NetPlayerCls) return;
        }
      } catch (_) {}
      return this.method("set_maxHealth", 1).invoke(_value);
    };
    n5GodModeHookSet = true;
    return true;
  } catch (_e) {
    console.error("[N5 GodMode set_maxHealth hook]", _e);
    return false;
  }
}

function n5IsLocalPlayerController(_self) {
  try {
    const _pc = n5GetPlayerControllerInstance();
    return (
      _pc &&
      _self &&
      _pc.handle &&
      _self.handle &&
      _pc.handle.equals(_self.handle)
    );
  } catch (_) {}
  return true;
}

function n5InstallBetterGodModeHook() {
  if (n5BetterGodModeHookSet) return true;
  let _ok = false;
  try {
    const _pcCls = Il2Cpp.domain
      .assembly("AnimalCompany")
      .image.class("AnimalCompany.PlayerController");
    const _blockVoid = (_name, _argc) => {
      try {
        const _m = _pcCls.method(_name, _argc);
        _m.implementation = function () {
          if (
            (n5BetterGodModeEnabled || n5GodModeEnabled) &&
            n5IsLocalPlayerController(this)
          )
            return;
          return this.method(_name, _argc).invoke(...arguments);
        };
        _ok = true;
      } catch (_) {}
    };
    _blockVoid("PlayerHit", 6);
    _blockVoid("PlayerHit", 4);
    _blockVoid("PlayerStun", 4);
    _blockVoid("ForcePlayerStun", 2);
    _blockVoid("SubtractPlayerHealthButNotDie", 1);
    _blockVoid("SubtractPlayerHealth", 1);
    _blockVoid("Die", 0);
    _blockVoid("PlayerDie", 3);
    try {
      const _deathFx = _pcCls.method("PlayerDeathEffect");
      _deathFx.implementation = function () {
        if (
          (n5BetterGodModeEnabled || n5GodModeEnabled) &&
          n5IsLocalPlayerController(this)
        )
          return;
        return this.method("PlayerDeathEffect").invoke();
      };
      _ok = true;
    } catch (_) {}
  } catch (_e) {
    console.error("[N5 BetterGodMode PlayerController]", _e);
  }
  try {
    const _npCls = Il2Cpp.domain
      .assembly("AnimalCompany")
      .image.class("AnimalCompany.NetPlayer");
    const _hook = (_name, _argc) => {
      try {
        const _m = _npCls.method(_name, _argc);
        _m.implementation = function () {
          if (n5BetterGodModeEnabled || n5GodModeEnabled) {
            try {
              if (this.method("get_IsMine").invoke()) return;
            } catch (_) {}
            try {
              if (this.method("get_isMine").invoke()) return;
            } catch (_) {}
          }
          return this.method(_name, _argc).invoke(...arguments);
        };
        _ok = true;
      } catch (_) {}
    };
    _hook("RPC_PlayerHit", 3);
    _hook("RPC_PlayerHit", 6);
    _hook("RPC_PlayerStun", 4);
    try {
      const _rpcDie = _npCls.method("RPC_DoPlayerDie", 1);
      _rpcDie.implementation = function (isDie) {
        if ((n5BetterGodModeEnabled || n5GodModeEnabled) && isDie) {
          try {
            this.method("set_isDie").invoke(false);
          } catch (_) {}
          try {
            n5ReviveSelf();
          } catch (_) {}
          return;
        }
        return this.method("RPC_DoPlayerDie", 1).invoke(isDie);
      };
      _ok = true;
    } catch (_) {}
  } catch (_e2) {
    console.error("[N5 BetterGodMode NetPlayer]", _e2);
  }
  n5BetterGodModeHookSet = _ok;
  return _ok;
}

function n5KeepAliveSelf() {
  try {
    const _pc = n5GetPlayerControllerInstance();
    if (_pc && !_pc.handle.isNull()) {
      try {
        _pc.field("_isDie").value = false;
      } catch (_) {}
      try {
        _pc.field("_isInvincible").value = true;
      } catch (_) {}
      try {
        _pc.field("_maxHealth").value = 100;
      } catch (_) {}
      try {
        _pc.field("<healthLost>k__BackingField").value = 0;
      } catch (_) {}
      try {
        _pc.method("AddPlayerHealth").invoke(999);
      } catch (_) {}
      try {
        if (_pc.method("get_isDead").invoke()) n5ReviveSelf();
      } catch (_) {}
    }
  } catch (_) {}
  try {
    const _lp = n5GetLocalNetPlayerSafe();
    if (_lp && !_lp.handle.isNull()) {
      try {
        _lp.method("set_isDie").invoke(false);
      } catch (_) {}
      try {
        _lp.method("set_isInvincible").invoke(true);
      } catch (_) {}
    }
  } catch (_) {}
}

function n5SetFullbrightAmbient(_value) {
  try {
    const RenderSettings = Il2Cpp.domain
      .assembly("UnityEngine.CoreModule")
      .image.class("UnityEngine.RenderSettings");
    const _floatValue = Il2Cpp.floating ? Il2Cpp.floating(_value) : _value;
    const _apply = () => {
      try {
        RenderSettings.method("set_fog").invoke(false);
      } catch (_) {}
      try {
        RenderSettings.method("set_fogDensity").invoke(0.0);
      } catch (_) {}
      try {
        RenderSettings.method("set_reflectionIntensity").invoke(_floatValue);
      } catch (_) {}
      try {
        const _colorCls = Il2Cpp.domain
          .assembly("UnityEngine.CoreModule")
          .image.class("UnityEngine.Color");
        RenderSettings.method("set_ambientLight").invoke(
          _colorCls.method("get_white").invoke(),
        );
        return;
      } catch (_) {}
      try {
        RenderSettings.method("set_ambientLight").invoke([
          _value,
          _value,
          _value,
          1.0,
        ]);
      } catch (_) {}
    };
    try {
      if (Il2Cpp.scheduleOnThread)
        return Il2Cpp.scheduleOnThread(function () {
          try {
            _apply();
          } catch (_) {}
        });
    } catch (_) {}
    _apply();
  } catch (_e) {
    console.error("[N5 Fullbright ambient]", _e);
  }
}

function n5InstallFullbrightHook() {
  if (n5FullbrightHookSet) return true;
  try {
    const EnvLightingUtils = Il2Cpp.domain
      .assembly("AnimalCompany")
      .image.class("AnimalCompany.EnvironmentLightingUtils");
    const _envLighting = EnvLightingUtils.method(
      "TryGetEnvironmentVolumeLighting",
    );
    _envLighting.implementation = function (
      position,
      mainLightIntensity,
      spookiness,
    ) {
      if (n5FullbrightEnabled) return false;
      return this.method("TryGetEnvironmentVolumeLighting").invoke(
        position,
        mainLightIntensity,
        spookiness,
      );
    };
    const _objLighting = EnvLightingUtils.method("TryGetObjectLighting");
    _objLighting.implementation = function (
      position,
      normal,
      meshRenderer,
      mainLightIntensity,
      spookiness,
      indirectLuminance,
    ) {
      if (n5FullbrightEnabled) return false;
      return this.method("TryGetObjectLighting").invoke(
        position,
        normal,
        meshRenderer,
        mainLightIntensity,
        spookiness,
        indirectLuminance,
      );
    };
    try {
      const _indirect = EnvLightingUtils.method("GetIndirectLuminance");
      _indirect.implementation = function (position, normal, meshRenderer) {
        if (n5FullbrightEnabled) return 1.0;
        return this.method("GetIndirectLuminance").invoke(
          position,
          normal,
          meshRenderer,
        );
      };
    } catch (_) {}
    n5FullbrightHookSet = true;
    return true;
  } catch (_e) {
    console.error("[N5 Fullbright hook]", _e);
    return false;
  }
}

function n5GetPlayerControllerInstance() {
  try {
    const _pcCls = Il2Cpp.domain
      .assembly("AnimalCompany")
      .image.class("AnimalCompany.PlayerController");
    return _pcCls.method("get_instance").invoke();
  } catch (_e) {
    return null;
  }
}

function n5GetLocalNetPlayerSafe() {
  try {
    const _npCls = Il2Cpp.domain
      .assembly("AnimalCompany")
      .image.class("AnimalCompany.NetPlayer");
    return _npCls.method("get_localPlayer").invoke();
  } catch (_e) {}
  try {
    return n5GetLocalPlayer();
  } catch (_) {}
  return null;
}

function n5NullOrDead(_o) {
  try {
    return (
      !_o ||
      (_o.handle && _o.handle.isNull && _o.handle.isNull()) ||
      (_o.isNull && _o.isNull())
    );
  } catch (_) {}
  return !_o;
}

function n5GetGameObject(_o) {
  try {
    return _o.method("get_gameObject").invoke();
  } catch (_) {}
  return null;
}

function n5SetObjEnabled(_o, _v) {
  try {
    _o.method("set_enabled").invoke(!!_v);
    return true;
  } catch (_) {}
  try {
    _o.field("enabled").value = !!_v;
    return true;
  } catch (_) {}
  return false;
}

function n5DestroyNetMirrorClone() {
  try {
    if (!n5NullOrDead(n5NetMirrorCloneGo))
      UnityObjectCls.method("Destroy", 1).invoke(n5NetMirrorCloneGo);
  } catch (_e) {
    console.error("[N5 MirrorClone destroy]", _e);
  }
  n5NetMirrorClone = null;
  n5NetMirrorCloneGo = null;
  n5NetMirrorCloneTf = null;
}

function n5InstantiateGameObject(_srcGo) {
  try {
    return UnityObjectCls.method("Instantiate", 1)
      .inflate(GameObjectCls)
      .invoke(_srcGo);
  } catch (_) {}
  try {
    return UnityObjectCls.method("Instantiate", 1).invoke(_srcGo);
  } catch (_) {}
  try {
    const _pos = getTransform(_srcGo).method("get_position").invoke();
    const _rot = getTransform(_srcGo).method("get_rotation").invoke();
    return UnityObjectCls.method("Instantiate", 3)
      .inflate(GameObjectCls)
      .invoke(_srcGo, _pos, _rot);
  } catch (_) {}
  try {
    const _pos = getTransform(_srcGo).method("get_position").invoke();
    const _rot = getTransform(_srcGo).method("get_rotation").invoke();
    return UnityObjectCls.method("Instantiate", 3).invoke(_srcGo, _pos, _rot);
  } catch (_) {}
  return null;
}

function n5GetComponentByName(_go, _className) {
  try {
    const _cls = Il2Cpp.domain
      .assembly("AnimalCompany")
      .image.class(_className);
    return _go.method("GetComponent", 1).inflate(_cls).invoke();
  } catch (_) {}
  try {
    const _cls = Il2Cpp.domain
      .assembly("PhotonVoice.Fusion")
      .image.class(_className);
    return _go.method("GetComponent", 1).inflate(_cls).invoke();
  } catch (_) {}
  try {
    const _cls = Il2Cpp.domain
      .assembly("Fusion.Runtime")
      .image.class(_className);
    return _go.method("GetComponent", 1).inflate(_cls).invoke();
  } catch (_) {}
  return null;
}

function n5TfmPosWithOffset(_tf, _xoff) {
  try {
    const _p = _tf.method("get_position").invoke();
    return [Number(_p[0] || 0) + _xoff, Number(_p[1] || 0), Number(_p[2] || 0)];
  } catch (_) {}
  return null;
}

function n5PositionBesideSelf(_xoff) {
  try {
    const _lp = n5GetLocalNetPlayerSafe();
    if (!n5NullOrDead(_lp)) {
      const _tf = getTransform(_lp);
      const _p = n5TfmPosWithOffset(_tf, _xoff);
      if (_p) return _p;
    }
  } catch (_) {}
  try {
    const _p = n5GetSafeSelfPosition();
    if (_p)
      return [
        Number(_p[0] || 0) + _xoff,
        Number(_p[1] || 0),
        Number(_p[2] || 0),
      ];
  } catch (_) {}
  return [_xoff, 0, 0];
}

function n5MirrorTransformTree(
  _srcTf,
  _dstTf,
  _xoff,
  _depth = 0,
  _budget = { n: 0 },
) {
  if (!_srcTf || !_dstTf || _depth > 9 || _budget.n > 260) return;
  _budget.n++;
  try {
    const _p = n5TfmPosWithOffset(_srcTf, _xoff);
    if (_p) _dstTf.method("set_position").invoke(_p);
  } catch (_) {}
  try {
    _dstTf
      .method("set_rotation")
      .invoke(_srcTf.method("get_rotation").invoke());
  } catch (_) {}
  try {
    _dstTf
      .method("set_localScale")
      .invoke(_srcTf.method("get_localScale").invoke());
  } catch (_) {}
  let _c = 0,
    _dc = 0;
  try {
    _c = _srcTf.method("get_childCount").invoke() | 0;
  } catch (_) {}
  try {
    _dc = _dstTf.method("get_childCount").invoke() | 0;
  } catch (_) {}
  const _lim = Math.min(_c, _dc, 64);
  for (let _i = 0; _i < _lim; _i++) {
    try {
      const _s = _srcTf.method("GetChild", 1).invoke(_i);
      const _d = _dstTf.method("GetChild", 1).invoke(_i);
      n5MirrorTransformTree(_s, _d, _xoff, _depth + 1, _budget);
    } catch (_) {}
  }
}

function n5StopServerNetPlayerClone() {
  try {
    if (n5ServerNetClone) n5DespawnPrefabObj(n5ServerNetClone);
  } catch (_) {}
  n5ServerNetClone = null;
  n5ServerNetCloneTf = null;
  n5ServerNetCloneEnabled = false;
}

function n5SpawnServerNetPlayerClone() {
  try {
    if (time < n5CloneSelfDelay) {
      currentNotification = "Clone cooldown";
      notifactionResetTime = time + 1;
      return false;
    }
    n5CloneSelfDelay = time + 1.5;
    const _src = n5GetLocalNetPlayerSafe();
    const _pos = n5PositionBesideSelf(n5NetMirrorCloneOffset);
    let _rot = identityRotation;
    try {
      if (!n5NullOrDead(_src))
        _rot = getTransform(_src).method("get_rotation").invoke();
    } catch (_) {}
    const _obj = spawnNetworkPrefab("NetPlayer", _pos, _rot);
    if (!_obj || (_obj.handle && _obj.handle.isNull && _obj.handle.isNull())) {
      currentNotification = "Server NetPlayer spawn failed";
      notifactionResetTime = time + 2;
      return false;
    }
    n5ServerNetClone = _obj;
    n5ServerNetCloneTf = n5GetSpawnedObjectTransform(_obj);
    try {
      if (n5ServerNetCloneTf)
        n5ServerNetCloneTf.method("set_position").invoke(_pos);
    } catch (_) {}
    try {
      n5DisablePrefabCollisions(_obj);
    } catch (_) {}
    currentNotification = "Server NetPlayer clone spawned beside you";
    notifactionResetTime = time + 2;
    return true;
  } catch (_e) {
    console.error("[N5 ServerNetClone spawn]", _e);
    currentNotification = "Server clone error";
    notifactionResetTime = time + 2;
  }
  return false;
}

function n5UpdateServerNetPlayerClone() {
  if (!n5ServerNetCloneEnabled) return;
  try {
    if (!n5ServerNetClone || n5NullOrDead(n5ServerNetClone)) {
      n5ServerNetClone = null;
      n5ServerNetCloneTf = null;
      n5SpawnServerNetPlayerClone();
      return;
    }
    if (!n5ServerNetCloneTf)
      n5ServerNetCloneTf = n5GetSpawnedObjectTransform(n5ServerNetClone);
    if (!n5ServerNetCloneTf) return;
    const _src = n5GetLocalNetPlayerSafe();
    const _pos = n5PositionBesideSelf(n5NetMirrorCloneOffset);
    try {
      n5ServerNetCloneTf.method("set_position").invoke(_pos);
    } catch (_) {}
    try {
      if (!n5NullOrDead(_src))
        n5ServerNetCloneTf
          .method("set_rotation")
          .invoke(getTransform(_src).method("get_rotation").invoke());
    } catch (_) {}
  } catch (_e) {
    console.error("[N5 ServerNetClone update]", _e);
  }
}

function n5MirrorCloneVoiceState(_src, _clone) {
  try {
    _clone.field("<voiceVolume>k__BackingField").value = _src.field(
      "<voiceVolume>k__BackingField",
    ).value;
  } catch (_) {}
  try {
    _clone.field("_voiceFalloffDistance").value = _src.field(
      "_voiceFalloffDistance",
    ).value;
  } catch (_) {}
  try {
    _clone.field("_scaledVoiceFalloffDistance").value = _src.field(
      "_scaledVoiceFalloffDistance",
    ).value;
  } catch (_) {}
  try {
    _clone.field("_specialVoice").value = _src.field("_specialVoice").value;
  } catch (_) {}
  try {
    _clone.field("voiceNetworkObject").value =
      _src.field("voiceNetworkObject").value;
  } catch (_) {}
  try {
    _clone.field("_recorder").value = _src.field("_recorder").value;
  } catch (_) {}
  try {
    _clone.field("_speaker").value = _src.field("_speaker").value;
  } catch (_) {}
  try {
    const _srcVoice = _src.field("voiceNetworkObject").value;
    const _cloneVoice = _clone.field("voiceNetworkObject").value;
    if (
      _srcVoice &&
      _cloneVoice &&
      !n5NullOrDead(_srcVoice) &&
      !n5NullOrDead(_cloneVoice)
    ) {
      try {
        _cloneVoice.field("<RecorderInUse>k__BackingField").value = _srcVoice
          .method("get_RecorderInUse")
          .invoke();
      } catch (_) {}
      try {
        _cloneVoice.field("<SpeakerInUse>k__BackingField").value = _srcVoice
          .method("get_SpeakerInUse")
          .invoke();
      } catch (_) {}
    }
  } catch (_) {}
}

function n5CreateNetMirrorClone() {
  try {
    const _src = n5GetLocalNetPlayerSafe();
    if (n5NullOrDead(_src)) {
      currentNotification = "No local NetPlayer yet";
      notifactionResetTime = time + 2;
      return false;
    }
    const _srcGo = n5GetGameObject(_src);
    if (n5NullOrDead(_srcGo)) {
      currentNotification = "Local NetPlayer GO missing";
      notifactionResetTime = time + 2;
      return false;
    }
    n5DestroyNetMirrorClone();
    const _cloneGo = n5InstantiateGameObject(_srcGo);
    if (n5NullOrDead(_cloneGo)) {
      currentNotification = "NetPlayer clone failed";
      notifactionResetTime = time + 2;
      return false;
    }
    n5NetMirrorCloneGo = _cloneGo;
    try {
      _cloneGo
        .method("set_name")
        .invoke(Il2Cpp.string("N5 Full NetPlayer Mirror Clone"));
    } catch (_) {}
    try {
      _cloneGo.method("SetActive").invoke(true);
    } catch (_) {}
    n5NetMirrorCloneTf = getTransform(_cloneGo);
    n5NetMirrorClone = n5GetComponentByName(
      _cloneGo,
      "AnimalCompany.NetPlayer",
    );
    if (n5NullOrDead(n5NetMirrorClone))
      n5NetMirrorClone = n5GetComponentByName(_cloneGo, "NetPlayer");
    n5MirrorCloneVoiceState(_src, n5NetMirrorClone || _src);
    for (const _name of [
      "Fusion.NetworkObject",
      "Fusion.NetworkTransform",
      "Fusion.NetworkRigidbody",
      "Photon.Voice.Fusion.VoiceNetworkObject",
    ]) {
      try {
        const _c = n5GetComponentByName(_cloneGo, _name);
        if (_c && !n5NullOrDead(_c)) n5SetObjEnabled(_c, false);
      } catch (_) {}
    }
    try {
      n5MirrorTransformTree(
        getTransform(_src),
        n5NetMirrorCloneTf,
        n5NetMirrorCloneOffset,
      );
    } catch (_) {}
    return true;
  } catch (_e) {
    console.error("[N5 MirrorClone create]", _e);
  }
  return false;
}

function n5UpdateNetMirrorClone() {
  if (!n5NetMirrorCloneEnabled) return;
  try {
    const _src = n5GetLocalNetPlayerSafe();
    if (n5NullOrDead(_src)) return;
    if (n5NullOrDead(n5NetMirrorCloneGo) || n5NullOrDead(n5NetMirrorCloneTf)) {
      if (time < n5CloneSelfDelay) return;
      n5CloneSelfDelay = time + 1.5;
      n5CreateNetMirrorClone();
      return;
    }
    n5MirrorTransformTree(
      getTransform(_src),
      n5NetMirrorCloneTf,
      n5NetMirrorCloneOffset,
    );
    if (n5NetMirrorClone && !n5NullOrDead(n5NetMirrorClone))
      n5MirrorCloneVoiceState(_src, n5NetMirrorClone);
  } catch (_e) {
    console.error("[N5 MirrorClone update]", _e);
  }
}

function n5IsSelfDead() {
  try {
    const _pc = n5GetPlayerControllerInstance();
    if (_pc && !_pc.handle.isNull()) return !!_pc.method("get_isDead").invoke();
  } catch (_) {}
  try {
    const _lp = n5GetLocalNetPlayerSafe();
    if (_lp && !_lp.handle.isNull()) return !!_lp.method("get_isDie").invoke();
  } catch (_) {}
  return false;
}

function n5VecNum(_p, _i, _f) {
  try {
    let _v = _p[_i];
    if ((_v === undefined || _v === null) && _p.field) _v = _p.field(_f).value;
    return Number(_v || 0);
  } catch (_) {
    return 0;
  }
}

function n5IsGoodPosition(_p) {
  try {
    if (!_p) return false;
    const _x = n5VecNum(_p, 0, "x"),
      _y = n5VecNum(_p, 1, "y"),
      _z = n5VecNum(_p, 2, "z");
    if (!isFinite(_x) || !isFinite(_y) || !isFinite(_z)) return false;
    if (Math.abs(_x) + Math.abs(_y) + Math.abs(_z) < 0.01) return false;
    if (Math.abs(_x) > 100000 || Math.abs(_y) > 100000 || Math.abs(_z) > 100000)
      return false;
    return true;
  } catch (_) {
    return false;
  }
}

function n5GetSafeSelfPosition() {
  try {
    const _p = getTransform(headCollider).method("get_position").invoke();
    if (n5IsGoodPosition(_p)) return _p;
  } catch (_) {}
  try {
    const _pc = n5GetPlayerControllerInstance();
    if (_pc && !_pc.handle.isNull()) {
      const _p = getTransform(_pc).method("get_position").invoke();
      if (n5IsGoodPosition(_p)) return _p;
    }
  } catch (_) {}
  try {
    const _lp = n5GetLocalNetPlayerSafe();
    if (_lp && !_lp.handle.isNull()) {
      const _p = getTransform(_lp).method("get_position").invoke();
      if (n5IsGoodPosition(_p)) return _p;
    }
  } catch (_) {}
  try {
    const _p = rightHandTransform.method("get_position").invoke();
    if (n5IsGoodPosition(_p)) return _p;
  } catch (_) {}
  return null;
}

function n5RestoreSelfPosition(_pos) {
  if (!n5IsGoodPosition(_pos)) return false;
  let _ok = false;
  try {
    const _pc = n5GetPlayerControllerInstance();
    if (_pc && !_pc.handle.isNull()) {
      try {
        getTransform(_pc).method("set_position").invoke(_pos);
        _ok = true;
      } catch (_) {}
    }
  } catch (_) {}
  try {
    const _lp = n5GetLocalNetPlayerSafe();
    if (_lp && !_lp.handle.isNull()) {
      try {
        getTransform(_lp).method("set_position").invoke(_pos);
        _ok = true;
      } catch (_) {}
    }
  } catch (_) {}
  return _ok;
}

function n5InstallReviveSelfHook() {
  if (n5ReviveSelfHookSet) return true;
  let _ok = false;
  try {
    const _pcCls = Il2Cpp.domain
      .assembly("AnimalCompany")
      .image.class("AnimalCompany.PlayerController");
    try {
      const _die = _pcCls.method("Die");
      _die.implementation = function () {
        if (n5AutoReviveSelfEnabled) {
          try {
            n5ReviveSelf();
          } catch (_) {}
          return;
        }
        return this.method("Die").invoke();
      };
      _ok = true;
    } catch (_) {}
    try {
      const _playerDie = _pcCls.method("PlayerDie");
      _playerDie.implementation = function (
        killSound,
        hitName,
        fromKillTrigger,
      ) {
        if (n5AutoReviveSelfEnabled) {
          try {
            n5ReviveSelf();
          } catch (_) {}
          return;
        }
        return this.method("PlayerDie").invoke(
          killSound,
          hitName,
          fromKillTrigger,
        );
      };
      _ok = true;
    } catch (_) {}
  } catch (_e) {
    console.error("[N5 Revive hook PlayerController]", _e);
  }
  try {
    const _npCls = Il2Cpp.domain
      .assembly("AnimalCompany")
      .image.class("AnimalCompany.NetPlayer");
    const _rpcDie = _npCls.method("RPC_DoPlayerDie");
    _rpcDie.implementation = function (isDie) {
      if (n5AutoReviveSelfEnabled && isDie) {
        try {
          this.method("set_isDie").invoke(false);
        } catch (_) {}
        try {
          n5ReviveSelf();
        } catch (_) {}
        return this.method("RPC_DoPlayerDie").invoke(false);
      }
      return this.method("RPC_DoPlayerDie").invoke(isDie);
    };
    _ok = true;
  } catch (_e2) {
    console.error("[N5 Revive hook NetPlayer]", _e2);
  }
  n5ReviveSelfHookSet = _ok;
  return _ok;
}

function n5ReviveSelf() {
  let _ok = false;
  const _keepPos = n5GetSafeSelfPosition();
  try {
    const _pc = n5GetPlayerControllerInstance();
    if (_pc && !_pc.handle.isNull()) {
      try {
        _pc.method("CancelReviveInvincibility").invoke();
      } catch (_) {}
      try {
        _pc.method("RealiveWithHealth").invoke(100);
        _ok = true;
      } catch (_) {}
      try {
        _pc.method("Revive").invoke();
        _ok = true;
      } catch (_) {}
      try {
        _pc.method("AddPlayerHealth").invoke(999);
      } catch (_) {}
      try {
        _pc.field("_isDie").value = false;
        _ok = true;
      } catch (_) {}
      try {
        _pc.field("_isInvincible").value = true;
      } catch (_) {}
      try {
        _pc.field("_maxHealth").value = 100;
      } catch (_) {}
      try {
        _pc.field("<healthLost>k__BackingField").value = 0;
      } catch (_) {}
      try {
        _pc.field("<healthHealed>k__BackingField").value = 100;
      } catch (_) {}
      try {
        _pc.method("UpdateReviving").invoke(false);
      } catch (_) {}
      try {
        _pc.field("_deathCoroutine").value = null;
      } catch (_) {}
      try {
        n5RestoreSelfPosition(_keepPos);
      } catch (_) {}
    }
  } catch (_e) {
    console.error("[N5 ReviveSelf PlayerController]", _e);
  }
  try {
    const _lp = n5GetLocalNetPlayerSafe();
    if (_lp && !_lp.handle.isNull()) {
      try {
        _lp.method("set_isDie").invoke(false);
        _ok = true;
      } catch (_) {}
      try {
        _lp.method("set_isInvincible").invoke(true);
      } catch (_) {}
      try {
        _lp.method("set_isControllingBody").invoke(true);
      } catch (_) {}
      try {
        _lp.method("HandleLocalPlayerDie").invoke(false);
      } catch (_) {}
      try {
        _lp.method("RPC_DoPlayerDie").invoke(false);
        _ok = true;
      } catch (_) {}
      try {
        n5RestoreSelfPosition(_keepPos);
      } catch (_) {}
    }
  } catch (_e2) {
    console.error("[N5 ReviveSelf NetPlayer]", _e2);
  }
  if (_ok) {
    try {
      currentNotification = "Revive Self sent";
      notifactionResetTime = time + 2;
    } catch (_) {}
  }
  return _ok;
}

function n5ReviveFullHealth() {
  const _ok = n5ReviveSelf();
  try {
    const _pc = n5GetPlayerControllerInstance();
    if (_pc && !_pc.handle.isNull()) {
      try {
        _pc.method("RealiveWithHealth").invoke(100);
      } catch (_) {}
      try {
        _pc.method("AddPlayerHealth").invoke(999);
      } catch (_) {}
      try {
        _pc.field("_maxHealth").value = 100;
      } catch (_) {}
      try {
        _pc.field("<healthLost>k__BackingField").value = 0;
      } catch (_) {}
      try {
        _pc.field("<healthHealed>k__BackingField").value = 100;
      } catch (_) {}
      try {
        _pc.field("_isInvincible").value = true;
      } catch (_) {}
    }
  } catch (_e) {
    console.error("[N5 ReviveFullHealth]", _e);
  }
  try {
    currentNotification = _ok
      ? "Revived full health"
      : "Revive full health sent";
    notifactionResetTime = time + 2;
  } catch (_) {}
  return true;
}

function n5GetLocalPosition() {
  try {
    const _safe = n5GetSafeSelfPosition();
    if (n5IsGoodPosition(_safe)) return _safe;
  } catch (_) {}
  const _lp = n5GetLocalPlayer();
  if (!_lp || _lp.handle.isNull()) return null;
  return getTransform(_lp).method("get_position").invoke();
}

const n5MobIdByName = {
  Unidentified: 0,
  Angler: 1,
  AnglerController: 1,
  AnglerMad: 2,
  AnglerMadController: 2,
  Armstrong: 3,
  ArmstrongController: 3,
  ArmstrongMad: 4,
  ArmstrongMadController: 4,
  Banshee: 5,
  BansheeController: 5,
  Bomb: 6,
  BombController: 6,
  Bomber: 7,
  BomberController: 7,
  BomberFlashbang: 8,
  BomberFlashbangController: 8,
  BomberMad: 9,
  BomberMadController: 9,
  Chicken: 10,
  ChickenController: 10,
  Cyst: 11,
  CystController: 11,
  FakeGorilla: 12,
  FakeGorillaController: 12,
  BigHead: 13,
  BigHeadController: 13,
  RedGreen: 14,
  RedGreenController: 14,
  Phantom: 15,
  PhantomController: 15,
  EvilEye: 16,
  EvilEyeController: 16,
  GiantThrower: 17,
  GiantThrowerController: 17,
  RedGreenMad: 18,
  RedGreenMadController: 18,
  Spider: 19,
  SpiderController: 19,
  FlyingSwarm: 20,
  FlyingSwarmController: 20,
  NextBot: 21,
  NextBotController: 21,
  Segway: 22,
  SegwayController: 22,
  NextBotStatic: 23,
  NextBotStaticController: 23,
  EvilEyePinata: 24,
  EvilEyePinataController: 24,
  EvilEyePinataLarge: 25,
  EvilEyePinataLargeController: 25,
  Lanky: 26,
  LankyController: 26,
  Blob: 27,
  BlobController: 27,
  Cutie: 28,
  CutieController: 28,
  SpiderCave: 29,
  SpiderCaveController: 29,
  ForestMob: 30,
  ForestMobController: 30,
  Mimic: 31,
  MimicController: 31,
  GraveyardBoss: 32,
  GraveyardBossController: 32,
  GiantController_GraveyardBoss: 32,
  Ringmaster: 33,
  RingmasterController: 33,
  Puppet: 34,
  PuppetController: 34,
  PolypMass: 35,
  PolypMassController: 35,
  RobotDog: 36,
  RobotDogController: 36,
  Shadow: 37,
  ShadowController: 37,
  Heart: 38,
  HeartController: 38,
  HeartMobController: 38,
  Slimey: 39,
  SlimeyController: 39,
  ShadowBoss: 40,
  ShadowBossController: 40,
  BigShark: 41,
  BigSharkController: 41,
  EdenZombie: 42,
  EdenZombieController: 42,
  Skinwalker: 43,
  SkinwalkerController: 43,
  YinWorm: 44,
  YinWormController: 44,
  YangWorm: 45,
  YangWormController: 45,
  ArmstrongSpace: 46,
  Smiley: 47,
};
const n5MobNameById = {
  0: "Unidentified",
  1: "Angler",
  2: "AnglerMad",
  3: "Armstrong",
  4: "ArmstrongMad",
  5: "Banshee",
  6: "Bomb",
  7: "Bomber",
  8: "BomberFlashbang",
  9: "BomberMad",
  10: "Chicken",
  11: "Cyst",
  12: "FakeGorilla",
  13: "BigHead",
  14: "RedGreen",
  15: "Phantom",
  16: "EvilEye",
  17: "GiantThrower",
  18: "RedGreenMad",
  19: "Spider",
  20: "FlyingSwarm",
  21: "NextBot",
  22: "Segway",
  23: "NextBotStatic",
  24: "EvilEyePinata",
  25: "EvilEyePinataLarge",
  26: "Lanky",
  27: "Blob",
  28: "Cutie",
  29: "SpiderCave",
  30: "ForestMob",
  31: "Mimic",
  32: "GraveyardBoss",
  33: "Ringmaster",
  34: "Puppet",
  35: "PolypMass",
  36: "RobotDog",
  37: "Shadow",
  38: "Heart",
  39: "Slimey",
  40: "ShadowBoss",
  41: "BigShark",
  42: "EdenZombie",
  43: "Skinwalker",
  44: "YinWorm",
  45: "YangWorm",
  46: "ArmstrongSpace",
  47: "Smiley",
};
const n5MobAliases = {
  GiantController: "GiantThrower",
  GiantGreenController: "GiantThrower",
  Giant_GreenController: "GiantThrower",
  GreenGiantController: "GiantThrower",
  Green_GiantController: "GiantThrower",
  YanWormController: "YangWorm",
  YingWormController: "YinWorm",
  YinYanWormController: "YinWorm",
  YingYangWormController: "YinWorm",
  PrototypeSlenderController: "Shadow",
  SlenderMonster: "Shadow",
  ArmstrongControllerSpace: "ArmstrongSpace",
  ArmstrongSpaceController: "ArmstrongSpace",
  SmileyController: "Smiley",
};
function n5AnimalCompanyImage() {
  return Il2Cpp.domain.assembly("AnimalCompany").image;
}
function n5GetMobEnumField(_name) {
  try {
    const _mobIdClass = n5AnimalCompanyImage().class("AnimalCompany.MobID");
    return _mobIdClass.field(_name).value;
  } catch (_) {}
  return null;
}
function n5ResolveMobID(_mobId) {
  if (typeof _mobId === "number") {
    const _enumName = n5MobNameById[_mobId | 0];
    return _enumName ? n5GetMobEnumField(_enumName) : null;
  }
  const _name = String(_mobId || "").replace(/^mob_prefab\//, "");
  const _trimmed = _name
    .replace(/Controller$/, "")
    .replace(/_?Controller$/, "");
  const _candidates = [
    _name,
    n5MobAliases[_name],
    _trimmed,
    n5MobAliases[_trimmed],
  ].filter(Boolean);
  for (const _candidate of _candidates) {
    const _enumVal = n5GetMobEnumField(_candidate);
    if (_enumVal !== null) return _enumVal;
    if (Object.prototype.hasOwnProperty.call(n5MobIdByName, _candidate)) {
      const _enumName = n5MobNameById[n5MobIdByName[_candidate] | 0];
      const _mapped = _enumName ? n5GetMobEnumField(_enumName) : null;
      if (_mapped !== null) return _mapped;
    }
  }
  return null;
}
let n5MobValidatorBypassEnabled = false,
  n5MobPersistenceHooksInstalled = false,
  n5SpawnGuardBypassEnabled = false,
  n5BeforeMobSpawnDelegate = null,
  n5BeforeMobSpawnDelegateClass = null;
const n5ProtectedMobIds = new Set();
function n5NetworkIdKey(_networkId) {
  if (_networkId === null || _networkId === undefined) return "";
  try {
    const _raw = _networkId.field("Raw").value;
    if (_raw !== undefined) return String(_raw);
  } catch (_) {}
  try {
    const _raw = _networkId.field("_raw").value;
    if (_raw !== undefined) return String(_raw);
  } catch (_) {}
  try {
    return String(_networkId.toString());
  } catch (_) {}
  return String(_networkId);
}
function n5GetBehaviourNetworkIdKey(_behaviour) {
  try {
    const _object = _behaviour.method("get_Object").invoke();
    if (!_object || (_object.handle && _object.handle.isNull())) return "";
    return n5NetworkIdKey(_object.method("get_Id").invoke());
  } catch (_) {}
  return "";
}
function n5IsProtectedMobBehaviour(_behaviour) {
  const _key = n5GetBehaviourNetworkIdKey(_behaviour);
  return !!_key && n5ProtectedMobIds.has(_key);
}
function n5InstallMobPersistenceHooks() {
  if (n5MobPersistenceHooksInstalled) return;
  try {
    const _mobCls = n5AnimalCompanyImage().class("AnimalCompany.MobController");
    for (const _methodName of ["RequestDespawn"]) {
      try {
        _mobCls.method(_methodName).implementation = function () {
          if (n5IsProtectedMobBehaviour(this)) {
            try {
              this.method("set_n_isDie").invoke(false);
            } catch (_) {}
            try {
              this.method("set_n_deathAction").invoke(0);
            } catch (_) {}
            try {
              this.field("_isDieLocal").value = false;
            } catch (_) {}
            return;
          }
          return this.method(_methodName).invoke();
        };
      } catch (_) {}
    }
    try {
      _mobCls.method("HandleLocalWithinActiveRangeChanged", 1).implementation =
        function (_isWithin) {
          if (n5IsProtectedMobBehaviour(this) && !_isWithin) return;
          return this.method("HandleLocalWithinActiveRangeChanged", 1).invoke(
            _isWithin,
          );
        };
    } catch (_) {}
    const _aoiCls = n5AnimalCompanyImage().class(
      "AnimalCompany.AutoAOIStateAuthHandler",
    );
    for (const _methodName of [
      "RequestDespawn",
      "RPC_RequestDespawn",
      "DespawnInternal",
    ]) {
      try {
        _aoiCls.method(_methodName).implementation = function () {
          if (n5IsProtectedMobBehaviour(this)) {
            try {
              this.field("_despawnRequested").value = false;
            } catch (_) {}
            try {
              this.method("set_n_despawnRequested").invoke(false);
            } catch (_) {}
            try {
              this.field("_deactivateOnInterestExit").value = false;
            } catch (_) {}
            return;
          }
          return this.method(_methodName).invoke();
        };
      } catch (_) {}
    }
    try {
      _aoiCls.method("InterestExit", 1).implementation = function (_player) {
        if (n5IsProtectedMobBehaviour(this)) return;
        return this.method("InterestExit", 1).invoke(_player);
      };
    } catch (_) {}
    n5MobPersistenceHooksInstalled = true;
  } catch (_e) {
    console.error("[N5 MobPersistence hooks]", _e);
  }
}
function n5EnableMobValidatorBypass() {
  if (n5MobValidatorBypassEnabled) return;
  try {
    n5AnimalCompanyImage()
      .class("AnimalCompany.MobSpawnValidator")
      .method("IsMobAllowed", 1).implementation = () => true;
    n5InstallMobPersistenceHooks();
    n5MobValidatorBypassEnabled = true;
  } catch (_e) {
    console.error("[N5 MobValidatorBypass]", _e);
  }
}
function n5EnableSpawnGuardBypass() {
  if (n5SpawnGuardBypassEnabled) return;
  try {
    const _policy = n5AnimalCompanyImage().class(
      "AnimalCompany.SpawnGuardPolicy",
    );
    try {
      _policy.method("set_EnforceProviderDeny", 1).invoke(false);
    } catch (_) {}
    try {
      _policy.field("SPAWN_MAX_PER_WINDOW").value = 2147483647;
    } catch (_) {}
    try {
      _policy.field("SPAWN_RATE_WINDOW").value = 0.0;
    } catch (_) {}
    try {
      _policy.method("IsDeniedAtProvider", 1).implementation = () => false;
    } catch (_) {}
    try {
      _policy.method("IsContextLegitimate", 2).implementation = () => true;
    } catch (_) {}
    try {
      _policy.method("AllowSpawnFromSource", 1).implementation = () => true;
    } catch (_) {}
    try {
      _policy.method("AllowSpawnFromSource", 2).implementation = () => true;
    } catch (_) {}
    try {
      _policy.method("IsInNoMobArea", 1).implementation = () => false;
    } catch (_) {}
    try {
      _policy.method("IsNoMobArea", 1).implementation = () => false;
    } catch (_) {}
    try {
      _policy.method("HandleViolation", 4).implementation = () => {};
    } catch (_) {}
    try {
      _policy.method("NeutralizeLocally", 1).implementation = () => {};
    } catch (_) {}
    try {
      _policy.method("RequestAuthoritativeDespawn", 1).implementation =
        () => {};
    } catch (_) {}
    try {
      _policy.method("ReportProviderDeny", 3).implementation = () => {};
    } catch (_) {}
    try {
      const _classifier = n5AnimalCompanyImage().class(
        "AnimalCompany.SpawnGuardClassifier",
      );
      _classifier.method("Classify", 2).implementation = () => 0;
      _classifier.method("ClassifyUncached", 1).implementation = () => 0;
      _classifier.method("ClassifyFromComponents", 3).implementation = () => 0;
      try {
        _classifier.method("ClearCache").invoke();
      } catch (_) {}
    } catch (_) {}
    try {
      n5AnimalCompanyImage()
        .class("AnimalCompany.SpawnGuardPump")
        .method("EnqueueDespawn", 1).implementation = () => {};
    } catch (_) {}
    n5SpawnGuardBypassEnabled = true;
  } catch (_e) {
    console.error("[N5 SpawnGuardBypass]", _e);
  }
}
function n5GetBeforeMobSpawnDelegate() {
  if (n5BeforeMobSpawnDelegate) return n5BeforeMobSpawnDelegate;
  try {
    n5BeforeMobSpawnDelegateClass = Il2Cpp.domain
      .assembly("Fusion.Runtime")
      .image.class("Fusion.NetworkRunner")
      .tryNested("OnBeforeSpawned");
    const _validator = n5AnimalCompanyImage().class(
      "AnimalCompany.MobSpawnValidator",
    );
    n5BeforeMobSpawnDelegate = Il2Cpp.delegate(
      n5BeforeMobSpawnDelegateClass,
      (_runner, _networkObject) => {
        try {
          if (
            !_networkObject ||
            (_networkObject.handle && _networkObject.handle.isNull())
          )
            return;
          const _networkId = _networkObject.method("get_Id").invoke();
          const _key = n5NetworkIdKey(_networkId);
          if (_key) n5ProtectedMobIds.add(_key);
          _validator.method("AddAllowMob", 1).invoke(_networkId);
          try {
            const _mobCls = n5AnimalCompanyImage().class(
              "AnimalCompany.MobController",
            );
            let _mob = null;
            try {
              _mob = _networkObject
                .method("GetComponent", 1)
                .inflate(_mobCls)
                .invoke();
            } catch (_) {}
            if (_mob && (!_mob.handle || !_mob.handle.isNull())) {
              try {
                _mob.method("set_n_deathAction").invoke(0);
              } catch (_) {}
              try {
                _mob.method("set_n_isDie").invoke(false);
              } catch (_) {}
              try {
                const _aoi = _mob.field("_stateAuthHandler").value;
                if (_aoi && (!_aoi.handle || !_aoi.handle.isNull())) {
                  try {
                    _aoi.field("_deactivateOnInterestExit").value = false;
                  } catch (_) {}
                  try {
                    _aoi.field("_alwaysRequireStateAuth").value = true;
                  } catch (_) {}
                  try {
                    _aoi.field("_despawnRequested").value = false;
                  } catch (_) {}
                  try {
                    _aoi.method("set_n_despawnRequested").invoke(false);
                  } catch (_) {}
                }
              } catch (_) {}
            }
          } catch (_) {}
        } catch (_e) {
          console.error("[N5 BeforeMobSpawn]", _e);
        }
      },
    );
  } catch (_e) {
    console.error("[N5 BeforeMobSpawn delegate]", _e);
    n5BeforeMobSpawnDelegate = null;
  }
  return n5BeforeMobSpawnDelegate;
}
function n5NullManagedRef() {
  return null;
}
try {
  for (const _n5Mob of ["Bomb", "ArmstrongSpace", "Smiley"])
    if (Array.isArray(mobIDs) && mobIDs.indexOf(_n5Mob) < 0)
      mobIDs.push(_n5Mob);
} catch (_) {}

function n5SpawnItemAt(_itemId, _pos, _rot) {
  try {
    const PrefabGen = acImage.class("AnimalCompany.PrefabGenerator");
    const _sid = String(_itemId || "").replace(/^item_prefab\//, "");
    const _ids = [_sid];
    if (_sid.indexOf("item_") === 0) _ids.push(_sid.substring(5));
    _ids.push("item_prefab/" + _sid);
    for (const _id of _ids) {
      try {
        PrefabGen.method("SpawnItemAsync", 4)
          .overload(
            "System.String",
            "UnityEngine.Vector3",
            "UnityEngine.Quaternion",
            "Fusion.NetworkObjectSpawnDelegate",
          )
          .invoke(
            Il2Cpp.string(_id),
            _pos,
            _rot || identityRotation,
            nullObjectRef,
          );
        return true;
      } catch (_) {}
    }
    return false;
  } catch (_e) {
    console.error("[N5 SpawnItemAt]", _e);
    return false;
  }
}

function n5SpawnMobAt(_mobId, _pos, _rot) {
  try {
    n5EnableMobValidatorBypass();
    n5EnableSpawnGuardBypass();
    const PrefabGen = n5AnimalCompanyImage().class(
      "AnimalCompany.PrefabGenerator",
    );
    const _beforeMobSpawn = n5GetBeforeMobSpawnDelegate();
    const _resolved = n5ResolveMobID(_mobId);
    if (_resolved === null) {
      const _name = String(_mobId || "").replace(/^mob_prefab\//, "");
      const _fb =
        spawnNetworkPrefab(_name, _pos, _rot || identityRotation) ||
        spawnNetworkPrefab(
          "mob_prefab/" + _name,
          _pos,
          _rot || identityRotation,
        );
      return !!_fb;
    }
    try {
      PrefabGen.method("SpawnMobAsync", 6)
        .overload(
          "AnimalCompany.MobID",
          "UnityEngine.Vector3",
          "UnityEngine.Quaternion",
          "Fusion.NetworkRunner.OnBeforeSpawned",
          "Fusion.NetworkObjectSpawnDelegate",
          "System.String",
        )
        .invoke(
          _resolved,
          _pos,
          _rot || identityRotation,
          _beforeMobSpawn || n5NullManagedRef(),
          n5NullManagedRef(),
          Il2Cpp.string("WorldScript"),
        );
      return true;
    } catch (_directErr) {}
    try {
      PrefabGen.method("SpawnMob", 4).invoke(
        _resolved,
        _pos,
        _rot || identityRotation,
        nullObjectRef,
      );
      return true;
    } catch (_syncErr) {}
    try {
      PrefabGen.method("SpawnMob", 5).invoke(
        _resolved,
        _pos,
        _rot || identityRotation,
        nullObjectRef,
        Il2Cpp.string("mod"),
      );
      return true;
    } catch (_syncNamedErr) {}
    try {
      PrefabGen.method("SpawnMobNearbyAsync", 6)
        .overload(
          "AnimalCompany.MobID",
          "UnityEngine.Vector3",
          "System.Single",
          "Fusion.NetworkRunner.OnBeforeSpawned",
          "Fusion.NetworkObjectSpawnDelegate",
          "System.String",
        )
        .invoke(
          _resolved,
          _pos,
          8.0,
          _beforeMobSpawn || n5NullManagedRef(),
          n5NullManagedRef(),
          Il2Cpp.string("WorldScript"),
        );
      return true;
    } catch (_nearbyErr) {}
    PrefabGen.method("SpawnMobNearbyPlayerAsync", 5)
      .overload(
        "AnimalCompany.MobID",
        "System.Single",
        "Fusion.NetworkRunner.OnBeforeSpawned",
        "Fusion.NetworkObjectSpawnDelegate",
        "System.String",
      )
      .invoke(
        _resolved,
        8.0,
        _beforeMobSpawn || n5NullManagedRef(),
        n5NullManagedRef(),
        Il2Cpp.string("WorldScript"),
      );
    return true;
  } catch (_e) {
    try {
      const _name = String(_mobId || "").replace(/^mob_prefab\//, "");
      const _fb =
        spawnNetworkPrefab(_name, _pos, _rot || identityRotation) ||
        spawnNetworkPrefab(
          "mob_prefab/" + _name,
          _pos,
          _rot || identityRotation,
        );
      return !!_fb;
    } catch (_e2) {
      console.error("[N5 SpawnMobAt]", _e, _e2);
      return false;
    }
  }
}

function n5ClearOrbitFuckery() {
  for (const _obj of n5OrbitFuckeryObjects) {
    if (!_obj) continue;
    try {
      const _runner = _obj.method("get_Runner").invoke();
      if (_runner && !_runner.isNull()) _runner.method("Despawn").invoke(_obj);
    } catch (_e) {
      try {
        getTransform(_obj).method("set_position").invoke([0, -99999, 0]);
      } catch (_e2) {}
    }
  }
  n5OrbitFuckeryObjects = [];
  n5OrbitFuckeryOrbiters = [];
}

function n5RunPrefabOrbit(_prefabName, _count, _radius, _height) {
  try {
    const _center = acImage
      .class("AnimalCompany.PlayerController")
      .method("get_instance")
      .invoke()
      .method("get_head")
      .invoke();
    if (!_center || _center.handle.isNull()) return;
    if (
      n5OrbitFuckeryObjects.length < _count ||
      n5OrbitFuckeryPrefabName !== _prefabName
    ) {
      n5ClearOrbitFuckery();
      n5OrbitFuckeryPrefabName = _prefabName;
      n5OrbitFuckeryCount = _count;
      n5OrbitFuckeryRadius = _radius;
      const _centerPos = _center.method("get_position").invoke();
      for (let _i = 0; _i < _count; _i++) {
        const _angle = ((Math.PI * 2) / 8) * _i;
        const _offset = Vector3Cls.alloc();
        _offset
          .method(".ctor")
          .overload("System.Single", "System.Single", "System.Single")
          .invoke(
            Math.cos(_angle) * _radius,
            _height,
            Math.sin(_angle) * _radius,
          );
        const _spawnPos = Vector3Cls.method("op_Addition").invoke(_centerPos, [
          _offset.field("x").value,
          _offset.field("y").value,
          _offset.field("z").value,
        ]);
        const _obj = spawnNetworkPrefab(
          _prefabName,
          _spawnPos,
          QuaternionCls.method("get_identity").invoke(),
        );
        if (!_obj) continue;
        n5OrbitFuckeryObjects.push(_obj);
        try {
          const _tf = _obj
            .method("get_gameObject")
            .invoke()
            .method("get_transform")
            .invoke();
          n5OrbitFuckeryOrbiters.push({ transform: _tf, angle: _angle });
        } catch (_e) {}
      }
    }
    const _pos = _center.method("get_position").invoke();
    const _dt = TimeCls.method("get_deltaTime").invoke();
    for (const _orb of n5OrbitFuckeryOrbiters) {
      try {
        _orb.angle += 1.5 * _dt;
        const _offset = Vector3Cls.alloc();
        _offset
          .method(".ctor")
          .overload("System.Single", "System.Single", "System.Single")
          .invoke(
            Math.cos(_orb.angle) * _radius,
            _height,
            Math.sin(_orb.angle) * _radius,
          );
        const _newPos = Vector3Cls.method("op_Addition").invoke(_pos, [
          _offset.field("x").value,
          _offset.field("y").value,
          _offset.field("z").value,
        ]);
        _orb.transform.method("set_position").invoke(_newPos);
      } catch (_e) {}
    }
  } catch (_e) {
    console.error("[N5 PrefabOrbit]", _e);
  }
}

function n5ClearTowerOrbit() {
  for (const _obj of n5TowerOrbitObjects) {
    try {
      if (_obj) n5DespawnPrefabObj(_obj);
    } catch (_) {}
  }
  n5TowerOrbitObjects = [];
  n5TowerOrbitOrbiters = [];
}

function n5RunSellingTowerOrbit() {
  try {
    const _heights = [-3.3, 0.0, 3.3],
      _per = 24,
      _radius = 5.6;
    if (n5TowerOrbitObjects.length < _heights.length * _per) {
      n5ClearTowerOrbit();
      const _center =
        n5GetSafeSelfPosition() ||
        rightHandTransform.method("get_position").invoke();
      for (const _h of _heights) {
        for (let _i = 0; _i < _per; _i++) {
          const _angle = ((Math.PI * 2) / _per) * _i;
          const _pos = [
            (_center[0] || 0) + Math.cos(_angle) * _radius,
            (_center[1] || 0) + _h,
            (_center[2] || 0) + Math.sin(_angle) * _radius,
          ];
          const _obj = spawnNetworkPrefab(
            "ItemSellingMachineController",
            _pos,
            identityRotation,
          );
          if (!_obj) continue;
          n5TowerOrbitObjects.push(_obj);
          const _tf = n5GetSpawnedObjectTransform(_obj);
          if (_tf)
            n5TowerOrbitOrbiters.push({
              transform: _tf,
              angle: _angle,
              height: _h,
            });
        }
      }
    }
    const _center =
      n5GetSafeSelfPosition() ||
      rightHandTransform.method("get_position").invoke();
    for (const _orb of n5TowerOrbitOrbiters) {
      try {
        _orb.angle += 0.95 * (deltaTime || 0.016);
        const _pos = [
          (_center[0] || 0) + Math.cos(_orb.angle) * _radius,
          (_center[1] || 0) + _orb.height,
          (_center[2] || 0) + Math.sin(_orb.angle) * _radius,
        ];
        _orb.transform.method("set_position").invoke(_pos);
      } catch (_) {}
    }
  } catch (_e) {
    console.error("[N5 SellingTowerOrbit]", _e);
  }
}

function n5KickPlayerObject(_player) {
  if (!_player || _player.handle.isNull()) return false;
  try {
    const _rpc = acImage.class("AnimalCompany.NetSessionRPCs");
    const _inst = _rpc.field("_instance").value;
    const _uid = _player.field("_userID").value;
    _n5OutgoingKick = true;
    try {
      try {
        if (_inst) _inst.method("RPC_KickPlayer").invoke(_uid);
      } catch (_e1) {}
      try {
        _rpc.method("KickPlayer").invoke(_uid);
      } catch (_e2) {}
    } finally {
      _n5OutgoingKick = false;
    }
    return true;
  } catch (_e) {
    console.error("[N5 KickPlayer]", _e);
    _n5OutgoingKick = false;
    return false;
  }
}

const N5_SOUNDS = [
  { name: "3h6nv4", url: "https://files.catbox.moe/3h6nv4.mp3" },
];

let n5MediaPlayer = null;
let n5SoundVolume = 1.0;
let n5SoundLoop = false;
let _n5LoadedIdx = -1;
let _n5TmpPath = null;

function n5LoadWebSound(index, onDone) {
  const entry = N5_SOUNDS[index];
  if (!entry) {
    onDone && onDone(false);
    return;
  }
  if (n5SoundLoading) {
    currentNotification = "Already loading...";
    notifactionResetTime = time + 2;
    return;
  }
  n5SoundLoading = true;
  try {
    Java.perform(() => {
      try {
        const ActivityThread = Java.use("android.app.ActivityThread");
        const ctx = ActivityThread.currentApplication().getApplicationContext();
        const tmpPath =
          ctx.getCacheDir().getAbsolutePath() + "/n5sound_" + index + ".mp3";
        const Thread = Java.use("java.lang.Thread");
        const WorkerCls = Java.registerClass({
          name: "n5.SoundLoader" + (Date.now() % 100000),
          implements: [Java.use("java.lang.Runnable")],
          methods: {
            run: function () {
              try {
                const conn = Java.cast(
                  Java.use("java.net.URL").$new(entry.url).openConnection(),
                  Java.use("java.net.HttpURLConnection"),
                );
                conn.setConnectTimeout(10000);
                conn.setReadTimeout(30000);
                conn.setRequestMethod("GET");
                conn.connect();
                if (
                  conn.getResponseCode() < 200 ||
                  conn.getResponseCode() >= 300
                ) {
                  conn.disconnect();
                  n5SoundLoading = false;
                  onDone && onDone(false);
                  return;
                }
                const ins = conn.getInputStream();
                const buf = Java.array("byte", new Array(8192).fill(0));
                const fos = Java.use("java.io.FileOutputStream").$new(tmpPath);
                let n;
                while ((n = ins.read(buf)) !== -1) fos.write(buf, 0, n);
                fos.flush();
                fos.close();
                ins.close();
                conn.disconnect();
                console.log("[Sound] Downloaded: " + tmpPath);
                _n5TmpPath = tmpPath;
                try {
                  if (n5MediaPlayer) {
                    n5MediaPlayer.stop();
                    n5MediaPlayer.release();
                    n5MediaPlayer = null;
                  }
                } catch (_) {}
                const mp = Java.use("android.media.MediaPlayer").$new();
                mp.setDataSource(tmpPath);
                mp.prepare();
                mp.setVolume(n5SoundVolume, n5SoundVolume);
                mp.setLooping(n5SoundLoop);
                n5MediaPlayer = mp;
                n5SoundLoading = false;
                onDone && onDone(true);
              } catch (e) {
                console.error("[Sound] load err:", e);
                n5SoundLoading = false;
                onDone && onDone(false);
              }
            },
          },
        });
        Thread.$new(WorkerCls.$new()).start();
      } catch (e) {
        console.error("[Sound] Java.perform err:", e);
        n5SoundLoading = false;
        onDone && onDone(false);
      }
    });
  } catch (e) {
    console.error("[Sound] Java.perform err:", e);
    n5SoundLoading = false;
    onDone && onDone(false);
  }
}

function n5PlaySound() {
  if (!n5MediaPlayer) {
    currentNotification = "Load a sound first";
    notifactionResetTime = time + 2;
    return;
  }
  try {
    Java.perform(() => {
      try {
        n5MediaPlayer.seekTo(0);
        n5MediaPlayer.start();
      } catch (e) {
        console.error("[Sound] play err:", e);
      }
    });
  } catch (e) {}
}

function n5StopSound() {
  if (!n5MediaPlayer) return;
  try {
    Java.perform(() => {
      try {
        n5MediaPlayer.stop();
        n5MediaPlayer.prepare();
      } catch (_) {}
    });
  } catch (e) {}
}

function n5SetVoiceInject(en) {
  if (!en) {
    currentNotification = "Voice inject off";
    notifactionResetTime = time + 2;

    try {
      Il2Cpp.perform(() => {
        _n5GetRecorder((rec) => {
          if (rec) {
            try {
              rec.method("set_SourceType").invoke(0);
            } catch (_) {}
          }
        });
      });
    } catch (_) {}
    return;
  }
  if (!_n5TmpPath) {
    currentNotification = "Load a sound first!";
    notifactionResetTime = time + 3;
    return;
  }
  currentNotification = "Decoding for voice...";
  notifactionResetTime = time + 10;
  try {
    Java.perform(() => {
      const Thread = Java.use("java.lang.Thread");
      const WorkerCls = Java.registerClass({
        name: "n5.VoiceDecodeWorker" + (Date.now() % 100000),
        implements: [Java.use("java.lang.Runnable")],
        methods: {
          run: function () {
            try {
              const ME = Java.use("android.media.MediaExtractor");
              const MC = Java.use("android.media.MediaCodec");
              const BI = Java.use("android.media.MediaCodec$BufferInfo");
              const me = ME.$new();
              me.setDataSource(_n5TmpPath);
              let trackIdx = -1,
                sampleRate = 44100,
                channels = 2,
                mime = "audio/mpeg";
              for (let i = 0; i < me.getTrackCount(); i++) {
                const fmt = me.getTrackFormat(i);
                const m = fmt.getString("mime");
                if (m && m.startsWith("audio/")) {
                  trackIdx = i;
                  mime = m;
                  try {
                    sampleRate = fmt.getInteger("sample-rate");
                  } catch (_) {}
                  try {
                    channels = fmt.getInteger("channel-count");
                  } catch (_) {}
                  break;
                }
              }
              if (trackIdx < 0) {
                console.error("[Voice] No audio track");
                return;
              }
              me.selectTrack(trackIdx);
              const fmt = me.getTrackFormat(trackIdx);
              const mc = MC.createDecoderByType(mime);
              mc.configure(fmt, null, null, 0);
              mc.start();
              const info = BI.$new();
              const pcm = [];
              let eos = false,
                safety = 0;
              while (!eos && safety < 100000) {
                safety++;
                const ii = mc.dequeueInputBuffer(5000);
                if (ii >= 0) {
                  const ib = mc.getInputBuffer(ii);
                  ib.clear();
                  const sz = me.readSampleData(ib, 0);
                  if (sz < 0) mc.queueInputBuffer(ii, 0, 0, 0, 4);
                  else {
                    mc.queueInputBuffer(ii, 0, sz, me.getSampleTime(), 0);
                    me.advance();
                  }
                }
                const oi = mc.dequeueOutputBuffer(info, 5000);
                if (oi >= 0) {
                  const fl = info.flags.value,
                    off = info.offset.value,
                    sz = info.size.value;
                  if ((fl & 4) !== 0) eos = true;
                  else if (sz > 0) {
                    const ob = mc.getOutputBuffer(oi);
                    ob.position(off);
                    ob.limit(off + sz);
                    const bs = Java.array("byte", new Array(sz).fill(0));
                    ob.get(bs);
                    for (let b = 0; b < bs.length; b++) pcm.push(bs[b]);
                  }
                  mc.releaseOutputBuffer(oi, false);
                }
              }
              mc.stop();
              mc.release();
              me.release();
              const numSamples = Math.floor(pcm.length / 2);
              if (numSamples === 0) {
                console.error("[Voice] 0 samples");
                return;
              }
              const floats = new Float32Array(numSamples);
              for (let i = 0; i < numSamples; i++) {
                const lo = pcm[i * 2] & 255,
                  hi = pcm[i * 3];
                floats[i] = ((hi << 8) | lo) / 32768.0;
              }
              console.log("[Voice] Decoded " + numSamples + " samples");
              Il2Cpp.perform(() => {
                try {
                  const acCls = Il2Cpp.domain
                    .assembly("UnityEngine.AudioModule")
                    .image.class("UnityEngine.AudioClip");
                  const clip = acCls
                    .method("Create", 5)
                    .invoke(
                      Il2Cpp.string("n5voice"),
                      Math.floor(numSamples / channels),
                      channels,
                      sampleRate,
                      false,
                    );
                  if (!clip || clip.isNull()) {
                    console.error("[Voice] clip null");
                    return;
                  }
                  const arr = Il2Cpp.array(
                    Il2Cpp.corlib.class("System.Single"),
                    numSamples,
                  );
                  arr.elements.writeByteArray(new Uint8Array(floats.buffer));
                  clip.method("SetData", 2).invoke(arr, 0);

                  _n5GetRecorder((rec) => {
                    if (!rec) {
                      currentNotification = " Photon Recorder not found";
                      notifactionResetTime = time + 3;
                      return;
                    }
                    console.log("[Voice] Injecting into recorder...");

                    let srcSet = false;
                    for (const v of [1, 2, 0]) {
                      try {
                        rec.method("set_SourceType").invoke(v);
                        console.log("[Voice] set_SourceType(" + v + ") OK");
                        srcSet = true;
                        break;
                      } catch (e) {
                        console.log(
                          "[Voice] set_SourceType(" + v + ") failed: " + e,
                        );
                      }
                    }
                    try {
                      rec.method("set_AudioClip").invoke(clip);
                      console.log("[Voice] set_AudioClip OK");
                    } catch (e) {
                      console.error("[Voice] set_AudioClip failed: " + e);
                    }
                    try {
                      rec.method("set_Loop").invoke(true);
                      console.log("[Voice] set_Loop OK");
                    } catch (e) {
                      console.log("[Voice] set_Loop failed: " + e);
                    }
                    try {
                      rec.method("set_TransmitEnabled").invoke(true);
                      console.log("[Voice] set_TransmitEnabled OK");
                    } catch (e) {
                      console.log("[Voice] set_TransmitEnabled failed: " + e);
                    }

                    try {
                      rec.method("RestartRecording").invoke();
                      console.log("[Voice] RestartRecording OK");
                    } catch (_) {}
                    currentNotification = " Voice inject ON";
                    notifactionResetTime = time + 3;
                  });
                } catch (e2) {
                  console.error("[Voice] clip err:", e2);
                }
              });
            } catch (e) {
              console.error("[Voice] decode err:", e);
            }
          },
        },
      });
      Thread.$new(WorkerCls.$new()).start();
    });
  } catch (e) {
    console.error("[Voice] Java.perform err:", e);
  }
}

let _n5RecorderClassCache = null;
function _n5GetRecorder(cb) {
  let recCls = _n5RecorderClassCache;
  if (!recCls) {
    const namesToTry = ["Photon.Voice.Unity"];
    for (const asm of Il2Cpp.domain.assemblies) {
      for (const n of namesToTry) {
        try {
          recCls = asm.image.class(n);
          if (recCls) {
            break;
          }
        } catch (_) {}
      }
      if (recCls) break;
    }
    if (!recCls) {
      console.error("[Voice] Recorder class not found in any assembly");
      cb(null);
      return;
    }
    _n5RecorderClassCache = recCls;
    console.log("[Voice] Recorder class found and cached");
  }
  const objCls = Il2Cpp.domain
    .assembly("UnityEngine.CoreModule")
    .image.class("UnityEngine.Object");
  const inst = objCls
    .method("FindObjectOfType", 1)
    .inflate(recCls)
    .invoke(false);
  if (!inst || inst.isNull()) {
    console.error("[Voice] Recorder instance not found in scene");
    cb(null);
    return;
  }
  cb(inst);
}

function n5PollUWR() {}

// [obfuscation string-pool removed]
const loadedBundles = {},
  loadedObjects = {};
let _n5MenuBooted = false,
  _n5MenuBootAttempts = 0,
  _n5MenuReadySince = 0;
function _n5StateValue(_p) {
  if (!_p) return null;
  try {
    return _p.method("get_Value").invoke();
  } catch (_) {}
  try {
    return _p.field("value").value;
  } catch (_) {}
  try {
    return _p.field("_value").value;
  } catch (_) {}
  return null;
}
function _n5MenuCanBoot() {
  try {
    const _now = Date.now();
    const _ac = Il2Cpp.domain.assembly("AnimalCompany").image;
    try {
      const _state = _ac
        .class("AnimalCompany.App")
        .method("get_state")
        .invoke();
      if (!_state || (_state.handle && _state.handle.isNull())) return false;
      const _loading = _state.method("get_loadingScreen").invoke();
      if (_loading && (!_loading.handle || !_loading.handle.isNull())) {
        const _err =
          "" +
          (_n5StateValue(_loading.method("get_errorStatus").invoke()) || "");
        if (_err && _err !== "null") return false;
      }
    } catch (_) {}
    const _gl = _ac.class("AnimalCompany.GorillaLocomotion");
    let _inst = null;
    try {
      _inst = _gl.field("<Instance>k__BackingField").value;
    } catch (_) {}
    if (!_inst || (_inst.handle && _inst.handle.isNull())) {
      try {
        const _obj = Il2Cpp.domain
          .assembly("UnityEngine.CoreModule")
          .image.class("UnityEngine.Object");
        _inst = _obj.method("FindObjectOfType", 1).inflate(_gl).invoke(false);
        if (_inst && (!_inst.handle || !_inst.handle.isNull())) {
          try {
            _gl.field("<Instance>k__BackingField").value = _inst;
          } catch (_) {}
        }
      } catch (_) {}
    }
    if (!_inst || (_inst.handle && _inst.handle.isNull())) return false;
    const _head = _inst.field("headCollider").value;
    if (!_head || (_head.handle && _head.handle.isNull())) return false;
    if (!_n5MenuReadySince) _n5MenuReadySince = _now;
    return _now - _n5MenuReadySince > 5000;
  } catch (_) {
    return false;
  }
}
function _n5BootMenu() {
  Il2Cpp.perform(() => {
    if (_n5MenuBooted) return;
    if (!_n5MenuCanBoot()) {
      if (_n5MenuBootAttempts++ % 5 === 0)
        console.log(
          _n5MenuReadySince
            ? "[N5] player rig found; waiting for scene to settle before menu boot..."
            : "[N5] waiting for loading screen/player rig before menu boot...",
        );
      setTimeout(_n5BootMenu, 1000);
      return;
    }
    _n5MenuBooted = true;
    _n5PCInitWin32();

    let _n5AuthPassed = true;
    let _n5AuthChecked = true;

    // [obfuscation lookup dict removed]
    const getString = (s) => s;
    const _vx476 = {
      JSpiZ: (a, b) => Math.min(a, b),
      OgOfv: (a, b) => Math.max(a, b),
      qtNkl: (a, b) => a * b,
      SBWkx: (a, b) => a * b,
      yhReC: (a, b) => Math.max(a, b),
      QcdsO: (a, b) => Math.max(a, b),
      vbaeB: (a, b) => a / b,
      YEtTY: (a, b) => a / (b > 0 ? b : 8),
      hXWTf: (a, b) => ((a % b) + b) % b,
      HaQtP: (a, b) => a + b,
      PijQq: (a, b) => ((a % b) + b) % b,
      Oulwf: (a, b) => a + b,
      Ixelf: (a, b) => a % b !== 0,
      jREgu: (a, b) => a % (b || 1) !== 0,
      yHEdd: (a, b) => a === b,
      GywiG: (a, b) => a % b,
      nNHgt: (a, b) => a % (b || 1) !== 0,
      MtVJr: (fn) => fn(),
      mnMDs: (fn) => fn(),
      uMIkA: (fn) => fn(),
      qWRUu: (a, b) => a + b,
      nmoBZ: (a, b) => a + b,
      VbxNI: (a, b) => a + b,
      BvlLf: (a, b) => a + b,
      CDJgn: (a, b) => a % b,
      vuzIZ: (a, b) => ((a % b) + b) % b,
      yCdEu: (a, b) => a !== b,
      oHAfR: (a, b) => a !== b,
      LjsNU: (a, b) => a !== b,
      RwyBa: (a, b) => a !== b,
      EICZf: (a, b) => a !== b,
      DtSku: (a, b) => a !== b,
    };
    let _vx125,
      _vx433,
      _vxb2b,
      _vx5c2,
      _vx5dc,
      _vx192,
      _vx5bc,
      _vx9e5,
      _vx1c1,
      _loopIdx,
      _runnerObj,
      _argQuat;
    ((assemblyImages = {
      AnimalCompany: Il2Cpp.domain.assembly("AnimalCompany").image,
      "UnityEngine.CoreModule": Il2Cpp.domain.assembly("UnityEngine.CoreModule")
        .image,
      "UnityEngine.PhysicsModule": Il2Cpp.domain.assembly(
        "UnityEngine.PhysicsModule",
      ).image,
      "UnityEngine.UIModule": Il2Cpp.domain.assembly("UnityEngine.UIModule")
        .image,
      "UnityEngine.UI": Il2Cpp.domain.assembly("UnityEngine.UI").image,
      "UnityEngine.TextRenderingModule": Il2Cpp.domain.assembly(
        "UnityEngine.TextRenderingModule",
      ).image,
      PhotonFusionNetworking: Il2Cpp.domain.assembly("Fusion.Runtime").image,
      PhotonFusionNetworkingRealtime:
        Il2Cpp.domain.assembly("Fusion.Realtime").image,
      "Unity.TextMeshPro": Il2Cpp.domain.assembly("Unity.TextMeshPro").image,
      "UnityEngine.XRModule": Il2Cpp.domain.assembly("UnityEngine.XRModule")
        .image,
      "UnityEngine.AudioModule": Il2Cpp.domain.assembly(
        "UnityEngine.AudioModule",
      ).image,
      "Oculus.Platform": Il2Cpp.domain.assembly("Oculus.Platform").image,
    }),
      (acImage = assemblyImages.AnimalCompany),
      (coreImage = assemblyImages["UnityEngine.CoreModule"]),
      (physImage = assemblyImages["UnityEngine.PhysicsModule"]),
      (uiImage = assemblyImages["UnityEngine.UI"]),
      (uiModuleImage = assemblyImages["UnityEngine.UIModule"]),
      (textRenderImage = assemblyImages["UnityEngine.TextRenderingModule"]),
      (fusionImage = assemblyImages.PhotonFusionNetworking),
      (tmpImage = assemblyImages["Unity.TextMeshPro"]),
      (xrImage = assemblyImages["UnityEngine.XRModule"]),
      (audioImage = assemblyImages["UnityEngine.AudioModule"]),
      (OculusPlatformSettings = assemblyImages["Oculus.Platform"].class(
        "Oculus.Platform.PlatformSettings",
      )),
      (GorillaLocomotionCls = acImage.class("AnimalCompany.GorillaLocomotion")),
      (NetPlayerCls = acImage.class("AnimalCompany.NetPlayer")),
      (ItemVendingMachineViewCls = acImage.class(
        "AnimalCompany.ItemVendingMachineView",
      )),
      (ElevatorManagerCls = acImage.class("AnimalCompany.ElevatorManager")),
      (ArenaGameManagerCls = acImage.class("AnimalCompany.ArenaGameManager")),
      (GrabbableObjectCls = acImage.class("AnimalCompany.GrabbableObject")),
      (ItemSellingMachineControllerCls = acImage.class(
        "AnimalCompany.ItemSellingMachineController",
      )),
      (PrefabGeneratorCls = acImage.class("AnimalCompany.PrefabGenerator")),
      (GrabbableItemCls = acImage.class("AnimalCompany.GrabbableItem")),
      (PlayerControllerCls = acImage.class("AnimalCompany.PlayerController")),
      (GrabbableObjectCls2 = acImage.class("AnimalCompany.GrabbableObject")),
      (SFXManagerCls = acImage.class("AnimalCompany.SFXManager")),
      (NetworkManagerCls = acImage.class("AnimalCompany.NetworkManager")),
      (ComputerTerminalKeyCls = acImage.class(
        "AnimalCompany.ComputerTerminalKey",
      )),
      (InputDevicesCls = xrImage.class("UnityEngine.XR.InputDevices")),
      (XRCommonUsagesCls = xrImage.class("UnityEngine.XR.CommonUsages")),
      (GameObjectCls = coreImage.class("UnityEngine.GameObject")),
      (UnityObjectCls = coreImage.class("UnityEngine.Object")),
      (Vector3Cls = coreImage.class("UnityEngine.Vector3")),
      (QuaternionCls = coreImage.class("UnityEngine.Quaternion")),
      (TimeCls = coreImage.class("UnityEngine.Time")),
      (ResourcesCls = coreImage.class("UnityEngine.Resources")),
      (MaterialCls = coreImage.class("UnityEngine.Material")),
      (MeshRendererCls = coreImage.class("UnityEngine.Renderer")),
      (ShaderCls = coreImage.class("UnityEngine.Shader")),
      (RectTransformCls = coreImage.class("UnityEngine.RectTransform")),
      (LineRendererCls = coreImage.class("UnityEngine.LineRenderer")),
      (BoxColliderCls = physImage.class("UnityEngine.BoxCollider")),
      (ColliderCls = physImage.class("UnityEngine.Collider")),
      (RigidbodyCls = physImage.class("UnityEngine.Rigidbody")),
      (PhysicsCls = physImage.class("UnityEngine.Physics")),
      (ComponentCls = coreImage.class("UnityEngine.Component")),
      (ParticleManagerCls = acImage.class("AnimalCompany.ParticleManager")),
      (ParticleManagerCls2 = ParticleManagerCls),
      (CanvasCls = uiModuleImage.class("UnityEngine.Canvas")),
      (CanvasScalerCls = uiImage.class("UnityEngine.UI.CanvasScaler")),
      (GraphicRaycasterCls = uiImage.class("UnityEngine.UI.GraphicRaycaster")),
      (UITextCls = uiImage.class("UnityEngine.UI.Text")),
      (FontCls = textRenderImage.class("UnityEngine.Font")),
      (gorillaLocomotionInstance = GorillaLocomotionCls.field(
        "<Instance>k__BackingField",
      ).value),
      (urpUnlitShader = ShaderCls.method("Find").invoke(
        Il2Cpp.string("Universal Render Pipeline/Unlit"),
      )),
      (uiDefaultShader = ShaderCls.method("Find").invoke(
        Il2Cpp.string("UI/Default"),
      )),
      (vec3Zero = Vector3Cls.field("zeroVector").value),
      (vec3One = Vector3Cls.field("oneVector").value),
      (identityRotation = QuaternionCls.field("identityQuaternion").value),
      (leftHandTransform =
        gorillaLocomotionInstance.field("leftHandTransform").value),
      (rightHandTransform =
        gorillaLocomotionInstance.field("rightHandTransform").value),
      (headCollider = gorillaLocomotionInstance.field("headCollider").value),
      (bodyCollider = gorillaLocomotionInstance.field("bodyCollider").value));
    function n5RefreshDumpBackedSpawnIDs() {
      try {
        const _globalCls = acImage
          .class("AnimalCompany.NetworkPrefabSheet")
          .method("get_globalRefs").returnType.class;
        for (const _field of _globalCls.fields) {
          if (_field.isStatic) continue;
          const _name = String(_field.name || "");
          if (_name && prefabList.indexOf(_name) < 0) prefabList.push(_name);
        }
      } catch (_e) {
        console.error("[N5 Prefab ID refresh]", _e);
      }
      try {
        const _mobCls = acImage.class("AnimalCompany.MobID");
        for (const _field of _mobCls.fields) {
          if (!_field.isStatic || _field.name === "value__") continue;
          const _name = String(_field.name || "");
          if (_name && mobIDs.indexOf(_name) < 0) mobIDs.push(_name);
        }
      } catch (_e) {
        console.error("[N5 Mob ID refresh]", _e);
      }
      try {
        const _vfxCls = acImage.class("AnimalCompany.NetworkVFXType");
        for (const _field of _vfxCls.fields) {
          if (!_field.isStatic || _field.name === "value__") continue;
          try {
            const _raw = _field.value;
            const _value = Number(
              _raw && _raw.value !== undefined ? _raw.value : _raw,
            );
            if (Number.isFinite(_value)) VFXTypes[_field.name] = _value;
          } catch (_) {}
        }
        const _assetVfxCls = acImage.class("AnimalCompany.E_VisualEffectAsset");
        for (const _field of _assetVfxCls.fields) {
          if (
            !_field.isStatic ||
            _field.name === "value__" ||
            _field.name === "none"
          )
            continue;
          try {
            const _raw = _field.value;
            const _value = Number(
              _raw && _raw.value !== undefined ? _raw.value : _raw,
            );
            if (Number.isFinite(_value))
              VFXTypes["Asset_" + _field.name] = 1000 + _value;
          } catch (_) {}
        }
        vfxKeys = Object.keys(VFXTypes).filter((_k) => _k !== "None");
      } catch (_e) {
        console.error("[N5 VFX ID refresh]", _e);
      }
    }
    n5RefreshDumpBackedSpawnIDs();
    try {
      arialFont = ResourcesCls.method("GetBuiltinResource", 1)
        .inflate(FontCls)
        .invoke(Il2Cpp.string("Arial.ttf"));
    } catch (_) {
      arialFont = null;
    }
    function destroyObject(_vx49e) {
      UnityObjectCls.method("Destroy", 1).invoke(_vx49e);
    }
    function getComponent(_vx15f, _vx38f) {
      return _vx15f.method("GetComponent", 1).inflate(_vx38f).invoke();
    }
    function getComponentInParent(_vxef5, _vx215) {
      return _vxef5.method("GetComponentInParent", 0).inflate(_vx215).invoke();
    }
    function addComponent(_vx2e8, _vxe5b) {
      return _vx2e8.method("AddComponent", 1).inflate(_vxe5b).invoke();
    }
    function getTransform(_vx489) {
      return _vx489.method("get_transform").invoke();
    }
    function getIsMine(_vx497) {
      return _vx497.method("get_IsMine").invoke();
    }
    const NetworkRunnerCls = Il2Cpp.domain
        .assembly("Fusion.Runtime")
        .image.class("Fusion.NetworkRunner"),
      nullObjectRef = Il2Cpp.reference(
        Il2Cpp.domain.assembly("mscorlib").image.class("System.Object").alloc(),
      );
    let currentRunner = null,
      currentRunnerName = "",
      spawnCounter = 0;
    function n5FindNetworkPrefab(_name) {
      const _requested = String(_name || "").replace(/^.*\//, "");
      const _aliases = {
        RadarPartSpawner: "FourLeafRadar_Spawner",
        NetworkedLever_SecretLeft: "NetworkedWorldLever",
        BarrelBeansStatic: "BarrelBeansDynamic",
        BarrelExplodingStatic: "BarrelExplodingDynamic",
        BarrelOilStatic: "BarrelOilDynamic",
        SlenderMonster: "ShadowController",
        ArmstrongSpaceController: "ArmstrongControllerSpace",
      };
      const _wanted = _aliases[_requested] || _requested;
      if (!_wanted) return null;
      try {
        const _sheetCls = acImage.class("AnimalCompany.NetworkPrefabSheet");
        const _global = _sheetCls.method("get_globalRefs").invoke();
        if (_global && (!_global.handle || !_global.handle.isNull())) {
          const _fieldNames = [_wanted];
          if (_wanted === "ArmstrongSpaceController")
            _fieldNames.push("ArmstrongControllerSpace");
          if (_wanted === "Smiley") _fieldNames.push("SmileyController");
          for (const _fieldName of _fieldNames) {
            try {
              const _prefab = _global.field(_fieldName).value;
              if (_prefab && (!_prefab.handle || !_prefab.handle.isNull()))
                return _prefab;
            } catch (_) {}
          }
          try {
            for (const _field of _global.class.fields) {
              if (_field.isStatic) continue;
              const _fieldName = String(_field.name || "");
              if (
                _fieldName !== _wanted &&
                !_fieldName.toLowerCase().includes(_wanted.toLowerCase())
              )
                continue;
              const _prefab = _field.bind(_global).value;
              if (_prefab && (!_prefab.handle || !_prefab.handle.isNull()))
                return _prefab;
            }
          } catch (_) {}
        }
        const _sheet = _sheetCls.method("get_instance").invoke();
        if (_sheet && (!_sheet.handle || !_sheet.handle.isNull())) {
          const _resources = _sheet.method("get_resources").invoke();
          const _count = _sheet.method("GetLength").invoke();
          for (let _i = 0; _i < _count; _i++) {
            try {
              const _prefab = _sheet.method("Get", 1).invoke(_i);
              if (!_prefab || (_prefab.handle && _prefab.handle.isNull()))
                continue;
              const _prefabName = n5ManagedString(
                _prefab.method("get_name").invoke(),
              );
              if (
                _prefabName === _wanted ||
                _prefabName.toLowerCase().includes(_wanted.toLowerCase())
              )
                return _prefab;
            } catch (_) {}
          }
        }
      } catch (_) {}
      return null;
    }
    function n5SpawnResolvedNetworkObject(
      _runnerInst,
      _prefab,
      _pos,
      _rot,
      _onBefore = null,
    ) {
      if (
        !_runnerInst ||
        _runnerInst.isNull() ||
        !_prefab ||
        (_prefab.handle && _prefab.handle.isNull())
      )
        return null;
      const _defaultArg = (_type) => {
        if (_type.class.isEnum || _type.isPrimitive) return 0;
        if (!_type.class.isValueType) return nullObjectRef;
        const _fields = _type.class.fields.filter((_f) => !_f.isStatic);
        if (_fields.length === 0) return 0;
        return _fields.map((_f) => _defaultArg(_f.type));
      };
      const _readValue = (_type, _value) => {
        if (typeof _value === "boolean") return _value ? 1 : 0;
        if (_value instanceof Il2Cpp.ValueType) {
          const _fields = _type.class.fields.filter((_f) => !_f.isStatic);
          if (_fields.length === 0) return 0;
          return _fields.map((_f) =>
            _readValue(_f.type, _f.bind(_value).value),
          );
        }
        if (Array.isArray(_value))
          return _value.map((_v) => _readValue(_type, _v));
        return _value;
      };
      const _nullableArg = (_type, _hasValue, _value) =>
        _type.class.fields
          .filter((_f) => !_f.isStatic)
          .map((_f) => {
            const _n = _f.name.toLowerCase();
            if (_n.includes("hasvalue")) return _hasValue ? 1 : 0;
            if (_n === "value")
              return _hasValue
                ? _readValue(_f.type, _value)
                : _defaultArg(_f.type);
            return _defaultArg(_f.type);
          });
      try {
        const _spawnMethod = _runnerInst
          .method("Spawn", 6)
          .overload(
            "Fusion.NetworkObject",
            "System.Nullable<UnityEngine.Vector3>",
            "System.Nullable<UnityEngine.Quaternion>",
            "System.Nullable<Fusion.PlayerRef>",
            "Fusion.NetworkRunner.OnBeforeSpawned",
            "Fusion.NetworkSpawnFlags",
          );
        const _p = _spawnMethod.parameters;
        const _spawned = _spawnMethod.invoke(
          _prefab,
          _nullableArg(_p[1].type, true, _pos),
          _nullableArg(_p[2].type, true, _rot),
          _nullableArg(_p[3].type, false, null),
          _onBefore,
          0,
        );
        if (_spawned && (!_spawned.handle || !_spawned.handle.isNull()))
          return _spawned;
      } catch (_) {}
      const _spawnMethods = _runnerInst.method("Spawn").overloads();
      for (const _spawnMethod of _spawnMethods) {
        try {
          if (_spawnMethod.parameterCount !== 6 || _spawnMethod.isGeneric)
            continue;
          const _p = _spawnMethod.parameters;
          const _firstType = String(_p[0].type.name || "");
          if (
            !(
              _firstType === "Fusion.NetworkObject" ||
              _firstType === "NetworkObject" ||
              _firstType.endsWith(".NetworkObject")
            ) ||
            !_p[1].type.name.includes("Nullable") ||
            !_p[1].type.name.includes("Vector3") ||
            !_p[2].type.name.includes("Nullable") ||
            !_p[2].type.name.includes("Quaternion") ||
            !_p[3].type.name.includes("Nullable") ||
            !_p[3].type.name.includes("PlayerRef") ||
            !_p[4].type.name.includes("OnBeforeSpawned") ||
            !_p[5].type.name.includes("NetworkSpawnFlags")
          )
            continue;
          return _spawnMethod
            .bind(_runnerInst)
            .invoke(
              _prefab,
              _nullableArg(_p[1].type, true, _pos),
              _nullableArg(_p[2].type, true, _rot),
              _nullableArg(_p[3].type, false, null),
              _onBefore,
              0,
            );
        } catch (_) {}
      }
      try {
        const _go = _prefab.method("get_gameObject").invoke();
        if (_go && (!_go.handle || !_go.handle.isNull())) {
          for (const _spawnMethod of _spawnMethods) {
            try {
              if (_spawnMethod.parameterCount !== 6 || _spawnMethod.isGeneric)
                continue;
              const _p = _spawnMethod.parameters,
                _firstType = String(_p[0].type.name || "");
              if (
                !(
                  _firstType === "UnityEngine.GameObject" ||
                  _firstType === "GameObject" ||
                  _firstType.endsWith(".GameObject")
                )
              )
                continue;
              return _spawnMethod
                .bind(_runnerInst)
                .invoke(
                  _go,
                  _nullableArg(_p[1].type, true, _pos),
                  _nullableArg(_p[2].type, true, _rot),
                  _nullableArg(_p[3].type, false, null),
                  _onBefore,
                  0,
                );
            } catch (_) {}
          }
        }
      } catch (_) {}
      return null;
    }
    function spawnNetworkPrefab(_vx3aa, _vx29c, _vx3f8) {
      try {
        n5EnableSpawnGuardBypass();
        let runnerInst = null;
        try {
          runnerInst = NetworkManagerCls.method("get_instance")
            .invoke()
            .method("get_currentRunner")
            .invoke();
        } catch (_) {}
        if (!runnerInst || runnerInst.isNull()) {
          try {
            runnerInst = PrefabGeneratorCls.field("_instance")
              .value.method("get_runner")
              .invoke();
          } catch (_) {}
        }
        if (!runnerInst || runnerInst.isNull()) return null;
        const _sheetPrefab = n5FindNetworkPrefab(_vx3aa);
        if (_sheetPrefab) {
          const _sheetSpawned = n5SpawnResolvedNetworkObject(
            runnerInst,
            _sheetPrefab,
            _vx29c,
            _vx3f8,
          );
          if (_sheetSpawned) return _sheetSpawned;
        }
        const prefabSources = runnerInst
          .field("_config")
          .value.field("PrefabTable")
          .value.field("_sources").value;
        const prefabCount = prefabSources.method("get_Count").invoke();
        for (let i = 0; i < prefabCount; i++) {
          try {
            const prefabEntry = prefabSources.method("get_Item").invoke(i);
            const prefabDesc = n5ManagedString(
              prefabEntry.method("get_Description").invoke(),
            );
            if (!prefabDesc.includes(_vx3aa)) continue;
            const waitResult = prefabEntry.method("WaitForResult").invoke();
            if (!waitResult || waitResult.isNull()) return null;
            const getArgType = (paramType) => {
              if (paramType.class.isEnum || paramType.isPrimitive) return 0;
              if (!paramType.class.isValueType) return nullObjectRef;
              const nonStaticFields = paramType.class.fields.filter(
                (f) => !f.isStatic,
              );
              if (nonStaticFields.length === 0) return 0;
              return nonStaticFields.map((f) => getArgType(f.type));
            };
            const spawnNetObj = (fieldType, isRef, nullRef) => {
              const valueFields = fieldType.class.fields.filter(
                (f) => !f.isStatic,
              );
              return valueFields.map((valueField) => {
                const fieldNameLower = valueField.name.toLowerCase();
                if (fieldNameLower.includes("hasvalue")) return isRef ? 1 : 0;
                if (fieldNameLower === "value")
                  return isRef ? nullRef : getArgType(valueField.type);
                return getArgType(valueField.type);
              });
            };
            const getTypeArg = (typeArg, fieldValue) => {
              if (typeof fieldValue === "boolean") return fieldValue ? 1 : 0;
              if (fieldValue instanceof Il2Cpp.ValueType) {
                const fields = typeArg.class.fields.filter((f) => !f.isStatic);
                if (fields.length === 0) return 0;
                return fields.map((f) =>
                  getTypeArg(f.type, f.bind(fieldValue).value),
                );
              }
              if (Array.isArray(fieldValue))
                return fieldValue.map((v) => getTypeArg(typeArg, v));
              return fieldValue;
            };
            const getTypeArg2 = (spawnHandlerArg, paramDef) => {
              return spawnNetObj(
                spawnHandlerArg,
                true,
                getTypeArg(paramDef.type, paramDef),
              );
            };
            let _spawnMethod = null;
            for (const m of runnerInst.method("Spawn").overloads()) {
              if (m.parameterCount !== 6 || m.isGeneric) continue;
              const p = m.parameters;
              if (
                p[0].type.name.includes("Fusion.NetworkObject") &&
                p[1].type.name.startsWith("System.Nullable") &&
                p[1].type.name.includes("Vector3") &&
                p[2].type.name.startsWith("System.Nullable") &&
                p[2].type.name.includes("Quaternion") &&
                p[3].type.name.startsWith("System.Nullable") &&
                p[3].type.name.includes("PlayerRef") &&
                p[4].type.name.includes("OnBeforeSpawned") &&
                p[5].type.name.includes("NetworkSpawnFlags")
              ) {
                _spawnMethod = m;
                break;
              }
            }
            if (!_spawnMethod) return null;
            const posArg = getTypeArg2(_spawnMethod.parameters[1].type, _vx29c);
            const rotArg = getTypeArg2(_spawnMethod.parameters[2].type, _vx3f8);
            const playerRefArg = spawnNetObj(
              _spawnMethod.parameters[3].type,
              false,
              getArgType(_spawnMethod.parameters[3].type),
            );
            const onBeforeSpawnArg = _spawnMethod.parameters[4].type.class
              .isValueType
              ? getArgType(_spawnMethod.parameters[4].type)
              : nullObjectRef;
            return _spawnMethod
              .bind(runnerInst)
              .invoke(
                waitResult,
                posArg,
                rotArg,
                playerRefArg,
                onBeforeSpawnArg,
                0,
              );
          } catch (_) {}
        }
      } catch (_vx552) {
        console.error("spawnNetworkPrefab error:", _vx552);
      }
      return null;
    }
    function n5SpawnItemAt(_itemId, _pos, _rot) {
      try {
        const PrefabGen = acImage.class("AnimalCompany.PrefabGenerator");
        const _sid = String(_itemId || "").replace(/^item_prefab\//, "");
        const _ids = [_sid];
        if (_sid.indexOf("item_") === 0) _ids.push(_sid.substring(5));
        _ids.push("item_prefab/" + _sid);
        for (const _id of _ids) {
          try {
            PrefabGen.method("SpawnItemAsync", 4)
              .overload(
                "System.String",
                "UnityEngine.Vector3",
                "UnityEngine.Quaternion",
                "Fusion.NetworkObjectSpawnDelegate",
              )
              .invoke(
                Il2Cpp.string(_id),
                _pos,
                _rot || identityRotation,
                nullObjectRef,
              );
            return true;
          } catch (_) {}
        }
        return false;
      } catch (_e) {
        console.error("[N5 SpawnItemAt scoped]", _e);
        return false;
      }
    }
    function n5SpawnItemObjectAt(_itemId, _pos, _rot) {
      try {
        const _id = String(_itemId || "").replace(/^item_prefab\//, "");
        let _obj = null;
        try {
          _obj = PrefabGeneratorCls.method("SpawnItem", 4).invoke(
            Il2Cpp.string("item_prefab/" + _id),
            _pos,
            _rot || identityRotation,
            nullObjectRef,
          );
        } catch (_) {}
        if (!_obj || (_obj.handle && _obj.handle.isNull())) {
          try {
            _obj = spawnNetworkPrefab(
              "item_prefab/" + _id,
              _pos,
              _rot || identityRotation,
            );
          } catch (_) {}
        }
        if (!_obj || (_obj.handle && _obj.handle.isNull())) return null;
        return _obj;
      } catch (_e) {
        console.error("[N5 SpawnItemObjectAt scoped]", _e);
        return null;
      }
    }
    function n5SpawnItemSyncAt(_itemId, _pos, _rot) {
      try {
        const _id = String(_itemId || "").replace(/^item_prefab\//, "");
        const _ids = [_id];
        if (_id.indexOf("item_") === 0) _ids.push(_id.substring(5));
        _ids.push("item_prefab/" + _id);
        const PrefabGen = acImage.class("AnimalCompany.PrefabGenerator");
        let _obj = null;
        for (const _tryId of _ids) {
          try {
            const _pref = PrefabGen.method("GetItemPrefab", 1).invoke(
              Il2Cpp.string(_tryId),
            );
            if (_pref && !_pref.handle.isNull()) {
              _obj = PrefabGen.method("SpawnItem", 4)
                .overload(
                  "AnimalCompany.GrabbableItemPrefab",
                  "UnityEngine.Vector3",
                  "UnityEngine.Quaternion",
                  "Fusion.OnBeforeSpawned",
                )
                .invoke(_pref, _pos, _rot || identityRotation, nullObjectRef);
            }
          } catch (_) {}
          if (_obj && (!_obj.handle || !_obj.handle.isNull())) break;
          try {
            _obj = PrefabGen.method("SpawnItem", 4)
              .overload(
                "System.String",
                "UnityEngine.Vector3",
                "UnityEngine.Quaternion",
                "Fusion.OnBeforeSpawned",
              )
              .invoke(
                Il2Cpp.string(_tryId),
                _pos,
                _rot || identityRotation,
                nullObjectRef,
              );
          } catch (_) {}
          if (_obj && (!_obj.handle || !_obj.handle.isNull())) break;
        }
        return _obj && (!_obj.handle || !_obj.handle.isNull()) ? _obj : null;
      } catch (_e) {
        console.error("[N5 SpawnItemSyncAt]", _e);
        return null;
      }
    }
    function n5SpawnConfiguredItemAt(_itemId, _pos, _rot) {
      const _obj =
        n5SpawnItemSyncAt(_itemId, _pos, _rot) ||
        n5SpawnItemObjectAt(_itemId, _pos, _rot);
      if (_obj) {
        if (n5RandomSpawnConfig) n5ApplyRandomItemConfig(_obj);
        return _obj;
      }
      return n5SpawnItemAt(_itemId, _pos, _rot || identityRotation)
        ? true
        : null;
    }
    function n5FreezeSpawnedObject(_obj, _pos) {
      if (!_obj || _obj === true) return false;
      try {
        const _tf = n5GetSpawnedObjectTransform(_obj);
        if (_tf && !_tf.isNull()) {
          try {
            _tf.method("set_position").invoke(_pos);
          } catch (_) {}
        }
      } catch (_) {}
      try {
        const _go = _obj.method("get_gameObject").invoke();
        if (!_go || _go.isNull()) return false;
        try {
          const _cols = _go
            .method("GetComponentsInChildren", 1)
            .inflate(ColliderCls)
            .invoke(true);
          for (let _i = 0; _cols && _i < _cols.length; _i++) {
            try {
              const _c = _cols.get(_i);
              if (_c && !_c.handle.isNull()) {
                try {
                  _c.method("set_isTrigger").invoke(true);
                } catch (_) {}
                try {
                  _c.method("set_enabled").invoke(false);
                } catch (_) {}
              }
            } catch (_) {}
          }
        } catch (_) {}
        try {
          const _rbs = _go
            .method("GetComponentsInChildren", 1)
            .inflate(RigidbodyCls)
            .invoke(true);
          for (let _i = 0; _rbs && _i < _rbs.length; _i++) {
            try {
              const _rb = _rbs.get(_i);
              if (_rb && !_rb.handle.isNull()) {
                try {
                  _rb.method("set_velocity").invoke([0, 0, 0]);
                } catch (_) {}
                try {
                  _rb.method("set_angularVelocity").invoke([0, 0, 0]);
                } catch (_) {}
                try {
                  _rb.method("set_useGravity").invoke(false);
                } catch (_) {}
                try {
                  _rb.method("set_detectCollisions").invoke(false);
                } catch (_) {}
                try {
                  _rb.method("set_isKinematic").invoke(true);
                } catch (_) {}
              }
            } catch (_) {}
          }
        } catch (_) {}
        return true;
      } catch (_) {
        return false;
      }
    }
    function n5SpawnHellOreAt(_pos, _rot) {
      const _obj = n5SpawnConfiguredItemAt(
        "item_ore_hell",
        _pos,
        _rot || identityRotation,
      );
      n5FreezeSpawnedObject(_obj, _pos);
      return _obj;
    }
    function n5SpawnContainerItemAt(_itemId, _pos, _rot) {
      const _obj =
        n5SpawnItemSyncAt(_itemId, _pos, _rot) ||
        n5SpawnItemObjectAt(_itemId, _pos, _rot);
      if (_obj) return _obj;
      try {
        n5SpawnItemAt(_itemId, _pos, _rot || identityRotation);
      } catch (_) {}
      return null;
    }
    function n5WindowsDocumentsPath() {
      try {
        const _env = Il2Cpp.corlib.class("System.Environment");
        const _up = n5ManagedString(
          _env
            .method("GetEnvironmentVariable", 1)
            .invoke(Il2Cpp.string("USERPROFILE")),
        );
        if (_up && _up !== "null" && _up !== "undefined")
          return _up.replace(/[\\\/]+$/, "") + "\\Documents";
      } catch (_) {}
      try {
        const _env = Il2Cpp.corlib.class("System.Environment");
        const _sf = _env.nested("SpecialFolder").field("MyDocuments").value;
        const _doc = n5ManagedString(
          _env.method("GetFolderPath", 1).invoke(_sf),
        );
        if (_doc && _doc !== "null" && _doc !== "undefined") return _doc;
      } catch (_) {}
      return "C:\\Users\\Public\\Documents";
    }
    function n5EnsureBlueprintDir() {
      const _dir = n5WindowsDocumentsPath() + "\\bp";
      try {
        const _dirCls = Il2Cpp.corlib.class("System.IO.Directory");
        if (!_dirCls.method("Exists", 1).invoke(Il2Cpp.string(_dir)))
          _dirCls.method("CreateDirectory", 1).invoke(Il2Cpp.string(_dir));
      } catch (_e) {
        console.error("[N5 Blueprint mkdir]", _e);
      }
      return _dir;
    }
    function n5BlueprintDirs() {
      const _win = n5EnsureBlueprintDir();
      return [
        _win,
        "/sdcard/Documents/bp",
        "/sdcard/Download/bp",
        "/storage/emulated/0/Documents/bp",
        "/storage/emulated/0/Download/bp",
      ];
    }
    function n5ManagedString(_s) {
      try {
        if (_s && typeof _s.content === "string") return _s.content;
      } catch (_) {}
      try {
        if (_s && _s.content) return String(_s.content);
      } catch (_) {}
      return String(_s);
    }
    function n5ReadTextFile(_path) {
      let _txt = null;
      try {
        const _fileCls = Il2Cpp.corlib.class("System.IO.File");
        if (!_fileCls.method("Exists", 1).invoke(Il2Cpp.string(_path)))
          return null;
        _txt = n5ManagedString(
          _fileCls.method("ReadAllText", 1).invoke(Il2Cpp.string(_path)),
        );
      } catch (_e) {
        console.error("[N5 Blueprint read]", _e);
      }
      return _txt;
    }
    function n5RefreshBlueprintFiles() {
      const _out = [];
      try {
        const _dirCls = Il2Cpp.corlib.class("System.IO.Directory");
        const _pathCls = Il2Cpp.corlib.class("System.IO.Path");
        const _dirs = n5BlueprintDirs();
        for (const _dir of _dirs) {
          try {
            if (!_dirCls.method("Exists", 1).invoke(Il2Cpp.string(_dir)))
              continue;
            const _files = _dirCls
              .method("GetFiles", 2)
              .invoke(Il2Cpp.string(_dir), Il2Cpp.string("*.json"));
            for (let _i = 0; _files && _i < _files.length; _i++) {
              try {
                const _entry = _files.get ? _files.get(_i) : _files[_i];
                const _path = n5ManagedString(_entry);
                if (!_path || _path.indexOf(".json") < 0) continue;
                const _name = n5ManagedString(
                  _pathCls
                    .method("GetFileName", 1)
                    .invoke(Il2Cpp.string(_path)),
                );
                _out.push({ name: _name, path: _path });
              } catch (_) {}
            }
            if (_out.length > 0) break;
          } catch (_) {}
        }
        if (_out.length === 0) {
          const _fileCls = Il2Cpp.corlib.class("System.IO.File");
          const _direct = n5EnsureBlueprintDir() + "\\blueprint example.json";
          try {
            if (_fileCls.method("Exists", 1).invoke(Il2Cpp.string(_direct)))
              _out.push({ name: "blueprint example.json", path: _direct });
          } catch (_) {}
        }
      } catch (_e) {
        console.error("[N5 Blueprint scan]", _e);
      }
      n5BlueprintFiles = _out;
      return _out;
    }
    function n5VecAdd(_a, _b) {
      return [
        (_a[0] || 0) + (_b[0] || 0),
        (_a[1] || 0) + (_b[1] || 0),
        (_a[2] || 0) + (_b[2] || 0),
      ];
    }
    function n5ScaleVec(_a, _s) {
      return [(_a[0] || 0) * _s, (_a[1] || 0) * _s, (_a[2] || 0) * _s];
    }
    function n5BlueprintVec(_v) {
      if (Array.isArray(_v)) return [_v[0] || 0, _v[1] || 0, _v[2] || 0];
      if (_v && typeof _v === "object")
        return [_v.x || 0, _v.y || 0, _v.z || 0];
      return [0, 0, 0];
    }
    function n5BlueprintQuat(_q) {
      if (!_q) return identityRotation;
      if (Array.isArray(_q)) {
        try {
          const _qq = QuaternionCls.alloc();
          _qq
            .method(".ctor")
            .overload(
              "System.Single",
              "System.Single",
              "System.Single",
              "System.Single",
            )
            .invoke(
              _q[0] || 0,
              _q[1] || 0,
              _q[2] || 0,
              (_q.length > 3 ? _q[3] : 1) || 0,
            );
          return _qq;
        } catch (_) {
          return [
            _q[0] || 0,
            _q[1] || 0,
            _q[2] || 0,
            (_q.length > 3 ? _q[3] : 1) || 0,
          ];
        }
      }
      if (typeof _q === "object") {
        try {
          const _qq = QuaternionCls.alloc();
          _qq
            .method(".ctor")
            .overload(
              "System.Single",
              "System.Single",
              "System.Single",
              "System.Single",
            )
            .invoke(
              _q.x || 0,
              _q.y || 0,
              _q.z || 0,
              ("w" in _q ? _q.w : 1) || 0,
            );
          return _qq;
        } catch (_) {
          return [_q.x || 0, _q.y || 0, _q.z || 0, ("w" in _q ? _q.w : 1) || 0];
        }
      }
      return identityRotation;
    }
    function n5ApplyBlueprintItemConfig(_obj, _cfg) {
      if (!_obj || !_cfg) return;
      try {
        let _go = _obj;
        try {
          _go = _obj.method("get_gameObject").invoke();
        } catch (_) {}
        let _gi = null;
        try {
          _gi = _go
            .method("GetComponent", 1)
            .inflate(GrabbableItemCls)
            .invoke();
        } catch (_) {}
        if (!_gi || (_gi.handle && _gi.handle.isNull()))
          try {
            _gi = _obj
              .method("GetComponent", 1)
              .inflate(GrabbableItemCls)
              .invoke();
          } catch (_) {}
        if (_gi && (!_gi.handle || !_gi.handle.isNull())) {
          if (typeof _cfg.scaleModifier === "number")
            try {
              _gi.method("set_scaleModifier").invoke(_cfg.scaleModifier);
            } catch (_) {}
          if (typeof _cfg.colorHue === "number")
            try {
              _gi.method("set_colorHue").invoke(_cfg.colorHue);
            } catch (_) {}
          if (typeof _cfg.colorSaturation === "number")
            try {
              _gi.method("set_colorSaturation").invoke(_cfg.colorSaturation);
            } catch (_) {}
        }
      } catch (_) {}
    }
    function n5SpawnBlueprintNode(_node, _origin, _scale, _countObj) {
      const _cfg = _node.item || _node;
      const _id = String(
        (_cfg && _cfg.itemID) || _node.itemID || "item_backpack_green",
      ).replace(/^item_prefab\//, "");
      const _local = Array.isArray(_node.pos) ? _node.pos : [0, 0, 0];
      const _rot = Array.isArray(_node.rot) ? _node.rot : identityRotation;
      const _pos = n5VecAdd(_origin, n5ScaleVec(_local, _scale));
      if (n5SpawnItemAt(_id, _pos, _rot)) _countObj.count++;
      const _kids = Array.isArray(_node.stuckChildren)
        ? _node.stuckChildren
        : [];
      for (const _kid of _kids)
        n5SpawnBlueprintNode(_kid, _pos, _scale, _countObj);
      return true;
    }
    function n5QueueBlueprintNode(_node, _origin, _scale, _queue) {
      const _cfg = _node.item || _node;
      const _id = String(
        (_cfg && _cfg.itemID) || _node.itemID || "item_backpack_green",
      ).replace(/^item_prefab\//, "");
      const _local = n5BlueprintVec(
        _node.pos || _node.position || _node.localPosition,
      );
      const _rot = n5BlueprintQuat(
        _node.rot || _node.rotation || _node.localRotation,
      );
      const _pos = n5VecAdd(_origin, n5ScaleVec(_local, _scale));
      _queue.push({ id: _id, pos: _pos, rot: _rot, cfg: _cfg });
      const _kids = Array.isArray(_node.stuckChildren)
        ? _node.stuckChildren
        : Array.isArray(_node.children)
          ? _node.children
          : [];
      for (const _kid of _kids)
        n5QueueBlueprintNode(_kid, _pos, _scale, _queue);
    }
    function n5ProcessBlueprintQueue() {
      if (!n5BlueprintQueue || n5BlueprintQueue.length === 0) return;
      let _spawned = 0;
      while (n5BlueprintQueue.length > 0 && _spawned < 8) {
        const _n = n5BlueprintQueue.shift();
        try {
          const _obj =
            n5SpawnItemSyncAt(_n.id, _n.pos, _n.rot) ||
            n5SpawnItemObjectAt(_n.id, _n.pos, _n.rot);
          if (_obj) n5ApplyBlueprintItemConfig(_obj, _n.cfg);
          else n5SpawnItemAt(_n.id, _n.pos, _n.rot);
          _spawned++;
        } catch (_) {}
      }
      if (n5BlueprintQueue.length === 0) {
        currentNotification = "Blueprint finished";
        notifactionResetTime = time + 2;
      }
    }
    function n5BlueprintGunOrigin() {
      try {
        const _g = getGunPointerResult(),
          _p = _g && _g.point;
        if (_p) return _p;
      } catch (_) {}
      try {
        const _rh =
          gorillaLocomotionInstance.field("rightHandTransform").value ||
          rightHandTransform;
        const _hp = _rh.method("get_position").invoke();
        const _hf = _rh.method("get_forward").invoke();
        return n5VecAdd(_hp, n5ScaleVec(_hf, 1.5));
      } catch (_) {}
      return n5LocalPlayerPos ? n5LocalPlayerPos() : [0, 0, 0];
    }
    function n5SpawnBlueprintFile(_path, _originOverride = null) {
      try {
        const _raw = n5ReadTextFile(_path);
        if (!_raw) {
          currentNotification = "Blueprint file not found";
          notifactionResetTime = time + 3;
          return;
        }
        const _bp = JSON.parse(_raw);
        const _items = Array.isArray(_bp.items) ? _bp.items : [_bp];
        const _origin = _originOverride || n5BlueprintGunOrigin();
        const _queue = [];
        for (const _it of _items)
          n5QueueBlueprintNode(_it, _origin, 0.025, _queue);
        n5BlueprintQueue = _queue;
        currentNotification = "Blueprint queued: " + _queue.length + " items";
        notifactionResetTime = time + 3;
      } catch (_e) {
        currentNotification = "Blueprint spawn failed";
        notifactionResetTime = time + 3;
        console.error("[N5 Blueprint spawn]", _e);
      }
    }
    function n5SelectedBlueprintFile() {
      const _files = n5BlueprintFiles.length
        ? n5BlueprintFiles
        : n5RefreshBlueprintFiles();
      if (!_files.length) return null;
      n5BlueprintIndex =
        ((n5BlueprintIndex % _files.length) + _files.length) % _files.length;
      return _files[n5BlueprintIndex];
    }
    function n5RunBlueprintGun() {
      if (!rightGrab || !rightTrigger || time < n5BlueprintGunDelay) return;
      n5BlueprintGunDelay = time + 0.45;
      const _file = n5SelectedBlueprintFile();
      if (!_file) {
        currentNotification = "No blueprint jsons in " + n5EnsureBlueprintDir();
        notifactionResetTime = time + 3;
        return;
      }
      n5SpawnBlueprintFile(_file.path, n5BlueprintGunOrigin());
    }
    function n5AddItemObjectToContainer(_itemObj, _container) {
      try {
        if (
          !_itemObj ||
          (_itemObj.handle && _itemObj.handle.isNull()) ||
          !_container ||
          _container.handle.isNull()
        )
          return false;
        let _go = _itemObj;
        try {
          _go = _itemObj.method("get_gameObject").invoke();
        } catch (_) {}
        let _gi = null,
          _ig = null;
        for (const _target of [_go, _itemObj]) {
          if (!_target || (_target.handle && _target.handle.isNull())) continue;
          if (!_gi || (_gi.handle && _gi.handle.isNull()))
            try {
              _gi = _target
                .method("GetComponent", 1)
                .inflate(GrabbableItemCls)
                .invoke();
            } catch (_) {}
          if (!_ig || (_ig.handle && _ig.handle.isNull()))
            try {
              _ig = _target
                .method("GetComponent", 1)
                .inflate(GrabbableObjectCls)
                .invoke();
            } catch (_) {}
        }
        const _addObj =
          _gi && (!_gi.handle || !_gi.handle.isNull()) ? _gi : _ig;
        if (!_addObj || (_addObj.handle && _addObj.handle.isNull()))
          return false;
        for (const _obj of [_gi, _ig, _addObj]) {
          if (!_obj || (_obj.handle && _obj.handle.isNull())) continue;
          try {
            _obj.method("set_allowAddToBag").invoke(true);
          } catch (_) {}
          try {
            _obj.field("_allowAddToBag").value = true;
          } catch (_) {}
          try {
            _obj.method("set_allowAddToQuiver").invoke(true);
          } catch (_) {}
          try {
            _obj.field("_allowAddToQuiver").value = true;
          } catch (_) {}
          try {
            _obj.method("set_disableAutoDespawnTimer").invoke(true);
          } catch (_) {}
          try {
            _obj.field("_disableAutoDespawnTimer").value = true;
          } catch (_) {}
        }
        for (const _m of [
          "AddToBagInternal",
          "AddToContainerInternal",
          "AttachToContainer",
          "SetContainer",
          "TryAddToBag",
        ]) {
          try {
            _addObj.method(_m).invoke(_container);
            return true;
          } catch (_) {}
        }
        for (const _m of [
          "TryAddItem",
          "TryToDrop",
          "CheckToAddItem",
          "HandleTryToDrop",
          "AddItem",
          "Add",
          "InsertItem",
          "AddGrabbable",
          "TryAddGrabbable",
        ]) {
          try {
            const _r = _container.method(_m).invoke(_addObj);
            if (_r === undefined || _r) return true;
          } catch (_) {}
          if (_gi && (!_gi.handle || !_gi.handle.isNull()))
            try {
              const _r = _container.method(_m).invoke(_gi);
              if (_r === undefined || _r) return true;
            } catch (_) {}
          if (_ig && (!_ig.handle || !_ig.handle.isNull()))
            try {
              const _r = _container.method(_m).invoke(_ig);
              if (_r === undefined || _r) return true;
            } catch (_) {}
        }
        try {
          const _itemTf =
            _go && (!_go.handle || !_go.handle.isNull())
              ? _go.method("get_transform").invoke()
              : getTransform(_itemObj);
          const _conTf = _container.method("get_transform").invoke();
          const _base = _conTf.method("get_position").invoke();
          const _off = [
            (Math.random() - 0.5) * 0.18,
            0.08 + Math.random() * 0.18,
            (Math.random() - 0.5) * 0.18,
          ];
          _itemTf.method("SetParent").invoke(_conTf, true);
          _itemTf
            .method("set_position")
            .invoke([
              (_base[0] || 0) + _off[0],
              (_base[1] || 0) + _off[1],
              (_base[2] || 0) + _off[2],
            ]);
          try {
            const _rb = _go
              .method("GetComponent", 1)
              .inflate(RigidbodyCls)
              .invoke();
            if (_rb && !_rb.handle.isNull()) {
              _rb.method("set_isKinematic").invoke(true);
              try {
                _rb.method("set_useGravity").invoke(false);
              } catch (_) {}
            }
          } catch (_) {}
          try {
            const _cols = _go
              .method("GetComponentsInChildren", 1)
              .inflate(ColliderCls)
              .invoke(true);
            for (let _ci = 0; _cols && _ci < _cols.length; _ci++) {
              try {
                const _c = _cols.get(_ci);
                if (_c && !_c.handle.isNull())
                  _c.method("set_enabled").invoke(false);
              } catch (_) {}
            }
          } catch (_) {}
          return true;
        } catch (_) {}
        return false;
      } catch (_e) {
        return false;
      }
    }
    function n5GetGameplayItemId(_obj) {
      if (!_obj || (_obj.handle && _obj.handle.isNull())) return "";
      const _read = (v) => {
        try {
          return v && v.content ? String(v.content) : String(v || "");
        } catch (_) {
          return "";
        }
      };
      try {
        const _id = _read(_obj.method("get_itemID").invoke());
        if (_id) return _id;
      } catch (_) {}
      try {
        const _id = _read(_obj.method("get_id").invoke());
        if (_id) return _id;
      } catch (_) {}
      try {
        const _id = _read(_obj.field("_itemID").value);
        if (_id) return _id;
      } catch (_) {}
      try {
        const _data = _obj.method("get_itemData").invoke();
        const _id = _read(_data.method("get_id").invoke());
        if (_id) return _id;
      } catch (_) {}
      return "";
    }
    function n5IsContainerItemObject(_obj) {
      const _id = n5GetGameplayItemId(_obj)
        .replace(/^item_prefab\//, "")
        .toLowerCase();
      return (
        _id.indexOf("item_quiver") === 0 || _id.indexOf("item_backpack") === 0
      );
    }
    function n5GetContainerFromItem(_obj) {
      if (!_obj || (_obj.handle && _obj.handle.isNull())) return null;
      try {
        let _go = _obj;
        try {
          _go = _obj.method("get_gameObject").invoke();
        } catch (_) {}
        const _names = [
          "AnimalCompany.IGrabbableObjectContainer",
          "AnimalCompany.GrabbableObjectContainer",
          "AnimalCompany.GrabbableItemContainer",
          "AnimalCompany.ItemContainer",
          "AnimalCompany.BackpackContainer",
          "AnimalCompany.QuiverContainer",
          "AnimalCompany.Quiver",
          "AnimalCompany.BackpackItem",
          "AnimalCompany.Bag",
          "AnimalCompany.GrabbableBag",
          "AnimalCompany.GrabbableObjectDropHandler",
        ];
        for (const _name of _names) {
          let _cls = null;
          if (!_cls)
            try {
              _cls = acImage.class(_name);
            } catch (_) {}
          if (!_cls) continue;
          const _targets = [_obj, _go];
          for (const _t of _targets) {
            if (!_t || (_t.handle && _t.handle.isNull())) continue;
            try {
              const _c = _t.method("GetComponent", 1).inflate(_cls).invoke();
              if (_c && !_c.handle.isNull()) return _c;
            } catch (_) {}
            try {
              const _c = _t
                .method("GetComponentInChildren", 1)
                .inflate(_cls)
                .invoke(true);
              if (_c && !_c.handle.isNull()) return _c;
            } catch (_) {}
            try {
              const _c = _t
                .method("GetComponentInParent", 1)
                .inflate(_cls)
                .invoke();
              if (_c && !_c.handle.isNull()) return _c;
            } catch (_) {}
          }
        }
      } catch (_e) {
        console.error("[N5 GetContainer]", _e);
      }
      return null;
    }
    function n5SpawnModdedQuiverAt(
      _pos,
      _id = itemIDs[itemIndex],
      _count = 15,
    ) {
      try {
        const _q =
          n5SpawnContainerItemAt("item_quiver", _pos, identityRotation) ||
          n5SpawnContainerItemAt("item_quiver_heart", _pos, identityRotation);
        if (!_q) {
          currentNotification = "quiver spawn failed";
          notifactionResetTime = time + 2;
          return false;
        }
        try {
          const _qc = n5GetContainerFromItem(_q);
          if (_qc) {
            try {
              _qc.method("set_capacity").invoke(18);
            } catch (_) {}
            try {
              _qc.field("_capacity").value = 18;
            } catch (_) {}
          }
        } catch (_) {}
        n5ApplyRandomItemConfig(_q);
        const _con = n5GetContainerFromItem(_q);
        let _filled = 0;
        const _fwd = rightHandTransform.method("get_forward").invoke();
        const _right = rightHandTransform.method("get_right").invoke();
        for (let _i = 0; _i < _count; _i++) {
          const _off = [
            (_pos[0] || 0) +
              (_right[0] || 0) * (((_i % 5) - 2) * 0.05) +
              (_fwd[0] || 0) * 0.04,
            (_pos[1] || 0) + 0.05 + Math.floor(_i / 5) * 0.05,
            (_pos[2] || 0) +
              (_right[2] || 0) * (((_i % 5) - 2) * 0.05) +
              (_fwd[2] || 0) * 0.04,
          ];
          const _it = n5SpawnContainerItemAt(_id, _off, identityRotation);
          if (!_it) continue;
          n5ApplyRandomItemConfig(_it);
          if (_con && n5AddItemObjectToContainer(_it, _con)) _filled++;
        }
        currentNotification =
          "Modded quiver " + _filled + "/" + _count + " " + _id;
        notifactionResetTime = time + 3;
        return true;
      } catch (_e) {
        console.error("[N5 ModdedQuiver]", _e);
        currentNotification = "modded quiver failed";
        notifactionResetTime = time + 2;
        return false;
      }
    }
    function n5PlayVFXAt(_type, _pos, _rot = identityRotation) {
      try {
        const _v = _type | 0;
        if (_v >= 1000) return n5PlayVisualAssetAt(_v - 1000, _pos, _rot);
        if (!n5VFXRateBypassInstalled) {
          try {
            ParticleManagerCls2.field("RPC_RATE_LIMIT_COOLDOWN").value = 0.0;
          } catch (_) {}
          try {
            ParticleManagerCls2.field("VFX_RATE_WINDOW").value = 0.0;
          } catch (_) {}
          try {
            ParticleManagerCls2.field("VFX_MAX_PLAYS_PER_WINDOW").value =
              2147483647;
          } catch (_) {}
          try {
            ParticleManagerCls2.method("AllowVFXFromSource", 1).implementation =
              () => true;
          } catch (_) {}
          n5VFXRateBypassInstalled = true;
        }
        try {
          const _limiter = ParticleManagerCls2.field("_rpcRateLimiter").value;
          if (_limiter && (!_limiter.handle || !_limiter.handle.isNull()))
            _limiter.field("m_nextAllowedTime").value = -1000000.0;
        } catch (_) {}
        const _emptyNullable = (_type) =>
          _type.class.fields
            .filter((_f) => !_f.isStatic)
            .map((_f) => {
              if (_f.name.toLowerCase().includes("hasvalue")) return 0;
              if (!_f.type.class.isValueType) return null;
              const _nested = _f.type.class.fields.filter(
                (_nf) => !_nf.isStatic,
              );
              return _nested.length ? _nested.map(() => 0) : 0;
            });
        try {
          const _play = ParticleManagerCls2.method("Play", 5).overload(
            "AnimalCompany.NetworkVFXType",
            "UnityEngine.Vector3",
            "UnityEngine.Quaternion",
            "System.Nullable<UnityEngine.Color>",
            "System.Single",
          );
          _play.invoke(
            _v,
            _pos,
            _rot,
            _emptyNullable(_play.parameters[3].type),
            100.0,
          );
          return true;
        } catch (_) {}
        try {
          const _playLocal = ParticleManagerCls2.method(
            "PlayLocal",
            5,
          ).overload(
            "AnimalCompany.NetworkVFXType",
            "UnityEngine.Vector3",
            "UnityEngine.Quaternion",
            "System.Nullable<UnityEngine.Color>",
            "System.Single",
          );
          _playLocal.invoke(
            _v,
            _pos,
            _rot,
            _emptyNullable(_playLocal.parameters[3].type),
            100.0,
          );
          return true;
        } catch (_) {}
        try {
          ParticleManagerCls2.method("PlayRemoteOnly", 4).invoke(
            _v,
            _pos,
            _rot,
            100.0,
          );
          return true;
        } catch (_) {}
        try {
          return n5PlayVisualAssetAt(n5NetworkVFXToAsset(_v), _pos, _rot);
        } catch (_) {}
      } catch (_e) {
        console.error("[N5 VFX]", _e);
      }
      return false;
    }
    function n5NetworkVFXToAsset(_type) {
      if (_type === 2) return 47;
      if (_type === 38) return 23;
      if (_type === 44) return 11;
      if (_type === 162) return 36;
      if (_type === 184) return 20;
      if (_type === 183) return 32;
      if (_type >= 128 && _type <= 130) return 45;
      if (_type === 72) return 48;
      return 31;
    }
    function n5PlayVisualAssetAt(_assetId, _pos, _rot = identityRotation) {
      try {
        const _asset = acImage
          .class("AnimalCompany.EnumExtension_VisualEffectAsset")
          .method("GetObject")
          .invoke(_assetId | 0);
        if (!_asset || (_asset.isNull && _asset.isNull())) return false;
        const _go = GameObjectCls.method("CreatePrimitive").invoke(3);
        try {
          _go
            .method("set_name")
            .invoke(Il2Cpp.string("N5_VFX_" + (_assetId | 0)));
        } catch (_) {}
        const _tf = getTransform(_go);
        try {
          _tf.method("set_position").invoke(_pos);
        } catch (_) {}
        try {
          _tf.method("set_rotation").invoke(_rot);
        } catch (_) {}
        try {
          _tf.method("set_localScale").invoke([0.01, 0.01, 0.01]);
        } catch (_) {}
        try {
          const _col = getComponent(_go, ColliderCls);
          if (_col) destroyObject(_col);
        } catch (_) {}
        try {
          const _rend = getComponent(_go, MeshRendererCls);
          if (_rend) destroyObject(_rend);
        } catch (_) {}
        const _vfxtype = Il2Cpp.domain
          .assembly("UnityEngine.VFXModule")
          .image.class("UnityEngine.VFX.VisualEffect");
        const _vfx = addComponent(_go, _vfxtype);
        _vfx.method("set_visualEffectAsset").invoke(_asset);
        try {
          _vfx.method("Reinit").invoke();
        } catch (_) {}
        try {
          _vfx.method("Play").invoke();
        } catch (_) {}
        try {
          UnityObjectCls.method("Destroy", 2).invoke(_go, 8.0);
        } catch (_) {}
        return true;
      } catch (_e) {
        console.error("[N5 VisualAssetVFX]", _e);
      }
      return false;
    }
    function n5PlayServerAudioAt(_sfxId, _pos) {
      try {
        const _id = (_sfxId | 0) & 32767;
        const _mgr = SFXManagerCls;
        let _played = false;
        try {
          _mgr
            .method("PlaySFXLocal", 5)
            .overload(
              "System.Int16",
              "UnityEngine.Vector3",
              "System.Single",
              "System.Single",
              "System.Single",
            )
            .invoke(_id, _pos, 1.0, 0.0, 1.0);
          _played = true;
        } catch (_) {}
        try {
          _mgr
            .method("PlaySFXLocal", 5)
            .overload(
              "System.Int16",
              "UnityEngine.Vector3",
              "System.Single",
              "System.Single",
              "System.Single",
            )
            .invoke(_id, n5LocalPlayerPos(), 1.0, 0.0, 1.0);
          _played = true;
        } catch (_) {}
        try {
          const _runner = _mgr.method("get__currentRunner").invoke();
          _mgr.method("RPC_PlaySFX").invoke(_runner, _id, 1, _pos, 1.0);
          _played = true;
        } catch (_rpcErr) {}
        try {
          _mgr
            .method("PlaySFXNetworked", 4)
            .overload(
              "System.Int16",
              "UnityEngine.Vector3",
              "System.Single",
              "AnimalCompany.AreaGroupID",
            )
            .invoke(_id, _pos, 1.0, 1);
          _played = true;
        } catch (_) {}
        return _played;
      } catch (_e) {
        console.error("[N5 ServerAudio]", _e);
      }
      return false;
    }
    function n5RunServerAudioGrip() {
      if (!rightGrab || time < n5ServerAudioDelay) return;
      n5ServerAudioDelay = time + 0.18;
      try {
        const _pos = rightHandTransform.method("get_position").invoke();
        n5PlayServerAudioAt(n5ServerAudioId, _pos);
      } catch (_) {}
    }
    function n5CreateGripPlatform(_isRight) {
      let _obj = _isRight ? n5RightPlatform : n5LeftPlatform;
      if (!_obj || (_obj.isNull && _obj.isNull())) {
        _obj = GameObjectCls.method("CreatePrimitive").invoke(3);
        try {
          _obj.method("set_layer").invoke(3);
        } catch (_) {}
        try {
          const _rb = _obj
            .method("AddComponent", 1)
            .inflate(RigidbodyCls)
            .invoke();
          _rb.method("set_isKinematic").invoke(true);
          _rb.method("set_useGravity").invoke(false);
        } catch (_) {}
        try {
          const _mat = _obj
            .method("GetComponent", 1)
            .inflate(MeshRendererCls)
            .invoke()
            .method("get_material")
            .invoke();
          _mat.method("set_shader").invoke(uiDefaultShader);
          _mat
            .method("set_color")
            .invoke(_isRight ? [1, 0.4, 0.2, 0.9] : [0.2, 0.6, 1, 0.9]);
        } catch (_) {}
        if (_isRight) n5RightPlatform = _obj;
        else n5LeftPlatform = _obj;
      }
      return _obj;
    }
    function n5UpdateGripPlatforms() {
      for (const _side of [false, true]) {
        const _grab = _side ? rightGrab : leftGrab,
          _hand = _side ? rightHandTransform : leftHandTransform;
        const _obj = _side ? n5RightPlatform : n5LeftPlatform;
        if (!_grab) {
          try {
            if (_obj) _obj.method("SetActive").invoke(false);
          } catch (_) {}
          continue;
        }
        try {
          const _p = _hand.method("get_position").invoke();
          const _rot = _hand.method("get_rotation").invoke();
          const _plat = n5CreateGripPlatform(_side);
          const _tf = _plat.method("get_transform").invoke();
          _tf
            .method("set_position")
            .invoke([_p[0] || 0, (_p[1] || 0) - 0.16, _p[2] || 0]);
          try {
            _tf.method("set_rotation").invoke(_rot);
          } catch (_) {}
          try {
            _tf.method("set_localScale").invoke([0.45, 0.05, 0.45]);
          } catch (_) {}
          _plat.method("SetActive").invoke(true);
        } catch (_e) {
          console.error("[N5 Platforms]", _e);
        }
      }
    }
    function n5DestroyGripPlatforms() {
      for (const _p of [n5LeftPlatform, n5RightPlatform])
        try {
          if (_p) destroyObject(_p);
        } catch (_) {}
      n5LeftPlatform = null;
      n5RightPlatform = null;
    }
    function n5LaunchItemObject(_itemObj, _dir, _power) {
      if (!_itemObj) return false;
      try {
        const _go = _itemObj.method("get_gameObject").invoke();
        if (_go && !_go.isNull()) {
          let _rb = null;
          try {
            _rb = _go.method("GetComponent", 1).inflate(RigidbodyCls).invoke();
          } catch (_) {}
          if ((!_rb || _rb.handle.isNull()) && _go) {
            try {
              _rb = _go
                .method("GetComponentInChildren", 1)
                .inflate(RigidbodyCls)
                .invoke();
            } catch (_) {}
          }
          if (_rb && !_rb.handle.isNull()) {
            try {
              _rb.method("set_isKinematic").invoke(false);
            } catch (_) {}
            try {
              _rb.method("set_detectCollisions").invoke(true);
            } catch (_) {}
            _rb
              .method("AddForce", 2)
              .invoke(
                Vector3Cls.method("op_Multiply", 2).invoke(_dir, _power),
                1,
              );
            return true;
          }
        }
      } catch (_) {}
      try {
        _itemObj
          .method("RPC_AddForce")
          .invoke(Vector3Cls.method("op_Multiply", 2).invoke(_dir, _power));
        return true;
      } catch (_) {}
      return false;
    }
    function n5SpawnMobAt(_mobId, _pos, _rot) {
      try {
        n5EnableMobValidatorBypass();
        n5EnableSpawnGuardBypass();
        const PrefabGen = acImage.class("AnimalCompany.PrefabGenerator");
        const _beforeMobSpawn = n5GetBeforeMobSpawnDelegate();
        const _resolved = n5ResolveMobID(_mobId);
        if (_resolved === null) {
          const _name = String(_mobId || "").replace(/^mob_prefab\//, "");
          const _fb =
            spawnNetworkPrefab(_name, _pos, _rot || identityRotation) ||
            spawnNetworkPrefab(
              "mob_prefab/" + _name,
              _pos,
              _rot || identityRotation,
            );
          return !!_fb;
        }
        try {
          const _mobPrefab = PrefabGen.method("GetMobPrefab", 1).invoke(
            _resolved,
          );
          if (
            _mobPrefab &&
            (!_mobPrefab.handle || !_mobPrefab.handle.isNull())
          ) {
            const _networkObjectCls = Il2Cpp.domain
              .assembly("Fusion.Runtime")
              .image.class("Fusion.NetworkObject");
            let _networkObject = null;
            try {
              _networkObject = _mobPrefab
                .method("GetComponent", 1)
                .inflate(_networkObjectCls)
                .invoke();
            } catch (_) {}
            if (
              !_networkObject ||
              (_networkObject.handle && _networkObject.handle.isNull())
            ) {
              try {
                const _go = _mobPrefab.method("get_gameObject").invoke();
                _networkObject = _go
                  .method("GetComponent", 1)
                  .inflate(_networkObjectCls)
                  .invoke();
              } catch (_) {}
            }
            let _runner = null;
            try {
              _runner = NetworkManagerCls.method("get_instance")
                .invoke()
                .method("get_currentRunner")
                .invoke();
            } catch (_) {}
            if (!_runner || _runner.isNull())
              try {
                _runner = PrefabGeneratorCls.field("_instance")
                  .value.method("get_runner")
                  .invoke();
              } catch (_) {}
            const _spawned = n5SpawnResolvedNetworkObject(
              _runner,
              _networkObject,
              _pos,
              _rot || identityRotation,
              _beforeMobSpawn || null,
            );
            if (_spawned) return true;
          }
        } catch (_prefabErr) {}
        try {
          PrefabGen.method("SpawnMobAsync", 6)
            .overload(
              "AnimalCompany.MobID",
              "UnityEngine.Vector3",
              "UnityEngine.Quaternion",
              "Fusion.NetworkRunner.OnBeforeSpawned",
              "Fusion.NetworkObjectSpawnDelegate",
              "System.String",
            )
            .invoke(
              _resolved,
              _pos,
              _rot || identityRotation,
              _beforeMobSpawn || null,
              null,
              Il2Cpp.string("WorldScript"),
            );
          return true;
        } catch (_directErr) {}
        try {
          PrefabGen.method("SpawnMob", 4).invoke(
            _resolved,
            _pos,
            _rot || identityRotation,
            nullObjectRef,
          );
          return true;
        } catch (_syncErr) {}
        try {
          PrefabGen.method("SpawnMob", 5).invoke(
            _resolved,
            _pos,
            _rot || identityRotation,
            nullObjectRef,
            Il2Cpp.string("mod"),
          );
          return true;
        } catch (_syncNamedErr) {}
        try {
          PrefabGen.method("SpawnMobNearbyAsync", 6)
            .overload(
              "AnimalCompany.MobID",
              "UnityEngine.Vector3",
              "System.Single",
              "Fusion.NetworkRunner.OnBeforeSpawned",
              "Fusion.NetworkObjectSpawnDelegate",
              "System.String",
            )
            .invoke(
              _resolved,
              _pos,
              8.0,
              _beforeMobSpawn || null,
              null,
              Il2Cpp.string("WorldScript"),
            );
          return true;
        } catch (_nearbyErr) {}
        PrefabGen.method("SpawnMobNearbyPlayerAsync", 5)
          .overload(
            "AnimalCompany.MobID",
            "System.Single",
            "Fusion.NetworkRunner.OnBeforeSpawned",
            "Fusion.NetworkObjectSpawnDelegate",
            "System.String",
          )
          .invoke(
            _resolved,
            8.0,
            _beforeMobSpawn || null,
            null,
            Il2Cpp.string("WorldScript"),
          );
        return true;
      } catch (_e) {
        try {
          const _name = String(_mobId || "").replace(/^mob_prefab\//, "");
          const _fb =
            spawnNetworkPrefab(_name, _pos, _rot || identityRotation) ||
            spawnNetworkPrefab(
              "mob_prefab/" + _name,
              _pos,
              _rot || identityRotation,
            );
          return !!_fb;
        } catch (_e2) {
          console.error("[N5 SpawnMobAt scoped]", _e, _e2);
          return false;
        }
      }
    }
    function n5ClearOrbitFuckery() {
      for (const _obj of n5OrbitFuckeryObjects) {
        if (!_obj) continue;
        try {
          const _runner = _obj.method("get_Runner").invoke();
          if (_runner && !_runner.isNull())
            _runner.method("Despawn").invoke(_obj);
        } catch (_e) {
          try {
            getTransform(_obj).method("set_position").invoke([0, -99999, 0]);
          } catch (_e2) {}
        }
      }
      n5OrbitFuckeryObjects = [];
      n5OrbitFuckeryOrbiters = [];
    }
    function n5RunPrefabOrbit(_prefabName, _count, _radius, _height) {
      try {
        const _center = acImage
          .class("AnimalCompany.PlayerController")
          .method("get_instance")
          .invoke()
          .method("get_head")
          .invoke();
        if (!_center || _center.handle.isNull()) return;
        if (
          n5OrbitFuckeryObjects.length < _count ||
          n5OrbitFuckeryPrefabName !== _prefabName
        ) {
          n5ClearOrbitFuckery();
          n5OrbitFuckeryPrefabName = _prefabName;
          const _centerPos = _center.method("get_position").invoke();
          for (let _i = 0; _i < _count; _i++) {
            const _angle = ((Math.PI * 2) / 8) * _i;
            const _offset = Vector3Cls.alloc();
            _offset
              .method(".ctor")
              .overload("System.Single", "System.Single", "System.Single")
              .invoke(
                Math.cos(_angle) * _radius,
                _height,
                Math.sin(_angle) * _radius,
              );
            const _spawnPos = Vector3Cls.method("op_Addition").invoke(
              _centerPos,
              [
                _offset.field("x").value,
                _offset.field("y").value,
                _offset.field("z").value,
              ],
            );
            const _obj = spawnNetworkPrefab(
              _prefabName,
              _spawnPos,
              QuaternionCls.method("get_identity").invoke(),
            );
            if (!_obj) continue;
            n5OrbitFuckeryObjects.push(_obj);
            try {
              const _tf = _obj
                .method("get_gameObject")
                .invoke()
                .method("get_transform")
                .invoke();
              n5OrbitFuckeryOrbiters.push({ transform: _tf, angle: _angle });
            } catch (_e) {}
          }
        }
        const _pos = _center.method("get_position").invoke();
        const _dt = TimeCls.method("get_deltaTime").invoke();
        for (const _orb of n5OrbitFuckeryOrbiters) {
          try {
            _orb.angle += 1.5 * _dt;
            const _offset = Vector3Cls.alloc();
            _offset
              .method(".ctor")
              .overload("System.Single", "System.Single", "System.Single")
              .invoke(
                Math.cos(_orb.angle) * _radius,
                _height,
                Math.sin(_orb.angle) * _radius,
              );
            const _newPos = Vector3Cls.method("op_Addition").invoke(_pos, [
              _offset.field("x").value,
              _offset.field("y").value,
              _offset.field("z").value,
            ]);
            _orb.transform.method("set_position").invoke(_newPos);
          } catch (_e) {}
        }
      } catch (_e) {
        console.error("[N5 PrefabOrbit scoped]", _e);
      }
    }
    function n5ClearTowerOrbit() {
      for (const _obj of n5TowerOrbitObjects) {
        try {
          if (_obj) n5DespawnPrefabObj(_obj);
        } catch (_) {}
      }
      n5TowerOrbitObjects = [];
      n5TowerOrbitOrbiters = [];
    }
    function n5RunSellingTowerOrbit() {
      try {
        const _center = acImage
          .class("AnimalCompany.PlayerController")
          .method("get_instance")
          .invoke()
          .method("get_head")
          .invoke();
        if (!_center || _center.handle.isNull()) return;
        const _heights = [-3.3, 0.0, 3.3],
          _per = 24,
          _radius = 5.6;
        if (n5TowerOrbitObjects.length < _heights.length * _per) {
          n5ClearTowerOrbit();
          const _centerPos = _center.method("get_position").invoke();
          for (const _h of _heights) {
            for (let _i = 0; _i < _per; _i++) {
              const _angle = ((Math.PI * 2) / _per) * _i;
              const _offset = Vector3Cls.alloc();
              _offset
                .method(".ctor")
                .overload("System.Single", "System.Single", "System.Single")
                .invoke(
                  Math.cos(_angle) * _radius,
                  _h,
                  Math.sin(_angle) * _radius,
                );
              const _spawnPos = Vector3Cls.method("op_Addition").invoke(
                _centerPos,
                [
                  _offset.field("x").value,
                  _offset.field("y").value,
                  _offset.field("z").value,
                ],
              );
              const _obj = spawnNetworkPrefab(
                "ItemSellingMachineController",
                _spawnPos,
                QuaternionCls.method("get_identity").invoke(),
              );
              if (!_obj) continue;
              n5TowerOrbitObjects.push(_obj);
              try {
                const _tf = _obj
                  .method("get_gameObject")
                  .invoke()
                  .method("get_transform")
                  .invoke();
                n5TowerOrbitOrbiters.push({
                  transform: _tf,
                  angle: _angle,
                  height: _h,
                });
              } catch (_) {}
            }
          }
        }
        const _pos = _center.method("get_position").invoke();
        const _dt = TimeCls.method("get_deltaTime").invoke();
        for (const _orb of n5TowerOrbitOrbiters) {
          try {
            _orb.angle += 0.95 * _dt;
            const _offset = Vector3Cls.alloc();
            _offset
              .method(".ctor")
              .overload("System.Single", "System.Single", "System.Single")
              .invoke(
                Math.cos(_orb.angle) * _radius,
                _orb.height,
                Math.sin(_orb.angle) * _radius,
              );
            const _newPos = Vector3Cls.method("op_Addition").invoke(_pos, [
              _offset.field("x").value,
              _offset.field("y").value,
              _offset.field("z").value,
            ]);
            _orb.transform.method("set_position").invoke(_newPos);
          } catch (_) {}
        }
      } catch (_e) {
        console.error("[N5 SellingTowerOrbit scoped]", _e);
      }
    }
    function n5DisablePrefabCollisions(_obj) {
      if (!_obj || (_obj.handle && _obj.handle.isNull())) return;
      try {
        const _go = _obj.method("get_gameObject").invoke();
        if (!_go || _go.isNull()) return;
        try {
          const _cols = _go
            .method("GetComponentsInChildren", 1)
            .inflate(ColliderCls)
            .invoke(true);
          for (let _i = 0; _cols && _i < _cols.length; _i++) {
            try {
              const _c = _cols.get(_i);
              if (_c && !_c.handle.isNull()) {
                try {
                  _c.method("set_enabled").invoke(false);
                } catch (_) {}
                try {
                  _c.method("set_isTrigger").invoke(true);
                } catch (_) {}
              }
            } catch (_) {}
          }
        } catch (_) {}
        try {
          const _rbs = _go
            .method("GetComponentsInChildren", 1)
            .inflate(RigidbodyCls)
            .invoke(true);
          for (let _i = 0; _rbs && _i < _rbs.length; _i++) {
            try {
              const _rb = _rbs.get(_i);
              if (_rb && !_rb.handle.isNull()) {
                try {
                  _rb.method("set_isKinematic").invoke(true);
                } catch (_) {}
                try {
                  _rb.method("set_detectCollisions").invoke(false);
                } catch (_) {}
              }
            } catch (_) {}
          }
        } catch (_) {}
      } catch (_e) {
        console.error("[N5 DisablePrefabCollisions scoped]", _e);
      }
    }
    function n5GetSpawnedObjectTransform(_obj) {
      if (!_obj) return null;
      try {
        const _go = _obj.method("get_gameObject").invoke();
        if (_go && !_go.isNull()) return _go.method("get_transform").invoke();
      } catch (_) {}
      try {
        return _obj.method("get_transform").invoke();
      } catch (_) {}
      try {
        return getTransform(_obj);
      } catch (_) {}
      return null;
    }
    function n5DespawnPrefabObj(_obj) {
      if (!_obj) return;
      try {
        const _runner = PrefabGeneratorCls.field("_instance")
          .value.method("get_runner")
          .invoke();
        try {
          if (_runner && !_runner.isNull())
            _runner.method("Despawn", 1).invoke(_obj);
        } catch (_) {
          try {
            getTransform(_obj).method("set_position").invoke([0, -99999, 0]);
          } catch (_2) {}
        }
      } catch (_) {
        try {
          getTransform(_obj).method("set_position").invoke([0, -99999, 0]);
        } catch (_2) {}
      }
    }
    function n5HandForwardPose(_dist = 0.55) {
      const _hand =
        gorillaLocomotionInstance.field("rightHandTransform").value ||
        rightHandTransform;
      const _hp = _hand.method("get_position").invoke();
      const _hf = _hand.method("get_forward").invoke();
      const _hr = _hand.method("get_rotation").invoke();
      return {
        hand: _hand,
        pos: [
          (_hp[0] || 0) + (_hf[0] || 0) * _dist,
          (_hp[1] || 0) + (_hf[1] || 0) * _dist,
          (_hp[2] || 0) + (_hf[2] || 0) * _dist,
        ],
        forward: _hf,
        rot: _hr,
      };
    }
    function n5StartHeldPrefab(_prefabName) {
      try {
        if (
          disableDangerousPrefabs &&
          dangerousPrefabs.indexOf(_prefabName) >= 0
        ) {
          currentNotification = "Dangerous prefab blocked";
          notifactionResetTime = time + 2;
          return;
        }
        n5DespawnPrefabObj(n5HeldPrefabObj);
        n5HeldPrefabObj = null;
        n5HeldPrefabTransform = null;
        n5HeldPrefabEnabled = true;
        n5HeldPrefabName = _prefabName;
        const _pose = n5HandForwardPose(0.55);
        const _obj = spawnNetworkPrefab(_prefabName, _pose.pos, _pose.rot);
        if (_obj) {
          n5HeldPrefabObj = _obj;
          n5HeldPrefabTransform = n5GetSpawnedObjectTransform(_obj);
          n5DisablePrefabCollisions(_obj);
          n5UpdateHeldPrefab();
          currentNotification = "Holding prefab: " + _prefabName;
          notifactionResetTime = time + 2;
        } else {
          currentNotification = "Hold prefab retrying: " + _prefabName;
          notifactionResetTime = time + 2;
        }
      } catch (_e) {
        console.error("[N5 HoldPrefab start]", _e);
      }
    }
    function n5StopHeldPrefab() {
      n5DespawnPrefabObj(n5HeldPrefabObj);
      n5HeldPrefabObj = null;
      n5HeldPrefabTransform = null;
      n5HeldPrefabEnabled = false;
      n5HeldPrefabName = "";
      currentNotification = "Stopped holding prefab";
      notifactionResetTime = time + 2;
    }
    function n5UpdateHeldPrefab() {
      if (!n5HeldPrefabEnabled) return;
      try {
        if (!n5HeldPrefabObj || n5HeldPrefabObj.handle.isNull()) {
          const _nm = n5HeldPrefabName;
          n5HeldPrefabObj = null;
          n5HeldPrefabTransform = null;
          if (_nm) {
            const _pose = n5HandForwardPose(0.55);
            const _obj = spawnNetworkPrefab(_nm, _pose.pos, _pose.rot);
            if (_obj) {
              n5HeldPrefabObj = _obj;
              n5HeldPrefabTransform = n5GetSpawnedObjectTransform(_obj);
              try {
                n5DisablePrefabCollisions(_obj);
              } catch (_) {}
            }
          }
          return;
        }
        if (!n5HeldPrefabTransform) {
          n5HeldPrefabTransform = n5GetSpawnedObjectTransform(n5HeldPrefabObj);
        }
        if (!n5HeldPrefabTransform) return;
        const _hand =
          gorillaLocomotionInstance.field("rightHandTransform").value ||
          rightHandTransform;
        const _hp = _hand.method("get_position").invoke();
        const _hf = _hand.method("get_forward").invoke();
        const _hr = _hand.method("get_rotation").invoke();
        const _pos = [
          (_hp[0] || 0) + (_hf[0] || 0) * 0.28,
          (_hp[1] || 0) + (_hf[1] || 0) * 0.28,
          (_hp[2] || 0) + (_hf[2] || 0) * 0.28,
        ];
        n5HeldPrefabTransform.method("set_position").invoke(_pos);
        try {
          n5HeldPrefabTransform.method("set_rotation").invoke(_hr);
        } catch (_) {}
        try {
          n5DisablePrefabCollisions(n5HeldPrefabObj);
        } catch (_) {}
      } catch (_e) {
        n5HeldPrefabObj = null;
        n5HeldPrefabTransform = null;
      }
    }
    function n5StartLarpPrefab(_prefabName) {
      try {
        if (
          disableDangerousPrefabs &&
          dangerousPrefabs.indexOf(_prefabName) >= 0
        ) {
          currentNotification = "Dangerous prefab blocked";
          notifactionResetTime = time + 2;
          return;
        }
        n5DespawnPrefabObj(n5LarpPrefabObj);
        const _lp = NetPlayerCls.method("get_localPlayer").invoke();
        if (!_lp) {
          currentNotification = "no local player";
          notifactionResetTime = time + 2;
          return;
        }
        const _pos = getTransform(_lp).method("get_position").invoke();
        const _obj = spawnNetworkPrefab(_prefabName, _pos, identityRotation);
        if (_obj) {
          n5LarpPrefabObj = _obj;
          n5LarpPrefabEnabled = true;
          n5LarpPrefabName = _prefabName;
          n5DisablePrefabCollisions(_obj);
          currentNotification = "Larping as: " + _prefabName;
          notifactionResetTime = time + 3;
        } else {
          currentNotification = "Larp spawn failed";
          notifactionResetTime = time + 2;
        }
      } catch (_e) {
        console.error("[N5 LarpPrefab start]", _e);
      }
    }
    function n5StopLarpPrefab() {
      n5DespawnPrefabObj(n5LarpPrefabObj);
      n5LarpPrefabObj = null;
      n5LarpPrefabEnabled = false;
      n5LarpPrefabName = "";
      currentNotification = "Stopped larping";
      notifactionResetTime = time + 2;
    }
    function n5UpdateLarpPrefab() {
      if (!n5LarpPrefabEnabled || !n5LarpPrefabObj) return;
      try {
        if (n5LarpPrefabObj.handle.isNull()) {
          n5LarpPrefabObj = null;
          n5LarpPrefabEnabled = false;
          return;
        }
        const _lp = NetPlayerCls.method("get_localPlayer").invoke();
        if (!_lp) return;
        const _pos = getTransform(_lp).method("get_position").invoke();
        const _rot = getTransform(_lp).method("get_rotation").invoke();
        const _tf = getTransform(n5LarpPrefabObj);
        _tf.method("set_position").invoke(_pos);
        try {
          _tf.method("set_rotation").invoke(_rot);
        } catch (_) {}
      } catch (_e) {
        n5LarpPrefabObj = null;
        n5LarpPrefabEnabled = false;
      }
    }
    function n5KickPlayerObject(_player) {
      if (!_player || _player.handle.isNull()) return false;
      try {
        const _rpc = acImage.class("AnimalCompany.NetSessionRPCs");
        const _inst = _rpc.field("_instance").value;
        const _uid = _player.field("_userID").value;
        _n5OutgoingKick = true;
        try {
          try {
            if (_inst) _inst.method("RPC_KickPlayer").invoke(_uid);
          } catch (_e1) {}
          try {
            _rpc.method("KickPlayer").invoke(_uid);
          } catch (_e2) {}
        } finally {
          _n5OutgoingKick = false;
        }
        return true;
      } catch (_e) {
        console.error("[N5 KickPlayer scoped]", _e);
        _n5OutgoingKick = false;
        return false;
      }
    }
    function n5GetPlayerUserId(_rig) {
      try {
        const _s = n5ValueString(_rig.method("get_userID").invoke());
        if (_s && _s !== "null" && _s !== "???" && _s !== "[object Object]")
          return _s;
      } catch (_) {}
      try {
        const _s = n5ValueString(_rig.field("_userID").value);
        if (_s && _s !== "null" && _s !== "???" && _s !== "[object Object]")
          return _s;
      } catch (_) {}
      try {
        const _s = n5ValueString(_rig.field("userID").value);
        if (_s && _s !== "null" && _s !== "???" && _s !== "[object Object]")
          return _s;
      } catch (_) {}
      try {
        const _pid = _rig.method("get_playerID").invoke();
        return "pid:" + _pid;
      } catch (_) {}
      return "";
    }
    function n5ValueString(_v) {
      try {
        if (_v && typeof _v.content === "string") return _v.content;
      } catch (_) {}
      try {
        if (_v && _v.value !== undefined) return n5ValueString(_v.value);
      } catch (_) {}
      try {
        if (_v && _v.method)
          return n5ValueString(_v.method("get_Value").invoke());
      } catch (_) {}
      try {
        const _m = n5ManagedString(_v);
        if (
          _m &&
          _m !== "???" &&
          _m !== "null" &&
          _m !== "undefined" &&
          _m !== "[object Object]"
        )
          return _m;
      } catch (_) {}
      try {
        if (_v && _v.toString) return String(_v.toString());
      } catch (_) {}
      return String(_v || "");
    }
    function n5GetPlayerDisplayName(_rig) {
      try {
        const _s = n5ValueString(_rig.method("get_displayName").invoke());
        if (_s && _s !== "null" && _s !== "???" && _s !== "[object Object]")
          return _s;
      } catch (_) {}
      try {
        const _s = n5ValueString(_rig.field("cache_displayName").value);
        if (_s && _s !== "null" && _s !== "???" && _s !== "[object Object]")
          return _s;
      } catch (_) {}
      try {
        const _s = n5ValueString(_rig.field("_displayName").value);
        if (_s && _s !== "null" && _s !== "???" && _s !== "[object Object]")
          return _s;
      } catch (_) {}
      try {
        const _s = n5ValueString(_rig.field("displayName").value);
        if (_s && _s !== "null" && _s !== "???" && _s !== "[object Object]")
          return _s;
      } catch (_) {}
      const _uid = n5GetPlayerUserId(_rig);
      return _uid ? "Player " + _uid.slice(0, 8) : "Unknown";
    }
    function n5CollectionToArray(_col) {
      const _out = [];
      if (!_col || (_col.handle && _col.handle.isNull())) return _out;
      let _vals = _col;
      try {
        _vals = _col.method("get_Values").invoke();
      } catch (_) {}
      try {
        _vals = _col.field("Values").value;
      } catch (_) {}
      try {
        const _en = _vals.method("GetEnumerator").invoke();
        while (_en.method("MoveNext").invoke()) {
          let _cur = _en.method("get_Current").invoke();
          try {
            _cur = _cur.method("get_Value").invoke();
          } catch (_) {}
          try {
            if (_cur && _cur.field) {
              const _v = _cur.field("value").value;
              if (_v) _cur = _v;
            }
          } catch (_) {}
          if (_cur && (!_cur.handle || !_cur.handle.isNull())) _out.push(_cur);
        }
      } catch (_) {}
      if (_out.length === 0) {
        let _len = 0;
        try {
          _len = _vals.length;
        } catch (_) {}
        try {
          if (!_len) _len = _vals.method("get_Count").invoke();
        } catch (_) {}
        try {
          if (!_len) _len = _vals.method("get_Length").invoke();
        } catch (_) {}
        for (let _i = 0; _i < _len; _i++) {
          let _v = null;
          try {
            _v = _vals.get ? _vals.get(_i) : null;
          } catch (_) {}
          try {
            if (!_v) _v = _vals.method("get_Item").invoke(_i);
          } catch (_) {}
          try {
            if (!_v) _v = _vals.method("GetValue").invoke(_i);
          } catch (_) {}
          if (!_v)
            try {
              _v = _vals[_i];
            } catch (_) {}
          if (_v && (!_v.handle || !_v.handle.isNull())) _out.push(_v);
        }
      }
      return _out;
    }
    function n5AllNetPlayers() {
      const _out = [];
      const _push = (_pl) => {
        try {
          if (_pl && (!_pl.handle || !_pl.handle.isNull())) _out.push(_pl);
        } catch (_) {}
      };
      try {
        const _net = acImage.class("AnimalCompany.NetPlayer");
        for (const _src of [
          () => _net.method("get_spawnedPlayers").invoke(),
          () => _net.field("_spawnedPlayers").value,
          () => _net.field("playerIDToNetPlayer").value,
        ]) {
          try {
            for (const _pl of n5CollectionToArray(_src())) _push(_pl);
          } catch (_) {}
        }
        try {
          _push(_net.method("get_localPlayer").invoke());
        } catch (_) {}
      } catch (_) {}
      try {
        const _en = NetPlayerCls.field("playerIDToNetPlayer")
          .value.method("get_Values")
          .invoke()
          .method("GetEnumerator")
          .invoke();
        while (_en.method("MoveNext").invoke())
          _push(_en.method("get_Current").invoke());
      } catch (_) {}
      try {
        for (const _pl of n5FindAllClass("AnimalCompany.NetPlayer")) _push(_pl);
      } catch (_e) {}
      const _dedup = [],
        _seen = new Set();
      for (const _pl of _out) {
        let _key = "";
        try {
          _key = n5GetPlayerUserId(_pl) || String(_pl.handle || _pl);
        } catch (_) {
          _key = String(_pl);
        }
        if (_seen.has(_key)) continue;
        _seen.add(_key);
        _dedup.push(_pl);
      }
      return _dedup;
    }
    function n5RefreshUsersCategory() {
      try {
        const _players = n5AllNetPlayers();
        if (n5UserIndex >= _players.length)
          n5UserIndex = Math.max(0, _players.length - 1);
        menuCategories[33] = n5BuildUsersCategory();
        _iterMob = new Map();
        menuCategories.flat().forEach((_b) => _iterMob.set(_b.buttonText, _b));
        _n5MenuLastCat = -1;
        _n5MenuLastPage = -1;
        _n5FlatDirty = true;
        currentNotification = "Users refreshed: " + _players.length;
        notifactionResetTime = time + 2;
        return _players.length;
      } catch (_e) {
        console.error("[N5 RefreshUsers]", _e);
        currentNotification = "Users refresh failed";
        notifactionResetTime = time + 2;
        return 0;
      }
    }
    function n5SelectedUser() {
      const _players = n5AllNetPlayers();
      if (_players.length === 0) return null;
      n5UserIndex =
        ((n5UserIndex % _players.length) + _players.length) % _players.length;
      return _players[n5UserIndex];
    }
    function n5IsLocalPlayer(_rig) {
      try {
        return !!_rig.method("get_IsMine").invoke();
      } catch (_) {}
      try {
        return !!_rig.method("get_IsMine").invoke();
      } catch (_) {}
      try {
        return !!_rig.property("IsMine").value;
      } catch (_) {}
      return false;
    }
    function n5AllRemoteUsers() {
      const _out = [];
      for (const _pl of n5AllNetPlayers()) {
        try {
          if (
            !_pl ||
            (_pl.handle && _pl.handle.isNull()) ||
            n5IsLocalPlayer(_pl)
          )
            continue;
          _out.push(_pl);
        } catch (_) {}
      }
      return _out;
    }
    function n5ForUsers(_users, _fn) {
      let _ok = 0;
      for (const _u of _users) {
        try {
          if (_fn(_u)) _ok++;
        } catch (_e) {
          console.error("[N5 Users action]", _e);
        }
      }
      return _ok;
    }
    function n5GetPlayerPosition(_u) {
      if (!_u || (_u.handle && _u.handle.isNull())) return null;
      try {
        const _t = getTransform(_u);
        if (_t && !_t.isNull()) return _t.method("get_position").invoke();
      } catch (_) {}
      try {
        const _ar = _u.field("avatarRoot").value;
        if (_ar && !_ar.isNull()) return _ar.method("get_position").invoke();
      } catch (_) {}
      try {
        const _b = _u.field("body").value;
        if (_b && !_b.isNull()) return _b.method("get_position").invoke();
      } catch (_) {}
      try {
        return _u
          .method("get_transform")
          .invoke()
          .method("get_position")
          .invoke();
      } catch (_) {}
      return null;
    }
    function n5TeleportUserToPosition(_u, _pos) {
      if (!_u || !_pos || (_u.handle && _u.handle.isNull())) return false;
      let _ok = false;
      try {
        _u.method("Teleport", 1).invoke(_pos);
        _ok = true;
      } catch (_) {}
      try {
        _u.method("RPC_Teleport", 1).invoke(_pos);
        _ok = true;
      } catch (_) {}
      try {
        _u.method("set_n_position").invoke(_pos);
        _ok = true;
      } catch (_) {}
      try {
        const _t = getTransform(_u);
        if (_t && !_t.isNull()) {
          _t.method("set_position").invoke(_pos);
          _ok = true;
        }
      } catch (_) {}
      try {
        const _ar = _u.field("avatarRoot").value;
        if (_ar && !_ar.isNull()) {
          _ar.method("set_position").invoke(_pos);
          _ok = true;
        }
      } catch (_) {}
      try {
        const _b = _u.field("body").value;
        if (_b && !_b.isNull()) {
          _b.method("set_position").invoke(_pos);
          _ok = true;
        }
      } catch (_) {}
      return _ok;
    }
    function n5TeleTargetValue(_value) {
      if (typeof _value === "number") return _value;
      try {
        if (typeof _value.value === "number") return _value.value;
      } catch (_) {}
      try {
        if (typeof _value.value__ === "number") return _value.value__;
      } catch (_) {}
      const _parsed = Number(_value);
      return Number.isFinite(_parsed) ? _parsed : -1;
    }
    function n5FindTeleTargetPosition(_targetID) {
      try {
        for (const _target of n5FindAllClass("AnimalCompany.TeleportTarget")) {
          if (!_target || (_target.handle && _target.handle.isNull())) continue;
          let _id = -1;
          try {
            _id = n5TeleTargetValue(_target.field("target").value);
          } catch (_) {}
          if (_id !== _targetID) continue;
          const _tf = getTransform(_target);
          if (_tf && !_tf.isNull()) return _tf.method("get_position").invoke();
        }
      } catch (_e) {
        console.error("[Map target position]", _e);
      }
      return null;
    }
    function teleportTo(targetID) {
      try {
        const _teleClass = acImage.class("AnimalCompany.TeleportTarget");
        let _found = false;
        try {
          _found = !!_teleClass.method("TryTeleport", 1).invoke(targetID);
        } catch (_) {}
        if (!_found) {
          const _pos = n5FindTeleTargetPosition(targetID);
          if (_pos) {
            try {
              const _pc = acImage
                .class("AnimalCompany.PlayerController")
                .method("get_instance")
                .invoke();
              if (_pc && (!_pc.handle || !_pc.handle.isNull())) {
                _pc.method("Teleport", 1).invoke(_pos);
                _found = true;
              }
            } catch (_) {}
          }
        }
        currentNotification = _found ? "Teleported!" : "Target not in scene";
        notifactionResetTime = time + 2;
        return _found;
      } catch (_e) {
        currentNotification = "Tele failed: " + _e;
        notifactionResetTime = time + 3;
        return false;
      }
    }
    function n5TeleportUserToMap(_u, _targetID) {
      const _pos = n5FindTeleTargetPosition(_targetID);
      return _pos ? n5TeleportUserToPosition(_u, _pos) : false;
    }
    function n5TeleportSelectedUserToMe(_u) {
      const _p = n5LocalPlayerPos();
      return n5TeleportUserToPosition(_u, [
        (_p[0] || 0) + 0.6,
        (_p[1] || 0) + 0.05,
        (_p[2] || 0) + 0.6,
      ]);
    }
    function n5TeleportMeToSelectedUser(_u) {
      const _p = n5GetPlayerPosition(_u);
      if (!_p) return false;
      let _ok = false;
      try {
        const _pc = acImage
          .class("AnimalCompany.PlayerController")
          .method("get_instance")
          .invoke();
        if (_pc && !_pc.handle.isNull()) {
          try {
            _pc.method("Teleport", 1).invoke(_p);
            _ok = true;
          } catch (_) {}
        }
      } catch (_) {}
      try {
        const _lp = NetPlayerCls.method("get_localPlayer").invoke();
        if (_lp && (!_lp.handle || !_lp.handle.isNull()))
          _ok =
            n5TeleportUserToPosition(_lp, [
              (_p[0] || 0) + 0.6,
              (_p[1] || 0) + 0.05,
              (_p[2] || 0) + 0.6,
            ]) || _ok;
      } catch (_) {}
      try {
        getTransform(headCollider)
          .method("set_position")
          .invoke([
            (_p[0] || 0) + 0.6,
            (_p[1] || 0) + 0.05,
            (_p[2] || 0) + 0.6,
          ]);
        _ok = true;
      } catch (_) {}
      return _ok;
    }
    function n5KickAllUsers(_notify = false) {
      if (time < n5AutoKickAllDelay) return 0;
      n5AutoKickAllDelay = time + 0.18;
      const _count = n5ForUsers(n5AllRemoteUsers(), (_u) =>
        n5KickPlayerObject(_u),
      );
      if (_notify || _count > 0) {
        currentNotification = "Kick spam all: " + _count;
        notifactionResetTime = time + 1.5;
      }
      return _count;
    }
    function n5SetPlayerScale(_rig, _delta) {
      if (!_rig || (_rig.handle && _rig.handle.isNull())) return false;
      try {
        let _cur = 1.0;
        try {
          _cur = _rig.method("get_playerScale").invoke();
        } catch (_) {}
        try {
          if (!_cur) _cur = _rig.field("_playerScale").value;
        } catch (_) {}
        const _pm = Math.max(0.15, Math.min(5.0, (_cur || 1) + _delta));
        try {
          _rig.method("set_playerScale").invoke(_pm);
        } catch (_) {}
        try {
          _rig.field("_playerScale").value = _pm;
        } catch (_) {}
        try {
          _rig.method("CopyBackingFieldsToState").invoke(true);
        } catch (_) {}
        const _tf = getTransform(_rig);
        let _s = null;
        try {
          _s = _tf.method("get_localScale").invoke();
        } catch (_) {
          try {
            _s = _tf.method("get_localScale").invoke();
          } catch (_e) {}
        }
        const _base = _s && typeof _s[0] === "number" ? _s : [1, 1, 1];
        const _m = Math.max(0.15, Math.min(5.0, (_base[0] || 1) + _delta));
        _tf.method("set_localScale").invoke([_m, _m, _m]);
        return true;
      } catch (_e) {
        console.error("[N5 UserScale]", _e);
        return false;
      }
    }
    function n5SetPlayerScaleExact(_rig, _scale) {
      if (!_rig || (_rig.handle && _rig.handle.isNull())) return false;
      try {
        const _pm = Math.max(0.15, Math.min(5.0, _scale));
        try {
          _rig.method("set_playerScale").invoke(_pm);
        } catch (_) {}
        try {
          _rig.field("_playerScale").value = _pm;
        } catch (_) {}
        try {
          _rig.method("CopyBackingFieldsToState").invoke(true);
        } catch (_) {}
        const _tf = getTransform(_rig);
        _tf.method("set_localScale").invoke([_pm, _pm, _pm]);
        return true;
      } catch (_e) {
        console.error("[N5 UserScaleExact]", _e);
        return false;
      }
    }
    function n5ShakePlayerScreen(_rig) {
      if (!_rig || (_rig.handle && _rig.handle.isNull())) return false;
      let _ok = false;
      try {
        _rig.method("ShakeScreen", 5).invoke(1.6, 0.05, 0.25, 45.0, 0.85);
        _ok = true;
      } catch (_) {}
      try {
        _rig.method("RPC_ShakeScreen", 5).invoke(1.6, 0.05, 0.25, 45.0, 0.85);
        _ok = true;
      } catch (_) {}
      if (!_ok) {
        try {
          const _p = getTransform(_rig).method("get_position").invoke();
          const _tf = getTransform(_rig);
          for (let _i = 0; _i < 5; _i++) {
            const _o = [
              (Math.random() - 0.5) * 0.35,
              (Math.random() - 0.5) * 0.2,
              (Math.random() - 0.5) * 0.35,
            ];
            _tf
              .method("set_position")
              .invoke([
                (_p[0] || 0) + _o[0],
                (_p[1] || 0) + _o[1],
                (_p[2] || 0) + _o[2],
              ]);
          }
          _ok = true;
        } catch (_) {}
      }
      return _ok;
    }
    function n5StunUser(_rig) {
      if (!_rig || (_rig.handle && _rig.handle.isNull())) return false;
      let _ok = false;
      try {
        _rig.method("ForcePlayerStun", 2).invoke(2.0, true);
        _ok = true;
      } catch (_) {}
      try {
        _rig
          .method("RPC_PlayerStun", 4)
          .invoke(
            getTransform(_rig).method("get_position").invoke(),
            999.0,
            2.0,
            0,
          );
        _ok = true;
      } catch (_) {}
      try {
        _rig
          .method("PlayerStun", 4)
          .invoke(
            getTransform(_rig).method("get_position").invoke(),
            999.0,
            2.0,
            0,
          );
        _ok = true;
      } catch (_) {}
      return _ok;
    }
    function n5ApplyBuffToPlayer(_rig, _id) {
      if (!_rig || (_rig.handle && _rig.handle.isNull())) return false;
      try {
        _rig.method("RPC_ApplyBuff").invoke(_id);
        return true;
      } catch (_) {}
      try {
        _rig.method("ApplyBuff").invoke(_id);
        return true;
      } catch (_) {}
      try {
        const _bc = _rig
          .method("GetComponent", 1)
          .inflate(acImage.class("AnimalCompany.PlayerBuffController"))
          .invoke();
        if (_bc && !_bc.handle.isNull()) {
          _bc.method("ActivateBuff").invoke(_id);
          return true;
        }
      } catch (_) {}
      return false;
    }
    function n5SetVoiceVolumeForRig(_rig, _volume) {
      try {
        const _pid = _rig.method("get_playerID").invoke();
        acImage
          .class("AnimalCompany.PlayerVoiceUtility")
          .method("SetPlayerVolume")
          .invoke(_pid, _volume);
        return true;
      } catch (_e) {
        console.error("[N5 VoiceVolume]", _e);
        return false;
      }
    }
    function n5WriteTextFile(_path, _txt) {
      try {
        const _dirCls = Il2Cpp.corlib.class("System.IO.Directory");
        const _pathCls = Il2Cpp.corlib.class("System.IO.Path");
        const _fileCls = Il2Cpp.corlib.class("System.IO.File");
        const _dir = n5ManagedString(
          _pathCls.method("GetDirectoryName", 1).invoke(Il2Cpp.string(_path)),
        );
        if (_dir && !_dirCls.method("Exists", 1).invoke(Il2Cpp.string(_dir)))
          _dirCls.method("CreateDirectory", 1).invoke(Il2Cpp.string(_dir));
        _fileCls
          .method("WriteAllText", 2)
          .invoke(Il2Cpp.string(_path), Il2Cpp.string(_txt));
        return true;
      } catch (_e) {
        console.error("[N5 WriteFile]", _e);
        return false;
      }
    }
    function n5SaveLobbyUsers() {
      try {
        const _players = n5AllNetPlayers().map((_pl, _i) => ({
          index: _i,
          id: n5GetPlayerUserId(_pl),
          name: n5GetPlayerDisplayName(_pl),
          isLocal: (() => {
            try {
              return !!_pl.method("get_IsMine").invoke();
            } catch (_) {
              return false;
            }
          })(),
          whitelisted: n5WhitelistHas(_pl),
          appearingOffline: (() => {
            try {
              return !!_pl.field("appearOffline").value;
            } catch (_) {
              try {
                return !!_pl.method("get_appearOffline").invoke();
              } catch (_e) {
                return null;
              }
            }
          })(),
        }));
        const _d = new Date(),
          _pad = (_n) => String(_n).padStart(2, "0");
        const _stamp =
          _d.getFullYear() +
          "-" +
          _pad(_d.getMonth() + 1) +
          "-" +
          _pad(_d.getDate()) +
          "_" +
          _pad(_d.getHours()) +
          "-" +
          _pad(_d.getMinutes()) +
          "-" +
          _pad(_d.getSeconds());
        const _path =
          "C:\\Users\\fucky\\Documents\\lobby saves\\lobby saves(" +
          _stamp +
          ").json";
        const _ok = n5WriteTextFile(
          _path,
          JSON.stringify(
            {
              savedAt: _d.toISOString(),
              playerCount: _players.length,
              players: _players,
            },
            null,
            2,
          ),
        );
        currentNotification = _ok
          ? "Lobby saved: " + _players.length + " users"
          : "Lobby save failed";
        notifactionResetTime = time + 4;
        return _ok;
      } catch (_e) {
        currentNotification = "Lobby save failed";
        notifactionResetTime = time + 2;
        console.error("[N5 SaveLobby]", _e);
        return false;
      }
    }
    function n5GetRightFingers(_rig) {
      try {
        const _view = _rig.method("get_view").invoke();
        if (!_view || _view.isNull()) return null;
        const _fingerViews = _view.field("_fingerViews").value;
        if (!_fingerViews || _fingerViews.isNull() || _fingerViews.length < 2)
          return null;
        return _fingerViews.get(1);
      } catch (_) {
        return null;
      }
    }
    function n5WhitelistHas(_rig) {
      const _uid = n5GetPlayerUserId(_rig);
      if (!_uid) return false;
      for (let _i = 0; _i < whitelist.length; _i++) {
        const _w = whitelist[_i];
        if (!_w || (_w.handle && _w.handle.isNull())) continue;
        if (n5GetPlayerUserId(_w) === _uid) return true;
      }
      return false;
    }
    function n5WhitelistAdd(_rig) {
      if (
        !_rig ||
        (_rig.handle && _rig.handle.isNull()) ||
        _rig.method("get_IsMine").invoke()
      )
        return false;
      if (n5WhitelistHas(_rig)) return false;
      whitelist.push(_rig);
      return true;
    }
    function n5WhitelistRemove(_rig) {
      const _uid = n5GetPlayerUserId(_rig);
      if (!_uid) return false;
      const _next = [];
      let _removed = false;
      for (let _i = 0; _i < whitelist.length; _i++) {
        const _w = whitelist[_i];
        if (!_w || (_w.handle && _w.handle.isNull())) continue;
        if (n5GetPlayerUserId(_w) === _uid) {
          _removed = true;
          continue;
        }
        _next.push(_w);
      }
      whitelist = _next;
      return _removed;
    }
    function n5WhitelistAllPlayers() {
      let _added = 0;
      try {
        const _en = NetPlayerCls.field("playerIDToNetPlayer")
          .value.method("get_Values")
          .invoke()
          .method("GetEnumerator")
          .invoke();
        while (_en.method("MoveNext").invoke()) {
          const _pl = _en.method("get_Current").invoke();
          if (n5WhitelistAdd(_pl)) _added++;
        }
      } catch (_e) {
        console.error("[WL all]", _e);
      }
      currentNotification =
        "Whitelist all: +" + _added + " (" + whitelist.length + " total)";
      notifactionResetTime = time + 3;
    }
    function n5WhitelistFist(_rig) {
      try {
        const _f = n5GetRightFingers(_rig);
        if (!_f || _f.isNull()) return false;
        return (
          _f.field("_indexValue").value > 0.8 &&
          _f.field("_middleValue").value > 0.8 &&
          _f.field("_thumbValue").value > 0.8
        );
      } catch (_) {
        return false;
      }
    }
    function n5WhitelistedPlayers() {
      const _list = [];
      for (let _i = 0; _i < whitelist.length; _i++) {
        const _w = whitelist[_i];
        if (!_w || (_w.handle && _w.handle.isNull())) continue;
        _list.push(_w);
      }
      return _list;
    }
    function n5GetRigHand(_rig, _right = true) {
      try {
        return _rig.field(_right ? "handRight" : "handLeft").value;
      } catch (_) {
        return null;
      }
    }
    function n5SetObjectVelocity(_obj, _dir, _power) {
      if (!_obj) return false;
      try {
        let _go = null;
        try {
          _go = _obj.method("get_gameObject").invoke();
        } catch (_) {}
        if (!_go || _go.isNull()) _go = _obj;
        let _rb = null;
        try {
          _rb = _go.method("GetComponent", 1).inflate(RigidbodyCls).invoke();
        } catch (_) {}
        if ((!_rb || _rb.handle.isNull()) && _go) {
          try {
            _rb = _go
              .method("GetComponentInChildren", 1)
              .inflate(RigidbodyCls)
              .invoke();
          } catch (_) {}
        }
        if (_rb && !_rb.handle.isNull()) {
          try {
            _rb.method("set_isKinematic").invoke(false);
          } catch (_) {}
          try {
            _rb.method("WakeUp").invoke();
          } catch (_) {}
          const _vel = Vector3Cls.method("op_Multiply", 2).invoke(_dir, _power);
          try {
            _rb.method("set_linearVelocity").invoke(_vel);
            return true;
          } catch (_) {}
          try {
            _rb.method("set_velocity").invoke(_vel);
            return true;
          } catch (_) {}
          try {
            _rb.method("AddForce", 2).invoke(_vel, 1);
            return true;
          } catch (_) {}
        }
      } catch (_) {}
      return false;
    }
    function n5WhitelistSpawnPrefabFromHand(_prefab, _hand, _power) {
      if (!_hand) return null;
      const _pos = _hand.method("get_position").invoke();
      const _rot = _hand.method("get_rotation").invoke();
      const _obj = spawnNetworkPrefab(_prefab, _pos, _rot);
      if (_obj && _power > 0)
        n5SetObjectVelocity(_obj, _hand.method("get_forward").invoke(), _power);
      return _obj;
    }
    function n5WhitelistSpawnItemFromHand(_item, _hand, _power) {
      if (!_hand) return null;
      const _obj = n5SpawnItemObjectAt(
        _item,
        _hand.method("get_position").invoke(),
        _hand.method("get_rotation").invoke(),
      );
      if (_obj && _power > 0)
        n5SetObjectVelocity(_obj, _hand.method("get_forward").invoke(), _power);
      return _obj;
    }
    function n5NormVec(_v, _power) {
      const _x = Number(
        (_v &&
          (_v[0] !== undefined ? _v[0] : _v.field ? _v.field("x").value : 0)) ||
          0,
      );
      const _y = Number(
        (_v &&
          (_v[1] !== undefined ? _v[1] : _v.field ? _v.field("y").value : 0)) ||
          0,
      );
      const _z = Number(
        (_v &&
          (_v[2] !== undefined ? _v[2] : _v.field ? _v.field("z").value : 0)) ||
          0,
      );
      const _m = Math.sqrt(_x * _x + _y * _y + _z * _z) || 1;
      return [(_x / _m) * _power, (_y / _m) * _power, (_z / _m) * _power];
    }
    function n5WhitelistFlyPlayer(_rig) {
      try {
        const _hand = n5GetRigHand(_rig, true) || n5GetRigHand(_rig, false);
        if (!_hand) return false;
        const _force = n5NormVec(
          _hand.method("get_forward").invoke(),
          Math.max(0.15, flySpeed * 0.018),
        );
        try {
          _rig.method("RPC_AddForce").invoke(_force);
          return true;
        } catch (_) {}
        try {
          _rig.method("RPC_AddForce").invoke(_force, 1);
          return true;
        } catch (_) {}
        try {
          _rig.method("RPC_AddForce", 3).invoke(_force);
          return true;
        } catch (_) {}
      } catch (_) {}
      return false;
    }
    function n5RunWhitelistedFist(_cooldown, _fn) {
      if (time < tagGunDelay) return;
      tagGunDelay = time + _cooldown;
      const _list = n5WhitelistedPlayers();
      for (let _i = 0; _i < _list.length; _i++) {
        const _rig = _list[_i];
        try {
          if (n5WhitelistFist(_rig)) _fn(_rig);
        } catch (_) {}
      }
    }
    function onBeforeSpawnedCallback(_vx191) {
      try {
        const _vx310 = _vx191.method("get_view").invoke();
        if (!_vx310 || _vx310.isNull()) return null;
        const _vx848 = _vx310.field("_fingerViews").value;
        if (!_vx848 || _vx848.isNull() || _vx848.length < 2) return null;
        return _vx848.get(1);
      } catch (_vx32c) {
        return null;
      }
    }
    function _vx1d0(_vx15d) {
      _vx15d = Vector3Cls.method("op_Subtraction", 2).invoke(
        _vx15d,
        getTransform(bodyCollider).method("get_position").invoke(),
      );
      _vx15d = Vector3Cls.method("op_Addition", 2).invoke(
        _vx15d,
        getTransform(gorillaLocomotionInstance).method("get_position").invoke(),
      );
      return _vx15d;
    }
    function _vx279(_vx395) {
      _vx5c4 = NetPlayerCls.method("get_localPlayer").invoke();
      if (!_vx5c4) return;
      _vx5c4.method("RPC_Teleport").invoke(_vx1d0(_vx395));
    }
    function setNotification(message = "", playSound = true, duration = 5) {
      const isSameMessage = currentNotification == message;
      notifactionResetTime = time + duration;
      currentNotification = message;
      if (playSound && !isSameMessage) _n5RequestMenuRebuild();
    }
    function createPrimitiveGameObject(
      position = vec3Zero,
      rotation = identityRotation,
      scale = vec3One,
      primitiveType = 3,
      color = [1, 1, 1, 1],
      parentTransform = null,
      enableCollider = false,
    ) {
      const primitiveGO =
        GameObjectCls.method("CreatePrimitive").invoke(primitiveType);
      const meshRenderer = getComponent(primitiveGO, MeshRendererCls);
      if (color[3] === 0) meshRenderer.method("set_enabled").invoke(false);
      else {
        const material = meshRenderer.method("get_material").invoke();
        material.method("set_shader").invoke(urpUnlitShader);
        material.method("set_color").invoke(color);
      }
      const collider = getComponent(primitiveGO, ColliderCls);
      if (collider && !collider.isNull()) {
        if (enableCollider) {
          collider.method("set_enabled").invoke(true);
          collider.method("set_isTrigger").invoke(true);
        } else {
          collider.method("set_isTrigger").invoke(true);
        }
      }
      const tf = getTransform(primitiveGO);
      if (parentTransform != null)
        tf.method("SetParent", 2).invoke(parentTransform, false);
      tf.method("set_position").invoke(position);
      tf.method("set_rotation").invoke(rotation);
      tf.method("set_localScale").invoke(scale);
      return primitiveGO;
    }
    function createUITextObject(
      parentGO,
      text = "",
      textColor = [1, 1, 1, 1],
      textPos = vec3Zero,
      textScale = vec3One,
    ) {
      const uiText = addComponent(
        createPrimitiveGameObject(
          vec3Zero,
          identityRotation,
          vec3One,
          3,
          [0, 0, 0, 0],
          getTransform(parentGO),
        ),
        UITextCls,
      );
      uiText.method("set_text").invoke(Il2Cpp.string(text));
      if (arialFont && !arialFont.isNull())
        uiText.method("set_font").invoke(arialFont);
      uiText.method("set_fontSize").invoke(1);
      uiText.method("set_color").invoke(textColor);
      uiText.method("set_fontStyle").invoke(2);
      uiText.method("set_alignment").invoke(4);
      uiText.method("set_resizeTextForBestFit").invoke(true);
      uiText.method("set_resizeTextMinSize").invoke(0);
      const rectTransform = getComponent(uiText, RectTransformCls);
      rectTransform.method("set_sizeDelta").invoke(textScale);
      rectTransform.method("set_position").invoke(textPos);
      rectTransform
        .method("set_rotation")
        .invoke(QuaternionCls.method("Euler").invoke(180, 90, 90));
    }
    function _n5MenuTitleText() {
      const _pg = currentPage + 1;
      const _mp = Math.max(
        1,
        Math.ceil((menuCategories[currentCategory] || []).length / 8),
      );
      const _acH = n5ToHex(
        n5AccentColor[0],
        n5AccentColor[1],
        n5AccentColor[2],
      );
      return (
        menuName +
        "<color=#526071>  |  </color><color=" +
        _acH +
        "><b>PAGE " +
        _pg +
        "/" +
        _mp +
        "</b></color>"
      );
    }
    function _n5MenuNotifText() {
      if (!currentNotification) return "";
      const _acH = n5ToHex(
        n5AccentColor[0],
        n5AccentColor[1],
        n5AccentColor[2],
      );
      const _n = currentNotification;
      if (_n.indexOf("<color") >= 0 || _n.indexOf("<b>") >= 0) return _n;
      if (_n.startsWith("[ENABLE]"))
        return "<color=" + _acH + "><b>" + _n + "</b></color>";
      if (_n.startsWith("[DISABLE]") || /fail|error/i.test(_n))
        return "<color=#ff5555><b>" + _n + "</b></color>";
      if (_n.includes("BLOCKED"))
        return "<color=#ff88ff><b>" + _n + "</b></color>";
      return "<color=" + _acH + "> " + _n + "</color>";
    }
    function n5SearchKeyPressed(_vk) {
      const _down = _n5KeyDown(_vk),
        _pressed = _down && !n5SearchKeyState[_vk];
      n5SearchKeyState[_vk] = _down;
      return _pressed;
    }
    function n5BuildSearchResults() {
      const _query = n5SearchQuery.trim().toLowerCase();
      if (!_query) {
        currentNotification = "SEARCH: type a button name";
        notifactionResetTime = time + 30;
        return;
      }
      const _results = [
        new MenuItem({
          buttonText: "<< Back to Home",
          isTogglable: false,
          toolTip: "back to main menu",
          method: () => {
            currentCategory = 0;
            currentPage = 0;
          },
        }),
      ];
      for (let _cat = 0; _cat < menuCategories.length; _cat++) {
        if (_cat === 1 || _cat === 48) continue;
        const _buttons = menuCategories[_cat] || [];
        for (let _i = 0; _i < _buttons.length; _i++) {
          const _button = _buttons[_i];
          if (!_button) continue;
          const _hay = (
            (_button.buttonText || "") +
            " " +
            (_button.toolTip || "")
          ).toLowerCase();
          if (!_hay.includes(_query)) continue;
          const _targetCat = _cat,
            _targetIndex = _i,
            _label = String(_button.buttonText || "Unnamed");
          _results.push(
            new MenuItem({
              buttonText: _label + " [" + _targetCat + "]",
              isTogglable: false,
              toolTip: "open " + _label,
              method: () => {
                currentCategory = _targetCat;
                currentPage = Math.floor(_targetIndex / 8);
                _n5PCMenuSelector = _targetIndex % 8;
                _n5MenuLastCat = -1;
                _n5MenuLastPage = -1;
                _n5FlatDirty = true;
              },
            }),
          );
        }
      }
      menuCategories[48] = _results;
      currentCategory = 48;
      currentPage = 0;
      _n5PCMenuSelector = 0;
      currentNotification =
        'SEARCH "' +
        n5SearchQuery +
        '": ' +
        (_results.length - 1) +
        " result(s)";
      notifactionResetTime = time + 4;
      _n5FlatDirty = true;
      _n5RequestMenuRebuild();
    }
    function n5StartMenuSearch() {
      n5SearchActive = true;
      n5SearchQuery = "";
      n5SearchKeyState = {};
      if (n5ImGuiMode) {
        n5ImGuiMode = false;
        try {
          const _b = (menuCategories[2] || []).find(
            (_x) => _x.buttonText === "ImGui Mode",
          );
          if (_b) _b.enabled = false;
        } catch (_) {}
        try {
          n5ImGuiDestroy();
        } catch (_) {}
      }
      currentNotification = "VR SEARCH: point at keys, then GO";
      notifactionResetTime = time + 60;
      _n5RequestMenuRebuild();
    }
    function n5HandleVRSearchKey(_key) {
      if (!n5SearchActive) return false;
      const _now = TimeCls.method("get_time").invoke();
      if (_now < n5VRSearchLastKeyTime) return true;
      n5VRSearchLastKeyTime = _now + 0.16;
      if (_key === "GO") {
        n5SearchActive = false;
        n5BuildSearchResults();
        return true;
      }
      if (_key === "BACK") n5SearchQuery = n5SearchQuery.slice(0, -1);
      else if (_key === "CLEAR") n5SearchQuery = "";
      else if (_key === "CLOSE") {
        n5SearchActive = false;
        currentCategory = 0;
        currentPage = 0;
        currentNotification = "Search closed";
        notifactionResetTime = time + 1.5;
      } else if (_key === "SPACE") n5SearchQuery += " ";
      else if (/^[A-Z0-9]$/.test(_key)) n5SearchQuery += _key.toLowerCase();
      if (n5SearchQuery.length > 40) n5SearchQuery = n5SearchQuery.slice(0, 40);
      if (n5SearchActive) {
        currentNotification = "VR SEARCH: " + (n5SearchQuery || "_");
        notifactionResetTime = time + 60;
      }
      _n5RequestMenuRebuild();
      return true;
    }
    function n5CreateVRSearchKeyboard(_canvasObj) {
      const _rows = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"],
        ["BACK", "SPACE", "CLEAR", "GO", "CLOSE"],
      ];
      for (let _row = 0; _row < _rows.length; _row++) {
        const _keys = _rows[_row],
          _step = _row === 3 ? 0.095 : 0.047;
        const _start = ((_keys.length - 1) * _step) / 2;
        for (let _col = 0; _col < _keys.length; _col++) {
          const _key = _keys[_col],
            _y = _start - _col * _step,
            _z = 0.12 - _row * 0.065;
          const _wide = _row === 3;
          const _go = createPrimitiveGameObject(
            [0.105, _y, _z],
            identityRotation,
            [0.09, _wide ? 0.086 : 0.041, 0.052],
            3,
            buttonColor,
            getTransform(menu),
            true,
          );
          _go.method("set_name").invoke(Il2Cpp.string("@N5KEY_" + _key));
          addComponent(_go, ComputerTerminalKeyCls);
          getComponent(_go, BoxColliderCls)
            .method("set_isTrigger")
            .invoke(true);
          createUITextObject(
            _canvasObj,
            _key,
            textColor,
            [0.11, _y, _z],
            [1, 0.1],
          );
        }
      }
    }
    function n5SearchTick() {
      if (!n5SearchActive || !_n5GAKS) return;
      let _changed = false;
      if (n5SearchKeyPressed(_VK_BACK)) {
        n5SearchQuery = n5SearchQuery.slice(0, -1);
        _changed = true;
      }
      if (n5SearchKeyPressed(_VK_RETURN)) {
        _n5PCEnterWasDown = true;
        n5SearchActive = false;
        n5BuildSearchResults();
        return;
      }
      const _shift = _n5KeyDown(_VK_SHIFT);
      for (let _vk = 65; _vk <= 90; _vk++) {
        if (!n5SearchKeyPressed(_vk)) continue;
        const _ch = String.fromCharCode(_vk);
        n5SearchQuery += _shift ? _ch : _ch.toLowerCase();
        _changed = true;
      }
      for (let _vk = 48; _vk <= 57; _vk++) {
        if (n5SearchKeyPressed(_vk)) {
          n5SearchQuery += String.fromCharCode(_vk);
          _changed = true;
        }
      }
      if (n5SearchKeyPressed(_VK_SPACE)) {
        n5SearchQuery += " ";
        _changed = true;
      }
      if (n5SearchQuery.length > 40) n5SearchQuery = n5SearchQuery.slice(0, 40);
      if (_changed) {
        currentNotification = "SEARCH: " + (n5SearchQuery || "_") + "  [ENTER]";
        notifactionResetTime = time + 60;
        _n5RequestMenuRebuild();
      }
    }
    function _n5MenuButtonLabel(_btn, _index) {
      const _raw = n5FormatMenuLabel(String(_btn.buttonText || ""));
      const _acH = n5ToHex(
        n5AccentColor[0],
        n5AccentColor[1],
        n5AccentColor[2],
      );
      const _txtH = n5ToHex(textColor[0], textColor[1], textColor[2]);
      const _sel = _n5PCMode && _n5PCMenuOpen && _index === _n5PCMenuSelector;
      const _pre = _sel ? "<color=" + _acH + "><b>> </b></color>" : "";
      if (_raw.indexOf("<color") >= 0) return _raw;
      if (_btn.isTogglable) {
        return _btn.enabled
          ? _pre +
              "<b><color=" +
              _acH +
              ">" +
              _raw +
              "</color></b>  <color=#7dffcf><b>ON</b></color>"
          : _pre +
              "<color=#d9e6f4>" +
              _raw +
              "</color>  <color=#718094>OFF</color>";
      }
      if (_raw.startsWith("<<") || _raw.includes("Back"))
        return _pre + "<color=#aebbd0>" + _raw + "</color>";
      if (_raw.includes("->") || _raw.startsWith(">>"))
        return _pre + "<b><color=" + _acH + ">" + _raw + "</color></b>";
      return _pre + "<color=" + _txtH + ">" + _raw + "</color>";
    }
    function _n5RequestMenuRebuild() {
      _n5MenuLastCat = -1;
      _n5MenuLastPage = -1;
      if (menu != null) {
        try {
          destroyObject(menu);
        } catch (_) {}
        menu = null;
      }
    }
    function _vx4a8(menuGO, _vx2ad) {
      const RendererCls = Il2Cpp.domain
        .assembly("UnityEngine.CoreModule")
        .image.class("UnityEngine.Renderer");
      const menuRenderer = getComponent(menuGO, RendererCls);
      if (!menuRenderer) return;
      const _vx55b = menuRenderer.method("get_material").invoke();
      _vx55b
        .method("set_color")
        .invoke(_vx2ad.enabled ? buttonPressedColor : buttonColor);
    }
    function _vx1ab() {
      if (menu != null) {
        try {
          destroyObject(menu);
        } catch (_) {}
        menu = null;
      }

      menu = createPrimitiveGameObject(
        vec3Zero,
        identityRotation,
        [0.1, 0.3, 0.3825],
        3,
        [0, 0, 0, 0],
      );
      try {
        destroyObject(getComponent(menu, BoxColliderCls));
      } catch (_) {}

      const _menuBg = createPrimitiveGameObject(
        [0.1, 0, 0],
        identityRotation,
        [0.1, 1, 1],
        3,
        bgColor,
        getTransform(menu),
      );
      try {
        destroyObject(getComponent(_menuBg, BoxColliderCls));
      } catch (_) {}

      const _canvasObj = createPrimitiveGameObject(
        vec3Zero,
        identityRotation,
        vec3One,
        3,
        [0, 0, 0, 0],
        getTransform(menu),
      );
      const _canvas = addComponent(_canvasObj, CanvasCls);
      try {
        destroyObject(getComponent(_canvasObj, BoxColliderCls));
      } catch (_) {}
      const _canvasScaler = addComponent(_canvasObj, CanvasScalerCls);
      addComponent(_canvasObj, GraphicRaycasterCls);
      _canvas.method("set_renderMode").invoke(2);
      _canvasScaler.method("set_dynamicPixelsPerUnit").invoke(1000);
      createUITextObject(
        _canvasObj,
        _n5MenuTitleText(),
        [1, 1, 1, 1],
        [0.11, 0, 0.175],
        [1, 0.1],
      );

      if (time > notifactionResetTime) currentNotification = "";
      createUITextObject(
        _canvasObj,
        _n5MenuNotifText(),
        textColor,
        [0.11, 0, 0.275],
        [1, 0.1],
      );

      const _disconnectBtn = createPrimitiveGameObject(
        [0.1, 0, 0.225],
        identityRotation,
        [0.09, 0.9, 0.08],
        3,
        buttonColor,
        getTransform(menu),
        true,
      );
      _disconnectBtn.method("set_name").invoke(Il2Cpp.string("@Disconnect"));
      addComponent(_disconnectBtn, ComputerTerminalKeyCls);
      getComponent(_disconnectBtn, BoxColliderCls)
        .method("set_isTrigger")
        .invoke(true);
      createUITextObject(
        _canvasObj,
        (() => {
          const _acH = n5ToHex(
            n5AccentColor[0],
            n5AccentColor[1],
            n5AccentColor[2],
          );
          return (
            "<color=#ff5555><b>Disconnect</b></color>\n<size=9><color=" +
            _acH +
            ">ITEM:</color> " +
            itemIDs[itemIndex] +
            "\n<color=" +
            _acH +
            ">PREFAB:</color> " +
            prefabList[prefabIndex] +
            "</size>"
          );
        })(),
        textColor,
        [0.11, 0, 0.225],
        [1, 0.1],
      );

      const _returnBtn = createPrimitiveGameObject(
        [0.1, -0.175, -0.225],
        identityRotation,
        [0.09, 0.09, 0.09],
        3,
        buttonColor,
        getTransform(menu),
        true,
      );
      _returnBtn.method("set_name").invoke(Il2Cpp.string("@GlobalReturn"));
      addComponent(_returnBtn, ComputerTerminalKeyCls);
      getComponent(_returnBtn, BoxColliderCls)
        .method("set_isTrigger")
        .invoke(true);
      createUITextObject(
        _canvasObj,
        n5FormatMenuLabel("⌂"),
        textColor,
        [0.11, -0.175, -0.225],
        [1, 0.1],
      );

      const _searchBtn = createPrimitiveGameObject(
        [0.1, 0.175, -0.225],
        identityRotation,
        [0.09, 0.09, 0.09],
        3,
        buttonColor,
        getTransform(menu),
        true,
      );
      _searchBtn.method("set_name").invoke(Il2Cpp.string("@MenuSearch"));
      addComponent(_searchBtn, ComputerTerminalKeyCls);
      getComponent(_searchBtn, BoxColliderCls)
        .method("set_isTrigger")
        .invoke(true);
      createUITextObject(
        _canvasObj,
        n5FormatMenuLabel("SEARCH"),
        textColor,
        [0.11, 0.175, -0.225],
        [1, 0.1],
      );

      const _prevBtn = createPrimitiveGameObject(
        [0.1, 0.2, 0],
        identityRotation,
        [0.09, 0.2, 0.9],
        3,
        buttonColor,
        getTransform(menu),
        true,
      );
      _prevBtn.method("set_name").invoke(Il2Cpp.string("@PreviousPage"));
      addComponent(_prevBtn, ComputerTerminalKeyCls);
      getComponent(_prevBtn, BoxColliderCls)
        .method("set_isTrigger")
        .invoke(true);
      createUITextObject(
        _canvasObj,
        n5FormatMenuLabel("<"),
        textColor,
        [0.11, 0.2, 0],
        [1, 0.1],
      );

      const _nextBtn = createPrimitiveGameObject(
        [0.1, -0.2, 0],
        identityRotation,
        [0.09, 0.2, 0.9],
        3,
        buttonColor,
        getTransform(menu),
        true,
      );
      _nextBtn.method("set_name").invoke(Il2Cpp.string("@NextPage"));
      addComponent(_nextBtn, ComputerTerminalKeyCls);
      getComponent(_nextBtn, BoxColliderCls)
        .method("set_isTrigger")
        .invoke(true);
      createUITextObject(
        _canvasObj,
        n5FormatMenuLabel(">"),
        textColor,
        [0.11, -0.2, 0],
        [1, 0.1],
      );

      if (n5SearchActive) {
        n5CreateVRSearchKeyboard(_canvasObj);
      } else {
        let _btnIdx = 0;
        const _pageBtns = (menuCategories[currentCategory] || []).slice(
          currentPage * 8,
          currentPage * 8 + 8,
        );
        _pageBtns.forEach((_btnData) => {
          const _z = 0.13 - _btnIdx * 0.04;
          const _btnGo = createPrimitiveGameObject(
            [0.105, 0, _z],
            identityRotation,
            [0.09, 0.9, 0.08],
            3,
            buttonColor,
            getTransform(menu),
            true,
          );
          _btnGo
            .method("set_name")
            .invoke(Il2Cpp.string("@" + _btnData.buttonText));
          addComponent(_btnGo, ComputerTerminalKeyCls);
          getComponent(_btnGo, BoxColliderCls)
            .method("set_isTrigger")
            .invoke(true);
          createUITextObject(
            _canvasObj,
            _n5MenuButtonLabel(_btnData, _btnIdx),
            textColor,
            [0.11, 0, _z],
            [1, 0.1],
          );
          _vx4a8(_btnGo, _btnData);
          _btnIdx++;
        });
      }

      try {
        const _menuTf = getTransform(menu);
        const _ps = gorillaLocomotionInstance.field(
          "<playerScale>k__BackingField",
        ).value;
        _menuTf
          .method("set_localScale")
          .invoke(
            Vector3Cls.method("op_Multiply").invoke(
              Vector3Cls.method("op_Multiply").invoke(
                _menuTf.method("get_localScale").invoke(),
                _ps,
              ),
              menuscale,
            ),
          );
      } catch (_) {}
    }
    let _vx4cf = false,
      _vxbf6 = null,
      _spawnObj = null,
      _tempResult = null;
    let _n5MenuRebuildLock = false;
    let _n5BtnLastClickTime = 0;
    const _n5BtnDebounce = 0.08;
    function _vx17d() {
      const _parent = righthand ? leftHandTransform : rightHandTransform;
      reference = createPrimitiveGameObject(
        vec3Zero,
        identityRotation,
        [0.01, 0.01, 0.01],
        0,
        textColor,
        _parent,
      );
      referenceCollider = getComponent(reference, ColliderCls);
      getTransform(reference)
        .method("set_localPosition")
        .invoke([0.01, -0.117, 0.05]);
      try {
        reference.method("set_layer").invoke(2);
      } catch (_) {}
      try {
        const _rb = addComponent(reference, RigidbodyCls);
        _rb.method("set_isKinematic").invoke(true);
        _rb.method("set_useGravity").invoke(false);
      } catch (_) {}
      try {
        if (referenceCollider && !referenceCollider.isNull()) {
          referenceCollider.method("set_isTrigger").invoke(true);
        }
      } catch (_) {}
    }
    function _n5PCUpdateReferencePointer() {
      if (!_n5PCMode || !_n5PCMenuOpen || !reference) return;
      try {
        const _cam = coreImage
          .class("UnityEngine.Camera")
          .method("get_main")
          .invoke();
        if (!_cam || _cam.isNull()) return;
        const _ct = getTransform(_cam);
        const _pos = _ct.method("get_position").invoke();
        const _fwd = _ct.method("get_forward").invoke();
        const _pt = Vector3Cls.method("op_Addition").invoke(
          _pos,
          Vector3Cls.method("op_Multiply", 2).invoke(_fwd, 0.75),
        );
        getTransform(reference).method("set_position").invoke(_pt);
      } catch (_) {}
    }
    function n5RaycastMenuButton() {
      try {
        const _cam = coreImage
          .class("UnityEngine.Camera")
          .method("get_main")
          .invoke();
        if (!_cam || _cam.isNull()) return null;
        const _ct = getTransform(_cam);
        const _origin = _ct.method("get_position").invoke();
        const _dir = _ct.method("get_forward").invoke();
        _n5ensurePhysicsOverloads();
        let _hits = null;
        if (_n5physRayAll4) {
          try {
            _hits = _n5physRayAll4.invoke(_origin, _dir, 6, -1);
          } catch (_) {}
        }
        if (!_hits) {
          try {
            _hits = PhysicsCls.method("RaycastAll", 3).invoke(
              _origin,
              _dir,
              6,
              -1,
            );
          } catch (_) {
            return null;
          }
        }
        const _len = n5ManagedArrayLength(_hits);
        for (let _i = 0; _i < _len; _i++) {
          const _hit = n5ManagedArrayGet(_hits, _i);
          if (!_hit) continue;
          let _col = null;
          try {
            _col = _hit.method("get_collider").invoke();
          } catch (_) {
            continue;
          }
          if (!_col || (_col.isNull && _col.isNull())) continue;
          let _go = null;
          try {
            _go = _col.method("get_gameObject").invoke();
          } catch (_) {
            continue;
          }
          if (!_go || (_go.isNull && _go.isNull())) continue;
          const _name = n5ManagedString(_go.method("get_name").invoke());
          if (_name.charAt(0) === "@") return _name.slice(1);
        }
      } catch (_) {}
      return null;
    }
    function _n5QueueMenuButton(_btnName) {
      if (!_btnName) return;
      if (_btnName.startsWith("N5KEY_")) {
        n5HandleVRSearchKey(_btnName.slice(6));
        return;
      }
      const _now = TimeCls.method("get_time").invoke();
      if (
        _now <= buttonClickDelay ||
        _now - _n5BtnLastClickTime < _n5BtnDebounce
      )
        return;
      buttonClickDelay = _now + 0.2;
      _n5BtnLastClickTime = _now;
      _n5PendingAction = _btnName;
      _n5MenuClickBounce = 1;
    }
    function n5ManagedArrayLength(_arr) {
      if (!_arr) return 0;
      try {
        if (typeof _arr.length === "number") return _arr.length;
      } catch (_) {}
      try {
        if (typeof _arr.get_Length === "function") return _arr.get_Length();
      } catch (_) {}
      try {
        if (_arr.method) return _arr.method("get_Length").invoke();
      } catch (_) {}
      try {
        if (_arr.field) return _arr.field("Length").value;
      } catch (_) {}
      return 0;
    }
    function n5ManagedArrayGet(_arr, _i) {
      if (!_arr) return null;
      try {
        if (_arr.get) return _arr.get(_i);
      } catch (_) {}
      try {
        if (_arr.method) return _arr.method("GetValue").invoke(_i);
      } catch (_) {}
      try {
        return _arr[_i];
      } catch (_) {}
      return null;
    }
    // --- Dabeans-style cached Physics overloads (prevents per-frame re-resolution that causes phasing) ---
    let _n5physRayAll4 = null,
      _n5physRayOut5 = null;
    function _n5ensurePhysicsOverloads() {
      if (!_n5physRayAll4) {
        try {
          _n5physRayAll4 = PhysicsCls.method("RaycastAll").overload(
            "UnityEngine.Vector3",
            "UnityEngine.Vector3",
            "System.Single",
            "System.Int32",
          );
        } catch (_) {
          _n5physRayAll4 = null;
        }
      }
      if (!_n5physRayOut5) {
        try {
          _n5physRayOut5 = PhysicsCls.method("Raycast").overload(
            "UnityEngine.Vector3",
            "UnityEngine.Vector3",
            "UnityEngine.RaycastHit&",
            "System.Single",
            "System.Int32",
          );
        } catch (_) {
          _n5physRayOut5 = null;
        }
      }
    }
    function n5RayHitDistance(_hit, _origin) {
      try {
        const _d = _hit.method("get_distance").invoke();
        if (typeof _d === "number" && isFinite(_d)) return _d;
      } catch (_) {}
      try {
        return Vector3Cls.method("Distance").invoke(
          _hit.method("get_point").invoke(),
          _origin,
        );
      } catch (_) {}
      return Infinity;
    }
    function n5GunRayOk(_ray) {
      if (!_ray) return false;
      try {
        if (typeof _ray.isNull === "function" && _ray.isNull()) return false;
      } catch (_) {}
      try {
        if (_ray.handle && _ray.handle.isNull && _ray.handle.isNull())
          return false;
      } catch (_) {}
      return true;
    }
    function n5MenuItemUsesGun(_item) {
      if (!_item || !_item.enabled || !_item.isTogglable) return false;
      const _n = (_item.buttonText || "").toLowerCase();
      return (
        _n.includes("gun") || _n.includes("launcher") || _n.includes("cannon")
      );
    }
    function n5AnyGunModEnabled() {
      if (!_n5FlatCache || _n5FlatDirty) {
        _n5FlatCache = menuCategories.flat();
        _n5FlatDirty = false;
      }
      for (let _i = 0; _i < _n5FlatCache.length; _i++) {
        if (n5MenuItemUsesGun(_n5FlatCache[_i])) return true;
      }
      return false;
    }
    function n5IsAiming() {
      if (rightGrab) return true;
      if (_n5PCMode && !_n5PCMenuOpen) {
        try {
          return _n5KeyDown(_VK_RBUTTON);
        } catch (_) {}
      }
      return false;
    }
    function n5GetRightHandTransform() {
      try {
        if (rightHandTransform) {
          try {
            if (!rightHandTransform.isNull()) return rightHandTransform;
          } catch (_) {
            return rightHandTransform;
          }
        }
        const _rh =
          gorillaLocomotionInstance &&
          gorillaLocomotionInstance.field("rightHandTransform").value;
        if (_rh) {
          try {
            if (!_rh.isNull()) return _rh;
          } catch (_) {
            return _rh;
          }
        }
      } catch (_) {}
      return rightHandTransform;
    }
    function n5HideGunPointer() {
      try {
        if (_spawnObj != null) {
          if (!_spawnObj.method("get_activeSelf").invoke())
            (destroyObject(_spawnObj), (_spawnObj = null));
          else _spawnObj.method("SetActive").invoke(false);
        }
        if (_tempResult != null) {
          const _go = _tempResult.method("get_gameObject").invoke();
          if (_go != null) {
            if (!_go.method("get_activeSelf").invoke())
              (destroyObject(_go), (_tempResult = null));
            else _go.method("SetActive").invoke(false);
          }
        }
      } catch (_) {}
    }
    function getGunPointerResult(layerOverride = null) {
      _gunOverrideLayer =
        layerOverride === null || layerOverride === undefined
          ? -1
          : layerOverride;
      const _handTf = n5GetRightHandTransform();
      if (!_handTf)
        return {
          ray: {
            isNull: () => true,
            handle: { isNull: () => true },
            method: () => ({ invoke: () => null }),
            raw: null,
          },
          gunPointer: null,
          point: vec3Zero,
          endPosition: vec3Zero,
        };
      let rayOrigin = _handTf.method("get_position").invoke(),
        rayForward = _handTf.method("get_forward").invoke();
      if (_n5PCMode) {
        try {
          const _cam = coreImage
            .class("UnityEngine.Camera")
            .method("get_main")
            .invoke();
          if (_cam && !_cam.isNull()) {
            const _ct = getTransform(_cam);
            if (_ct && !_ct.isNull()) {
              rayOrigin = _ct.method("get_position").invoke();
              rayForward = _ct.method("get_forward").invoke();
            }
          }
        } catch (_) {}
      }
      // Offset ray start forward by Direction/4 (same as larplol) to avoid self-collision phasing
      const _dirDiv4 = Vector3Cls.method("op_Division").invoke(rayForward, 4);
      const adjustedOrigin = Vector3Cls.method("op_Addition").invoke(
        rayOrigin,
        _dirDiv4,
      );
      // Use larplol's layer mask (-3180559) when no override is set — avoids phasing through triggers/self
      const _effectiveLayer =
        _gunOverrideLayer === -1 ? -3180559 : _gunOverrideLayer;
      let closestDist = Infinity,
        closestHit = null;
      const shouldFilterHit = (hitCollider) => {
        try {
          if (!hitCollider || (hitCollider.isNull && hitCollider.isNull()))
            return true;
          const _ct = (_4517e9) => {
            try {
              return _4517e9.method("get_transform").invoke();
            } catch (_) {
              return null;
            }
          };
          const _tr = _ct(hitCollider);
          if (_tr) {
            for (const _skip of [menu, reference, _spawnObj, _tempResult]) {
              if (!_skip) continue;
              try {
                const _st = getTransform(_skip);
                if (_st && _tr.method("IsChildOf").invoke(_st)) return true;
              } catch (_) {}
            }
          }
        } catch (_) {}
        return false;
      };
      // Use larp's method: fresh 4-arg overload lookup by param count, plain for..of, no extra hit filtering
      try {
        const _spawnFlags = PhysicsCls.method("RaycastAll", 4).invoke(
          adjustedOrigin,
          rayForward,
          512.0,
          _effectiveLayer,
        );
        if (_spawnFlags) {
          for (const hitInfo of _spawnFlags) {
            try {
              if (!hitInfo || (hitInfo.isNull && hitInfo.isNull())) continue;
              const hitPoint = hitInfo.method("get_point").invoke();
              const hitDist = Vector3Cls.method("Distance").invoke(
                hitPoint,
                rayOrigin,
              );
              if (hitDist < closestDist) {
                closestHit = hitInfo;
                closestDist = hitDist;
              }
            } catch (_) {}
          }
        }
      } catch (_) {}
      let _localObj;
      if (_vx4cf && _vxbf6) {
        _localObj = getTransform(_vxbf6).method("get_position").invoke();
      } else if (closestHit) {
        _localObj = closestHit.method("get_point").invoke();
      } else {
        _localObj = Vector3Cls.method("op_Addition").invoke(
          rayOrigin,
          Vector3Cls.method("op_Multiply").invoke(rayForward, 5),
        );
      }
      if (Vector3Cls.method("op_Equality").invoke(_localObj, vec3Zero)) {
        const _vx5bf = Vector3Cls.method("op_Multiply").invoke(rayForward, 512);
        _localObj = Vector3Cls.method("op_Addition").invoke(rayOrigin, _vx5bf);
      }
      if (_spawnObj == null) {
        _spawnObj = createPrimitiveGameObject(
          _localObj,
          identityRotation,
          [0.08, 0.08, 0.08],
          0,
          gunColor,
        );
        try {
          const _ptrCol = getComponent(_spawnObj, ColliderCls);
          if (_ptrCol && (!_ptrCol.handle || !_ptrCol.handle.isNull()))
            destroyObject(_ptrCol);
        } catch (_) {}
      }
      _spawnObj.method("SetActive").invoke(true);
      const _vx2cd = getTransform(_spawnObj);
      _vx2cd.method("set_position").invoke(_localObj);
      const _vx4f5 = getComponent(_spawnObj, MeshRendererCls),
        _vx245 = _vx4f5.method("get_material").invoke();
      try {
        _vx245.method("set_shader").invoke(urpUnlitShader);
      } catch (_) {
        try {
          _vx245.method("set_shader").invoke(uiDefaultShader);
        } catch (_2) {}
      }
      const _vx465 = rightTrigger ? buttonPressedColor : gunColor;
      _vx245.method("set_color").invoke(_vx465);
      if (_tempResult == null) {
        const _vxcbb = createPrimitiveGameObject(
          vec3Zero,
          identityRotation,
          vec3One,
          0,
          [0, 0, 0, 0],
        );
        _tempResult = addComponent(_vxcbb, LineRendererCls);
      } else {
        _tempResult
          .method("get_gameObject")
          .invoke()
          .method("SetActive")
          .invoke(true);
      }
      const _vxbea = _tempResult.method("get_material").invoke();
      try {
        _vxbea.method("set_shader").invoke(urpUnlitShader);
      } catch (_) {
        try {
          _vxbea.method("set_shader").invoke(uiDefaultShader);
        } catch (_2) {}
      }
      _tempResult.method("set_startColor").invoke(gunColor);
      _tempResult.method("set_endColor").invoke(gunColor);
      const _vxd4b = 0.03;
      (_tempResult.method("set_startWidth").invoke(_vxd4b),
        _tempResult.method("set_endWidth").invoke(_vxd4b),
        _tempResult.method("set_positionCount").invoke(2),
        _tempResult.method("set_useWorldSpace").invoke(true),
        _tempResult.method("SetPosition").invoke(0, rayOrigin),
        _tempResult.method("SetPosition").invoke(1, _localObj));
      if (rightTrigger) {
        const _vx5bc = 10;
        (_tempResult.method("set_positionCount").invoke(_vx5bc),
          _tempResult.method("SetPosition").invoke(0, rayOrigin));
        for (let _vx402 = 1; _vx402 < _vx5bc - 1; _vx402++) {
          const _vx37c = _vx402 / (_vx5bc - 1),
            _vx4eb = Vector3Cls.method("Lerp").invoke(
              rayOrigin,
              _localObj,
              _vx37c,
            ),
            _vx5cf = Math.random();
          let _vx180 = vec3Zero;
          if (_vx5cf < 0.75)
            _vx180 = [
              (Math.random() - 0.5) * 0.2,
              (Math.random() - 0.5) * 0.2,
              (Math.random() - 0.5) * 0.2,
            ];
          const _vx204 = Vector3Cls.method("op_Addition").invoke(
            _vx4eb,
            _vx180,
          );
          _tempResult.method("SetPosition").invoke(_vx402, _vx204);
        }
        _tempResult.method("SetPosition").invoke(_vx5bc - 1, _localObj);
      }
      const _vx2d8 = {
        isNull: () => false,
        handle: { isNull: () => false },
        method: (_name, ..._args) => {
          if (closestHit) return closestHit.method(_name, ..._args);
          if (_name === "get_point" || _name === "get_point")
            return { invoke: () => _localObj };
          return { invoke: () => null };
        },
        raw: closestHit || null,
      };
      return {
        ray: _vx2d8,
        gunPointer: _spawnObj,
        point: _localObj,
        endPosition: _localObj,
      };
    }
    function _vx40c() {
      if (!menu) return;
      _argQuat = getTransform(menu);
      let _vx161, _vx1ee;
      righthand
        ? ((_vx161 = rightHandTransform.method("get_position").invoke()),
          (_vx1ee = rightHandTransform.method("get_rotation").invoke()),
          (_vx1ee = QuaternionCls.method("op_Multiply").invoke(
            _vx1ee,
            QuaternionCls.method("Euler").invoke(0, 0, 180),
          )))
        : ((_vx161 = leftHandTransform.method("get_position").invoke()),
          (_vx1ee = leftHandTransform.method("get_rotation").invoke()));
      if (LerpMenu) {
        const _vx6a5 = _argQuat.method("get_position").invoke(),
          _vxdf4 = Vector3Cls.method("Distance").invoke(_vx6a5, vec3Zero);
        _vxdf4 < 1
          ? (_argQuat.method("set_position").invoke(_vx161),
            _argQuat.method("set_rotation").invoke(_vx1ee))
          : (_argQuat
              .method("set_position")
              .invoke(
                Vector3Cls.method("Lerp").invoke(
                  _vx6a5,
                  _vx161,
                  Math.min(1, deltaTime * 15),
                ),
              ),
            _argQuat
              .method("set_rotation")
              .invoke(
                QuaternionCls.method("Slerp").invoke(
                  _argQuat.method("get_rotation").invoke(),
                  _vx1ee,
                  Math.min(1, deltaTime * 15),
                ),
              ));
      } else
        (_argQuat.method("set_position").invoke(_vx161),
          _argQuat.method("set_rotation").invoke(_vx1ee));
    }
    function n5EaseMenu(_x) {
      _x = Math.max(0, Math.min(1, _x));
      return 1 - Math.pow(1 - _x, 3);
    }
    function n5ApplyMenuAnimation(_wanted) {
      try {
        if (!menu) return false;
        const _tf = getTransform(menu);
        if (!_tf || _tf.isNull()) return false;
        if (!_n5MenuBaseScale) {
          try {
            _n5MenuBaseScale = _tf.method("get_localScale").invoke();
          } catch (_) {
            _n5MenuBaseScale = [menuscale, menuscale, menuscale];
          }
        }
        _n5MenuAnim = _wanted
          ? Math.min(1, _n5MenuAnim + deltaTime * 18)
          : Math.max(0, _n5MenuAnim - deltaTime * 18);
        _n5MenuAnimTarget = _wanted ? 1 : 0;
        const _open = n5EaseMenu(_n5MenuAnim);
        if (_n5MenuClickBounce > 0)
          _n5MenuClickBounce = Math.max(0, _n5MenuClickBounce - deltaTime * 18);
        const _bounce =
          _n5MenuClickBounce > 0
            ? 1.0 - 0.16 * Math.sin(_n5MenuClickBounce * Math.PI)
            : 1.0;
        const _scale = Math.max(0.01, _open * _bounce);
        try {
          _tf
            .method("set_localScale")
            .invoke(
              Vector3Cls.method("op_Multiply").invoke(_n5MenuBaseScale, _scale),
            );
        } catch (_) {}
        _n5MenuClosing = false;
        _n5LastMenuWanted = _wanted;
        try {
          menu.method("SetActive").invoke(!!_wanted);
        } catch (_) {}
        return _wanted || _n5MenuAnim > 0.01;
      } catch (_e) {
        return true;
      }
    }
    function _n5PCPositionMenuAtHead() {
      if (!menu) return;
      const _menuTf = getTransform(menu);
      if (!_menuTf || _menuTf.isNull()) return;
      let _headTf = null;
      try {
        const _cam = coreImage
          .class("UnityEngine.Camera")
          .method("get_main")
          .invoke();
        if (_cam && !_cam.isNull()) _headTf = getTransform(_cam);
      } catch (_) {}
      if (!_headTf || _headTf.isNull()) _headTf = getTransform(headCollider);
      if (!_headTf || _headTf.isNull()) return;
      const _headPos = _headTf.method("get_position").invoke();
      const _yawR = (_n5PCYaw * Math.PI) / 180;
      const _fwdX = Math.sin(_yawR);
      const _fwdZ = Math.cos(_yawR);
      const _offset = [_fwdX * 1.15, -0.1, _fwdZ * 1.15];
      const _targetPos = Vector3Cls.method("op_Addition").invoke(
        _headPos,
        _offset,
      );
      const _menuRot = QuaternionCls.method("Euler").invoke(
        -90,
        _n5PCYaw + 90,
        0,
      );
      if (LerpMenu) {
        const _cur = _menuTf.method("get_position").invoke();
        const _dist = Vector3Cls.method("Distance").invoke(_cur, vec3Zero);
        if (_dist > 5) {
          _menuTf.method("set_position").invoke(_targetPos);
          _menuTf.method("set_rotation").invoke(_menuRot);
        } else {
          _menuTf
            .method("set_position")
            .invoke(
              Vector3Cls.method("Lerp").invoke(_cur, _targetPos, deltaTime * 8),
            );
          _menuTf
            .method("set_rotation")
            .invoke(
              QuaternionCls.method("Slerp").invoke(
                _menuTf.method("get_rotation").invoke(),
                _menuRot,
                deltaTime * 8,
              ),
            );
        }
      } else {
        _menuTf.method("set_position").invoke(_targetPos);
        _menuTf.method("set_rotation").invoke(_menuRot);
      }
    }
    class MenuItem {
      constructor(opts: {
        buttonText: string;
        isTogglable?: boolean;
        enabled?: boolean;
        method?: () => void;
        enableMethod?: () => void;
        disableMethod?: () => void;
        toolTip?: string | null;
      }) {
        this.buttonText = opts.buttonText;
        this.isTogglable =
          opts.isTogglable != null && opts.isTogglable !== undefined
            ? opts.isTogglable
            : true;
        this.method = opts.method;
        this.enableMethod = opts.enableMethod;
        this.disableMethod = opts.disableMethod;
        this.enabled =
          opts.enabled != null && opts.enabled !== undefined
            ? opts.enabled
            : false;
        this.toolTip =
          opts.toolTip != null && opts.toolTip !== undefined
            ? opts.toolTip
            : null;
      }
    }
    function n5BuildBlueprintCategory() {
      const _buttons = [
        new MenuItem({
          buttonText: "<< Back to World",
          isTogglable: false,
          toolTip: "back to world hub",
          method: () => {
            currentCategory = 44;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Refresh Blueprints",
          isTogglable: false,
          toolTip: "reload json blueprints",
          method: () => {
            const _files = n5RefreshBlueprintFiles();
            menuCategories[25] = n5BuildBlueprintCategory();
            _iterMob = new Map();
            menuCategories
              .flat()
              .forEach((_b) => _iterMob.set(_b.buttonText, _b));
            currentNotification = "Blueprints: " + _files.length;
            notifactionResetTime = time + 2;
            _n5MenuLastCat = -1;
          },
        }),
        new MenuItem({
          buttonText: "BP< Prev",
          isTogglable: false,
          toolTip: "previous blueprint for Blueprint Gun",
          method: () => {
            const _files = n5BlueprintFiles.length
              ? n5BlueprintFiles
              : n5RefreshBlueprintFiles();
            if (!_files.length) {
              currentNotification = "No blueprint jsons";
              notifactionResetTime = time + 2;
              return;
            }
            n5BlueprintIndex =
              (n5BlueprintIndex - 1 + _files.length) % _files.length;
            currentNotification = "Blueprint: " + _files[n5BlueprintIndex].name;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "BP> Next",
          isTogglable: false,
          toolTip: "next blueprint for Blueprint Gun",
          method: () => {
            const _files = n5BlueprintFiles.length
              ? n5BlueprintFiles
              : n5RefreshBlueprintFiles();
            if (!_files.length) {
              currentNotification = "No blueprint jsons";
              notifactionResetTime = time + 2;
              return;
            }
            n5BlueprintIndex = (n5BlueprintIndex + 1) % _files.length;
            currentNotification = "Blueprint: " + _files[n5BlueprintIndex].name;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Blueprint Gun",
          isTogglable: true,
          toolTip:
            "hold right grip and trigger to spawn selected blueprint at pointer",
          method: () => {
            n5RunBlueprintGun();
          },
        }),
      ];
      const _files = n5BlueprintFiles.length
        ? n5BlueprintFiles
        : n5RefreshBlueprintFiles();
      if (!_files.length) {
        _buttons.push(
          new MenuItem({
            buttonText: "No JSONs Found",
            isTogglable: false,
            toolTip: "put json files in Documents/bp",
            method: () => {
              currentNotification =
                "Put blueprints in " + n5EnsureBlueprintDir();
              notifactionResetTime = time + 3;
            },
          }),
        );
      } else {
        for (const _file of _files) {
          _buttons.push(
            new MenuItem({
              buttonText: "BP: " + _file.name.replace(/\.json$/i, ""),
              isTogglable: false,
              toolTip: "spawn " + _file.name + " at gun pointer",
              method: () => {
                n5SpawnBlueprintFile(_file.path, n5BlueprintGunOrigin());
              },
            }),
          );
        }
      }
      return _buttons;
    }
    function n5RandomItemConfig() {
      return {
        scaleModifier: Math.floor(Math.random() * 256) - 128,
        colorHue: Math.floor(Math.random() * 255) - 127,
        colorSaturation: Math.floor(Math.random() * 148) - 20,
      };
    }
    function n5ApplyItemVisualConfig(_obj, _hue, _sat, _scale) {
      try {
        let _go = _obj;
        try {
          _go = _obj.method("get_gameObject").invoke();
        } catch (_) {}
        const _targets = [];
        for (const _t of [_obj, _go]) {
          if (!_t || (_t.handle && _t.handle.isNull())) continue;
          _targets.push(_t);
          try {
            const _gbo = _t
              .method("GetComponent", 1)
              .inflate(GrabbableObjectCls2)
              .invoke();
            if (_gbo && !_gbo.handle.isNull()) _targets.push(_gbo);
          } catch (_) {}
          try {
            const _gi = _t
              .method("GetComponent", 1)
              .inflate(GrabbableItemCls)
              .invoke();
            if (_gi && !_gi.handle.isNull()) _targets.push(_gi);
          } catch (_) {}
          try {
            const _ig = _t
              .method("GetComponent", 1)
              .inflate(GrabbableObjectCls)
              .invoke();
            if (_ig && !_ig.handle.isNull()) _targets.push(_ig);
          } catch (_) {}
        }
        for (const _target of _targets) {
          try {
            _target.method("set_colorHue").invoke(_hue | 0);
          } catch (_) {}
          try {
            _target.method("set_colorHue").invoke(_hue | 0);
          } catch (_) {}
          try {
            _target.field("colorHue").value = _hue | 0;
          } catch (_) {}
          try {
            _target.method("set_colorSaturation").invoke(_sat | 0);
          } catch (_) {}
          try {
            _target.method("set_colorSaturation").invoke(_sat | 0);
          } catch (_) {}
          try {
            _target.field("colorSaturation").value = _sat | 0;
          } catch (_) {}
          try {
            _target.method("set_scaleModifier").invoke(_scale | 0);
          } catch (_) {}
          try {
            _target.method("set_scaleModifier").invoke(_scale | 0);
          } catch (_) {}
          try {
            _target.field("scaleModifier").value = _scale | 0;
          } catch (_) {}
          try {
            _target.method("set_allowAddToBag").invoke(true);
          } catch (_) {}
          try {
            _target.field("_allowAddToBag").value = true;
          } catch (_) {}
          try {
            _target.method("set_allowAddToQuiver").invoke(true);
          } catch (_) {}
          try {
            _target.field("_allowAddToQuiver").value = true;
          } catch (_) {}
          try {
            _target.method("set_disableAutoDespawnTimer").invoke(true);
          } catch (_) {}
          try {
            _target.field("_disableAutoDespawnTimer").value = true;
          } catch (_) {}
        }
      } catch (_e) {
        console.error("[N5 ApplyItemVisualConfig]", _e);
      }
    }
    function n5ApplyRandomItemConfig(_obj) {
      const _cfg = n5RandomItemConfig();
      n5ApplyBlueprintItemConfig(_obj, _cfg);
      n5ApplyItemVisualConfig(
        _obj,
        _cfg.colorHue,
        _cfg.colorSaturation,
        _cfg.scaleModifier,
      );
      try {
        let _go = _obj;
        try {
          _go = _obj.method("get_gameObject").invoke();
        } catch (_) {}
        let _ig = null;
        try {
          _ig = _go
            .method("GetComponent", 1)
            .inflate(GrabbableObjectCls)
            .invoke();
        } catch (_) {}
        if (!_ig || (_ig.handle && _ig.handle.isNull()))
          try {
            _ig = _obj
              .method("GetComponent", 1)
              .inflate(GrabbableObjectCls)
              .invoke();
          } catch (_) {}
        if (_ig && (!_ig.handle || !_ig.handle.isNull())) {
          try {
            _ig.method("set_disableAutoDespawnTimer").invoke(true);
          } catch (_) {}
          try {
            _ig.field("_disableAutoDespawnTimer").value = true;
          } catch (_) {}
          try {
            _ig.method("set_allowAddToBag").invoke(true);
          } catch (_) {}
          try {
            _ig.field("_allowAddToBag").value = true;
          } catch (_) {}
        }
      } catch (_) {}
    }
    function n5ApplyRainbowItemConfig(_obj) {
      try {
        const _h = Math.floor((time * 96 + frameCount * 3) % 255) - 127;
        const _s = 90 + Math.floor((Math.sin(time * 3.0) + 1) * 0.5 * 37);
        const _scale = Math.floor((Math.sin(time * 2.1) + 1) * 0.5 * 32) - 8;
        n5ApplyItemVisualConfig(_obj, _h, _s, _scale);
      } catch (_e) {
        console.error("[N5 RainbowItemConfig]", _e);
      }
    }
    function n5RightHandPose(_dist = 0.45) {
      const _hand =
        gorillaLocomotionInstance.field("rightHandTransform").value ||
        rightHandTransform;
      const _hp = _hand.method("get_position").invoke();
      const _hf = _hand.method("get_forward").invoke();
      return {
        hand: _hand,
        pos: n5VecAdd(_hp, n5ScaleVec(_hf, _dist)),
        forward: _hf,
        rot: _hand.method("get_rotation").invoke(),
      };
    }
    function n5SelfSpawnPose(_dist = 1.0, _height = 0.65) {
      let _base = n5GetSafeSelfPosition();
      let _tf = null;
      try {
        _tf = getTransform(headCollider);
      } catch (_) {}
      if (!_tf || (_tf.isNull && _tf.isNull())) {
        try {
          const _pc = n5GetPlayerControllerInstance();
          if (_pc && !_pc.handle.isNull()) _tf = getTransform(_pc);
        } catch (_) {}
      }
      if (!_base) {
        try {
          _base = _tf.method("get_position").invoke();
        } catch (_) {}
      }
      if (!n5IsGoodPosition(_base)) {
        try {
          _base = rightHandTransform.method("get_position").invoke();
        } catch (_) {}
      }
      let _f = [0, 0, 1],
        _r = [1, 0, 0],
        _u = [0, 1, 0],
        _rot = identityRotation;
      try {
        _f = _tf.method("get_forward").invoke();
      } catch (_) {}
      try {
        _r = _tf.method("get_right").invoke();
      } catch (_) {}
      try {
        _u = _tf.method("get_up").invoke();
      } catch (_) {}
      try {
        _rot = _tf.method("get_rotation").invoke();
      } catch (_) {}
      const _pos = [
        n5VecNum(_base, 0, "x") +
          n5VecNum(_f, 0, "x") * _dist +
          n5VecNum(_u, 0, "x") * _height,
        n5VecNum(_base, 1, "y") +
          n5VecNum(_f, 1, "y") * _dist +
          n5VecNum(_u, 1, "y") * _height,
        n5VecNum(_base, 2, "z") +
          n5VecNum(_f, 2, "z") * _dist +
          n5VecNum(_u, 2, "z") * _height,
      ];
      return { pos: _pos, forward: _f, right: _r, up: _u, rot: _rot };
    }
    function n5SpawnGiveawayBag(_launch = true) {
      try {
        const _pose = n5RightHandPose(0.55);
        const _bags = [
          "item_backpack_large_base",
          "item_backpack",
          "item_backpack_green",
          "item_backpack_small_base",
          "item_backpack_white",
          "item_pelican_case",
          "item_quiver",
          "item_quiver_heart",
        ];
        const _bagId = _bags[Math.floor(Math.random() * _bags.length)];
        const _bag = n5SpawnContainerItemAt(
          _bagId,
          _pose.pos,
          _pose.rot || identityRotation,
        );
        if (!_bag) {
          currentNotification = "Giveaway bag failed";
          notifactionResetTime = time + 2;
          return false;
        }
        n5ApplyRandomItemConfig(_bag);
        const _con = n5GetContainerFromItem(_bag);
        let _filled = 0;
        for (let _i = 0; _i < 15; _i++) {
          const _id = itemIDs[Math.floor(Math.random() * itemIDs.length)];
          const _off = [
            (_pose.pos[0] || 0) + (Math.random() - 0.5) * 0.25,
            (_pose.pos[1] || 0) + 0.05 + Math.random() * 0.2,
            (_pose.pos[2] || 0) + (Math.random() - 0.5) * 0.25,
          ];
          const _it = n5SpawnContainerItemAt(_id, _off, identityRotation);
          if (!_it) continue;
          n5ApplyRandomItemConfig(_it);
          if (_con && n5AddItemObjectToContainer(_it, _con)) _filled++;
        }
        if (_launch) n5LaunchItemObject(_bag, _pose.forward, 22);
        currentNotification = "Giveaway bag: " + _filled + "/15";
        notifactionResetTime = time + 3;
        return true;
      } catch (_e) {
        currentNotification = "Giveaway failed";
        notifactionResetTime = time + 2;
        console.error("[N5 Giveaway Bag]", _e);
        return false;
      }
    }
    function n5ArenaManagerCall(_name, _arg) {
      try {
        const _cls = acImage.class("AnimalCompany.ArenaGameManager");
        if (_arg === undefined) _cls.method(_name).invoke();
        else _cls.method(_name).invoke(_arg);
        currentNotification = "Arena: " + _name;
        notifactionResetTime = time + 2;
        return true;
      } catch (_e) {
        currentNotification = "Arena " + _name + " failed";
        notifactionResetTime = time + 2;
        console.error("[N5 Arena]", _name, _e);
        return false;
      }
    }
    function n5RunArenaStartStopSpam() {
      if (!n5ArenaStartStopSpam || time < n5ArenaStartStopDelay) return;
      n5ArenaStartStopDelay = time + 0.18;
      try {
        const _cls = acImage.class("AnimalCompany.ArenaGameManager");
        try {
          _cls.method("StartGame").invoke();
        } catch (_) {}
        try {
          _cls.method("EndGame").invoke();
        } catch (_) {}
      } catch (_e) {
        console.error("[N5 Arena StartStop Spam]", _e);
      }
    }
    function n5MomBoss() {
      try {
        const _cls = acImage.class("AnimalCompany.MomBossController");
        let _inst = null;
        try {
          _inst = _cls.field("_instance").value;
        } catch (_) {}
        if (!_inst || (_inst.isNull && _inst.isNull()))
          try {
            _inst = UnityObjectCls.method("FindObjectOfType", 0)
              .inflate(_cls)
              .invoke();
          } catch (_) {}
        return _inst && (!_inst.handle || !_inst.handle.isNull())
          ? _inst
          : null;
      } catch (_) {
        return null;
      }
    }
    function n5MomBossCall(_method, ..._args) {
      try {
        const _m = n5MomBoss();
        if (!_m) {
          currentNotification = "Mom Boss not found";
          notifactionResetTime = time + 2;
          return false;
        }
        _m.method(_method).invoke(..._args);
        currentNotification = "MomBoss: " + _method;
        notifactionResetTime = time + 2;
        return true;
      } catch (_e) {
        currentNotification = "MomBoss " + _method + " failed";
        notifactionResetTime = time + 2;
        console.error("[N5 MomBoss]", _method, _e);
        return false;
      }
    }
    function n5SpawnMomBossAtHand() {
      try {
        const _pose = n5RightHandPose(1.2);
        return n5SpawnMomBossAt(_pose.pos, _pose.rot);
      } catch (_e) {
        console.error("[N5 SpawnMomBoss]", _e);
      }
      currentNotification = "Mom spawn failed";
      notifactionResetTime = time + 2;
      return false;
    }
    function n5SpawnMomBossAt(_pos, _rot = identityRotation) {
      try {
        const _names = [
          "MomBossController",
          "mom_pillow",
          "item_momboss_box",
          "MomToyBlockObject",
        ];
        for (const _n of _names) {
          const _o = String(_n).startsWith("item_")
            ? n5SpawnItemObjectAt(_n, _pos, _rot)
            : spawnNetworkPrefab(_n, _pos, _rot);
          if (_o) {
            currentNotification = "Mom spawn: " + _n;
            notifactionResetTime = time + 2;
            return true;
          }
        }
      } catch (_e) {
        console.error("[N5 SpawnMomBossAt]", _e);
      }
      currentNotification = "Mom spawn failed";
      notifactionResetTime = time + 2;
      return false;
    }
    function n5MomBossSetField(_field, _value) {
      try {
        const _m = n5MomBoss();
        if (!_m) return false;
        _m.field(_field).value = _value;
        currentNotification = "Mom " + _field + " = " + _value;
        notifactionResetTime = time + 2;
        return true;
      } catch (_e) {
        console.error("[N5 Mom field]", _field, _e);
        return false;
      }
    }
    let n5ShadowBossPhase = 0,
      n5ShadowBossSpamDelay = 0;
    function n5ShadowBoss() {
      try {
        const _cls = acImage.class(
          "AnimalCompany.ShadowBoss.ShadowBossController",
        );
        let _inst = null;
        try {
          _inst = UnityObjectCls.method("FindObjectOfType", 0)
            .inflate(_cls)
            .invoke();
        } catch (_) {}
        return _inst && (!_inst.handle || !_inst.handle.isNull())
          ? _inst
          : null;
      } catch (_) {
        return null;
      }
    }
    function n5AllShadowBosses() {
      let _all = [];
      try {
        _all = n5FindAllClass("AnimalCompany.ShadowBoss.ShadowBossController");
      } catch (_) {}
      return _all && _all.length ? _all : [n5ShadowBoss()].filter(Boolean);
    }
    function n5SpawnShadowBossAt(_pos, _rot = identityRotation) {
      try {
        if (
          n5SpawnMobAt("ShadowBossController", _pos, _rot) ||
          n5SpawnMobAt("ShadowBoss", _pos, _rot) ||
          spawnNetworkPrefab("ShadowBossController", _pos, _rot) ||
          spawnNetworkPrefab("mob_prefab/ShadowBossController", _pos, _rot)
        ) {
          currentNotification = "Shadow Boss spawned";
          notifactionResetTime = time + 2;
          return true;
        }
      } catch (_e) {
        console.error("[N5 ShadowBoss spawn]", _e);
      }
      currentNotification = "Shadow Boss spawn failed";
      notifactionResetTime = time + 2;
      return false;
    }
    function n5SpawnShadowBossAtHand() {
      const _pose = n5RightHandPose(1.4);
      return n5SpawnShadowBossAt(_pose.pos, _pose.rot || identityRotation);
    }
    function n5ShadowBossCall(_methods, ..._args) {
      let _count = 0;
      if (typeof _methods === "string") _methods = [_methods];
      for (const _b of n5AllShadowBosses()) {
        for (const _m of _methods) {
          try {
            _b.method(_m).invoke(..._args);
            _count++;
            break;
          } catch (_) {}
        }
      }
      currentNotification = "ShadowBoss calls: " + _count;
      notifactionResetTime = time + 2;
      return _count;
    }
    function n5ShadowBossSetFields(_fields) {
      let _count = 0;
      for (const _b of n5AllShadowBosses()) {
        let _did = false;
        for (const _k of Object.keys(_fields)) {
          try {
            _b.field(_k).value = _fields[_k];
            _did = true;
          } catch (_) {}
          try {
            _b.method("set_" + _k).invoke(_fields[_k]);
            _did = true;
          } catch (_) {}
        }
        if (_did) _count++;
      }
      currentNotification = "ShadowBoss fields: " + _count;
      notifactionResetTime = time + 2;
      return _count;
    }
    function n5ShadowBossToMe() {
      const _pos = n5LocalPlayerPos();
      let _count = 0;
      for (const _b of n5AllShadowBosses()) {
        try {
          getTransform(_b).method("set_position").invoke(_pos);
          _count++;
        } catch (_) {}
        try {
          _b.field("__laserTargetPos").value = _pos;
        } catch (_) {}
        try {
          _b.field("__diveBombTargetPos").value = _pos;
        } catch (_) {}
      }
      currentNotification = "ShadowBoss to me: " + _count;
      notifactionResetTime = time + 2;
    }
    function n5ShadowBossTargetHand() {
      const _pose = n5RightHandPose(0.9);
      n5ShadowBossSetFields({
        __laserTargetPos: _pose.pos,
        __diveBombTargetPos: _pose.pos,
        __smiteMoveStartPos: _pose.pos,
      });
    }
    function n5ShadowBossNextPhase() {
      n5ShadowBossPhase = (n5ShadowBossPhase + 1) % 12;
      n5ShadowBossSetFields({
        __phase: n5ShadowBossPhase,
        _previousPhase: n5ShadowBossPhase,
      });
      n5ShadowBossCall("HandlePhaseChanged");
      n5ShadowBossCall("CopyBackingFieldsToState", true);
    }
    function n5ShadowBossSmiteZone() {
      let _count = 0;
      try {
        const _boss = n5ShadowBoss();
        const _data =
          _boss && _boss.method ? _boss.method("get_bossData").invoke() : null;
        const _center = n5LocalPlayerPos();
        for (const _z of n5FindAllClass("AnimalCompany.ShadowBoss.SmiteZone")) {
          try {
            _z.method("Activate").invoke(_center, _data, 8.0, time);
            _count++;
          } catch (_) {}
        }
      } catch (_e) {
        console.error("[N5 ShadowBoss smite zone]", _e);
      }
      currentNotification = "Smite zones: " + _count;
      notifactionResetTime = time + 2;
    }
    function n5RunShadowBossLaserSpam() {
      if (time < n5ShadowBossSpamDelay) return;
      n5ShadowBossSpamDelay = time + 0.65;
      n5ShadowBossTargetHand();
      n5ShadowBossCall("StartLaserFire");
      n5ShadowBossCall("UpdateLaserFire");
      n5ShadowBossCall("ApplyLaserDamage");
    }
    function n5BuildShadowBossCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Shadow Boss",
          isTogglable: false,
          toolTip: "spawn ShadowBossController at right hand",
          method: () => {
            n5SpawnShadowBossAtHand();
          },
        }),
        new MenuItem({
          buttonText: "Shadow Boss To Me",
          isTogglable: false,
          toolTip: "teleport live ShadowBossController to you",
          method: () => {
            n5ShadowBossToMe();
          },
        }),
        new MenuItem({
          buttonText: "Target Right Hand",
          isTogglable: false,
          toolTip:
            "set laser, dive, and smite target fields to your right hand",
          method: () => {
            n5ShadowBossTargetHand();
          },
        }),
        new MenuItem({
          buttonText: "Phase +",
          isTogglable: false,
          toolTip: "cycles dumped __phase/_previousPhase backing fields",
          method: () => {
            n5ShadowBossNextPhase();
          },
        }),
        new MenuItem({
          buttonText: "Setup/Authority",
          isTogglable: false,
          toolTip: "calls Setup and HandleStateAuthorityChanged",
          method: () => {
            n5ShadowBossCall("Setup");
            n5ShadowBossCall("HandleStateAuthorityChanged");
          },
        }),
        new MenuItem({
          buttonText: "Fill Shell",
          isTogglable: false,
          toolTip: "calls FillShell or sets _shellFilled true",
          method: () => {
            if (!n5ShadowBossCall(["FillShell", "HandleShellFilled"]))
              n5ShadowBossSetFields({ __shellFilled: true });
          },
        }),
        new MenuItem({
          buttonText: "Clear Shell",
          isTogglable: false,
          toolTip: "calls ClearShell or sets _shellFilled false",
          method: () => {
            if (!n5ShadowBossCall("ClearShell"))
              n5ShadowBossSetFields({ __shellFilled: false });
          },
        }),
        new MenuItem({
          buttonText: "Force Stun",
          isTogglable: false,
          toolTip: "calls RPC_Stun and maxes _stunAccumulation",
          method: () => {
            n5ShadowBossSetFields({
              __stunAccumulation: 9999.0,
              __accumulatedVulnerableDamage: 32767,
            });
            n5ShadowBossCall("RPC_Stun", 8.0) ||
              n5ShadowBossCall("StartStunned");
          },
        }),
        new MenuItem({
          buttonText: "Start Smite",
          isTogglable: false,
          toolTip: "calls StartSmite then HandleSmiteChargeComplete",
          method: () => {
            n5ShadowBossCall("StartSmite");
            n5ShadowBossCall("HandleSmiteChargeComplete");
          },
        }),
        new MenuItem({
          buttonText: "Activate Smite Zone",
          isTogglable: false,
          toolTip: "activates live SmiteZone objects around you",
          method: () => {
            n5ShadowBossSmiteZone();
          },
        }),
        new MenuItem({
          buttonText: "Start Dive Bomb",
          isTogglable: false,
          toolTip: "sets dive target then calls StartDiveBomb/UpdateDiveBomb",
          method: () => {
            n5ShadowBossTargetHand();
            n5ShadowBossCall("StartDiveBomb");
            n5ShadowBossCall("UpdateDiveBomb");
          },
        }),
        new MenuItem({
          buttonText: "Land Dive Bomb",
          isTogglable: false,
          toolTip: "calls DiveBombLand",
          method: () => {
            n5ShadowBossCall("DiveBombLand");
          },
        }),
        new MenuItem({
          buttonText: "Fire Laser",
          isTogglable: false,
          toolTip:
            "sets laser target then calls StartLaserFire/ApplyLaserDamage",
          method: () => {
            n5ShadowBossTargetHand();
            n5ShadowBossCall("StartLaserFire");
            n5ShadowBossCall("ApplyLaserDamage");
          },
        }),
        new MenuItem({
          buttonText: "Laser Spam",
          isTogglable: true,
          toolTip: "keeps firing laser at your right hand target",
          enableMethod: () => {
            n5ShadowBossSpamDelay = 0;
          },
          method: () => {
            n5RunShadowBossLaserSpam();
          },
        }),
        new MenuItem({
          buttonText: "Kill Shadow Boss",
          isTogglable: false,
          toolTip: "calls ForceDie/SetDying on live ShadowBossController",
          method: () => {
            n5ShadowBossCall("ForceDie");
            n5ShadowBossCall("SetDying", true);
          },
        }),
      ];
    }
    function n5HookReturn(_cls, _name, _flag, _value, _argc = -1) {
      try {
        const _m = _argc >= 0 ? _cls.method(_name, _argc) : _cls.method(_name);
        _m.implementation = function () {
          if (_flag())
            return typeof _value === "function"
              ? _value.apply(this, arguments)
              : _value;
          return this.method(_name, _argc).invoke(...arguments);
        };
        return true;
      } catch (_) {
        return false;
      }
    }
    function n5HookVoid(_cls, _name, _flag, _argc = -1, _before = null) {
      try {
        const _m = _argc >= 0 ? _cls.method(_name, _argc) : _cls.method(_name);
        _m.implementation = function () {
          if (_flag()) {
            try {
              if (_before) _before.apply(this, arguments);
            } catch (_) {}
            return;
          }
          return this.method(_name, _argc).invoke(...arguments);
        };
        return true;
      } catch (_) {
        return false;
      }
    }
    function n5SetStatePrimitiveValue(_p, _v) {
      if (!_p) return false;
      try {
        _p.method("set_Value", 1).invoke(_v);
        return true;
      } catch (_) {}
      try {
        _p.method("SetValue", 1).invoke(_v);
        return true;
      } catch (_) {}
      try {
        _p.field("value").value = _v;
        return true;
      } catch (_) {}
      try {
        _p.field("_value").value = _v;
        return true;
      } catch (_) {}
      return false;
    }
    function n5PatchStatePrimitiveGetter(_obj, _getter, _v) {
      try {
        return n5SetStatePrimitiveValue(_obj.method(_getter).invoke(), _v);
      } catch (_) {}
      return false;
    }
    function n5PatchAllStateObjects(_className, _patcher) {
      let _count = 0;
      try {
        for (const _o of n5FindAllClass(_className)) {
          try {
            if (_patcher(_o)) _count++;
          } catch (_) {}
        }
      } catch (_) {}
      return _count;
    }
    function n5ForceShopStates() {
      let _count = 0;
      _count += n5PatchAllStateObjects(
        "AnimalCompany.GameplayItemState",
        (_it) => {
          let _ok = false;
          for (const _g of ["get_price", "get_unlockPrice", "get_value"])
            _ok = !!n5PatchStatePrimitiveGetter(_it, _g, 0) || _ok;
          for (const _g of [
            "get_isUnlocked",
            "get_unlockDependenciesSatisfied",
          ])
            _ok = !!n5PatchStatePrimitiveGetter(_it, _g, true) || _ok;
          for (const _g of ["get_unlockable"])
            _ok = !!n5PatchStatePrimitiveGetter(_it, _g, true) || _ok;
          return _ok;
        },
      );
      _count += n5PatchAllStateObjects(
        "AnimalCompany.ItemVendingMachineView",
        (_v) => {
          let _ok = false;
          try {
            _v.field("_devModeOn").value = true;
            _ok = true;
          } catch (_) {}
          try {
            _v.method("RefreshItems").invoke();
            _ok = true;
          } catch (_) {}
          return _ok;
        },
      );
      _count += n5PatchAllStateObjects(
        "AnimalCompany.ItemVendingMachineV3Mediator",
        (_v) => {
          try {
            _v.field("_devModeEnabled").value = true;
            return true;
          } catch (_) {}
          return false;
        },
      );
      currentNotification = "Shop states patched: " + _count;
      notifactionResetTime = time + 2;
      return _count;
    }
    function n5ForceCosmeticStates() {
      const _count = n5PatchAllStateObjects(
        "AnimalCompany.AvatarItemState",
        (_it) => {
          let _ok = false;
          for (const _g of [
            "get_showInShop",
            "get_isOwned",
            "get_canPurchaseDirectly",
            "get_isCompatibleWithCurrentApp",
          ])
            _ok = !!n5PatchStatePrimitiveGetter(_it, _g, true) || _ok;
          for (const _g of [
            "get_hardPrice",
            "get_origPrice",
            "get_discount",
            "get_finalPrice",
          ])
            _ok = !!n5PatchStatePrimitiveGetter(_it, _g, 0) || _ok;
          return _ok;
        },
      );
      currentNotification = "Cosmetics patched: " + _count;
      notifactionResetTime = time + 2;
      return _count;
    }
    function n5ForceDevSpoof() {
      let _count = 0;
      _count += n5PatchAllStateObjects("AnimalCompany.UserState", (_u) =>
        n5PatchStatePrimitiveGetter(_u, "get_isDeveloper", true),
      );
      _count += n5PatchAllStateObjects(
        "AnimalCompany.UserInventoryState",
        (_u) =>
          n5PatchStatePrimitiveGetter(
            _u,
            "get_devOwnAllAvatarItemsOverride",
            true,
          ),
      );
      _count += n5PatchAllStateObjects(
        "AnimalCompany.NetworkedLootManager",
        (_m) => {
          try {
            _m.field("_isDeveloper").value = true;
            return true;
          } catch (_) {
            return false;
          }
        },
      );
      _count += n5PatchAllStateObjects(
        "AnimalCompany.PlayerWatchState",
        (_w) => {
          try {
            _w.field("<sideMenu>k__BackingField").value = 4;
            return true;
          } catch (_) {
            return false;
          }
        },
      );
      currentNotification = "Dev spoof patched: " + _count;
      notifactionResetTime = time + 2;
      return _count;
    }
    function n5InstallGoodShitHooks() {
      if (n5GoodShitHooksInstalled) return true;
      let _hooks = 0;
      try {
        const _gameplay = acImage.class("AnimalCompany.GameplayItemState");
        for (const _m of [
          "get_isPurchasable",
          "get_isResearchable",
          "get_isProduct",
        ])
          if (n5HookReturn(_gameplay, _m, () => n5ShopUnlockEnabled, true))
            _hooks++;
        for (const _m of [
          "get_allowSaving",
          "get_allowBlueprintSaving",
          "get_canBeSavedToLoadoutTemplate",
        ])
          if (n5HookReturn(_gameplay, _m, () => n5BlueprintAbuseEnabled, true))
            _hooks++;
        if (
          n5HookReturn(
            _gameplay,
            "get_maxInBlueprint",
            () => n5BlueprintAbuseEnabled,
            999,
          )
        )
          _hooks++;
      } catch (_e) {
        console.error("[N5 GoodShit] GameplayItemState hooks failed:", _e);
      }
      try {
        const _gm = acImage.class("AnimalCompany.GameManager");
        if (n5HookReturn(_gm, "TrySpendMoney", () => n5NoSpendEnabled, true, 1))
          _hooks++;
        if (n5HookReturn(_gm, "TrySpendFishy", () => n5NoSpendEnabled, true, 1))
          _hooks++;
      } catch (_e) {
        console.error("[N5 GoodShit] GameManager hooks failed:", _e);
      }
      try {
        const _vend = acImage.class("AnimalCompany.ItemVendingMachineView");
        if (
          n5HookReturn(
            _vend,
            "get__isPurchaseLimited",
            () => n5VendingBypassEnabled,
            false,
            0,
          )
        )
          _hooks++;
        if (
          n5HookVoid(
            _vend,
            "HandleIsDeveloperChanged",
            () => n5VendingBypassEnabled,
            -1,
            function () {
              try {
                this.field("_devModeOn").value = true;
              } catch (_) {}
            },
          )
        )
          _hooks++;
        try {
          const _refresh = _vend.method("RefreshItems");
          _refresh.implementation = function () {
            if (n5VendingBypassEnabled)
              try {
                this.field("_devModeOn").value = true;
              } catch (_) {}
            return this.method("RefreshItems").invoke();
          };
          _hooks++;
        } catch (_) {}
      } catch (_e) {
        console.error("[N5 GoodShit] Vending hooks failed:", _e);
      }
      try {
        const _v3 = acImage.class("AnimalCompany.ItemVendingMachineV3Mediator");
        if (
          n5HookReturn(
            _v3,
            "IsPurchaseLimited",
            () => n5VendingBypassEnabled,
            false,
            1,
          )
        )
          _hooks++;
        if (
          n5HookVoid(
            _v3,
            "HandleDevModeChanged",
            () => n5VendingBypassEnabled,
            1,
            function () {
              try {
                this.field("_devModeEnabled").value = true;
              } catch (_) {}
            },
          )
        )
          _hooks++;
      } catch (_e) {
        console.error("[N5 GoodShit] V3 hooks failed:", _e);
      }
      try {
        const _cheat = acImage.class("AnimalCompany.CheatDetectorManager");
        for (const _m of [
          "HandleUserIsDeveloperChanged",
          "VerifyDeveloperStatusCmd",
          "OnUpdate",
        ])
          if (n5HookVoid(_cheat, _m, () => n5DevSpoofEnabled)) _hooks++;
      } catch (_e) {
        console.error("[N5 GoodShit] CheatDetector hooks failed:", _e);
      }
      n5GoodShitHooksInstalled = true;
      console.log("[N5 GoodShit] hooks installed:", _hooks);
      return true;
    }
    function n5BuildGoodShitCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "God Shop",
          isTogglable: true,
          toolTip:
            "forces item purchasable/researchable/unlocked and patches visible states",
          enableMethod: () => {
            n5ShopUnlockEnabled = true;
            n5InstallGoodShitHooks();
            n5ForceShopStates();
          },
          disableMethod: () => {
            n5ShopUnlockEnabled = false;
          },
          method: () => {
            n5ForceShopStates();
          },
        }),
        new MenuItem({
          buttonText: "Own All Cosmetics",
          isTogglable: true,
          toolTip: "forces avatar shop visible, owned, compatible, and free",
          enableMethod: () => {
            n5CosmeticOwnEnabled = true;
            n5ForceCosmeticStates();
          },
          disableMethod: () => {
            n5CosmeticOwnEnabled = false;
          },
          method: () => {
            n5ForceCosmeticStates();
          },
        }),
        new MenuItem({
          buttonText: "No Spend",
          isTogglable: true,
          toolTip: "GameManager.TrySpendMoney/TrySpendFishy always succeeds",
          enableMethod: () => {
            n5NoSpendEnabled = true;
            n5InstallGoodShitHooks();
          },
          disableMethod: () => {
            n5NoSpendEnabled = false;
          },
          method: () => {
            currentNotification =
              "No spend: " + (n5NoSpendEnabled ? "on" : "off");
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Vending Dev Bypass",
          isTogglable: true,
          toolTip:
            "dev-mode vending plus purchase-limit bypass for old and v3 machines",
          enableMethod: () => {
            n5VendingBypassEnabled = true;
            n5InstallGoodShitHooks();
            n5ForceShopStates();
          },
          disableMethod: () => {
            n5VendingBypassEnabled = false;
          },
          method: () => {
            n5ForceShopStates();
          },
        }),
        new MenuItem({
          buttonText: "Blueprint Abuse",
          isTogglable: true,
          toolTip:
            "allows saving/loadout/blueprint checks and bumps max blueprint count",
          enableMethod: () => {
            n5BlueprintAbuseEnabled = true;
            n5InstallGoodShitHooks();
          },
          disableMethod: () => {
            n5BlueprintAbuseEnabled = false;
          },
          method: () => {
            currentNotification =
              "Blueprint abuse: " + (n5BlueprintAbuseEnabled ? "on" : "off");
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Dev Spoof Stack",
          isTogglable: true,
          toolTip:
            "developer/user inventory/watch spoof plus cheat detector no-op",
          enableMethod: () => {
            n5DevSpoofEnabled = true;
            n5InstallGoodShitHooks();
            n5ForceDevSpoof();
          },
          disableMethod: () => {
            n5DevSpoofEnabled = false;
          },
          method: () => {
            n5ForceDevSpoof();
          },
        }),
        new MenuItem({
          buttonText: "Patch Everything",
          isTogglable: false,
          toolTip:
            "one-shot state patch for shop, cosmetics, vending, and dev spoof",
          method: () => {
            n5InstallGoodShitHooks();
            n5ForceShopStates();
            n5ForceCosmeticStates();
            n5ForceDevSpoof();
          },
        }),
      ];
    }
    function n5LaunchSelectedProjectile() {
      if (!rightGrab || !rightTrigger || time < n5OrbitFuckeryShootDelay)
        return;
      n5OrbitFuckeryShootDelay = time;
      try {
        const _pose = n5RightHandPose(0.35),
          _name =
            n5ProjectilePrefabs[n5ProjectileIndex % n5ProjectilePrefabs.length];
        const _obj = spawnNetworkPrefab(_name, _pose.pos, _pose.rot);
        if (_obj) n5LaunchItemObject(_obj, _pose.forward, 35);
      } catch (_e) {
        console.error("[N5 ProjectileLauncher]", _e);
      }
    }
    function n5FlarePrefabFallback() {
      if (
        !n5FlarePrefabImpactEnabled ||
        !rightTrigger ||
        time < n5FlarePrefabDelay
      )
        return;
      n5FlarePrefabDelay = time + 0.75;
      try {
        const _g = getGunPointerResult(),
          _p = _g.point;
        if (_p)
          spawnNetworkPrefab(prefabList[prefabIndex], _p, identityRotation);
      } catch (_e) {
        console.error("[N5 FlarePrefabFallback]", _e);
      }
    }
    function n5ArenaOreBurst() {
      try {
        const _cls = acImage.class("AnimalCompany.ArenaOreSpawner");
        const _sp = UnityObjectCls.method("FindObjectOfType", 0)
          .inflate(_cls)
          .invoke();
        if (_sp && !_sp.handle.isNull()) {
          try {
            _sp.method("InitGame").invoke();
          } catch (_) {}
          try {
            _sp.method("SpawnGold").invoke(50);
          } catch (_) {}
          try {
            _sp.method("SpawnEmerald").invoke(50);
          } catch (_) {}
          currentNotification = "Arena ores spawned";
          notifactionResetTime = time + 2;
          return true;
        }
      } catch (_e) {
        console.error("[N5 Arena OreSpawner]", _e);
      }
      try {
        const _pose = n5RightHandPose(1.0),
          _ores = [
            "item_ore_gold_l",
            "item_ore_gold_m",
            "item_ore_gold_s",
            "item_ore_hell",
            "item_ruby",
            "item_uranium_chunk_l",
          ];
        for (let _i = 0; _i < 24; _i++) {
          const _a = (Math.PI * 2 * _i) / 24,
            _r = 0.65 + Math.random() * 0.5;
          n5SpawnConfiguredItemAt(
            _ores[_i % _ores.length],
            [
              (_pose.pos[0] || 0) + Math.cos(_a) * _r,
              (_pose.pos[1] || 0) + Math.random() * 0.45,
              (_pose.pos[2] || 0) + Math.sin(_a) * _r,
            ],
            identityRotation,
          );
        }
        currentNotification = "Fallback arena ores spawned";
        notifactionResetTime = time + 2;
        return true;
      } catch (_e2) {
        currentNotification = "Arena ores failed";
        notifactionResetTime = time + 2;
        return false;
      }
    }
    function n5ArenaItemBurst(_atGun = false) {
      try {
        const _g = _atGun ? getGunPointerResult() : null;
        const _base = _g && _g.point ? _g.point : n5RightHandPose(1.0).pos;
        const _ids = [
          "item_arena_pistol",
          "item_arena_shotgun",
          "item_shotgun_ammo",
          "item_revolver_ammo",
          "item_ore_gold_l",
          "item_ore_gold_m",
          "item_ore_gold_s",
          "item_ore_hell",
          "item_ruby",
          "item_randombox_mobloot_weapons",
          "item_randombox_mobloot_weapons_big",
        ];
        let _spawned = 0;
        for (let _i = 0; _i < 36; _i++) {
          const _a = (Math.PI * 2 * _i) / 36,
            _r = 0.35 + (_i % 6) * 0.11;
          const _p = [
            (_base[0] || 0) + Math.cos(_a) * _r,
            (_base[1] || 0) + 0.04 * _i,
            (_base[2] || 0) + Math.sin(_a) * _r,
          ];
          if (
            n5SpawnConfiguredItemAt(
              _ids[_i % _ids.length],
              _p,
              identityRotation,
            )
          )
            _spawned++;
        }
        currentNotification = "Arena items: " + _spawned;
        notifactionResetTime = time + 2;
        return _spawned > 0;
      } catch (_e) {
        console.error("[N5 ArenaItemBurst]", _e);
        currentNotification = "Arena item burst failed";
        notifactionResetTime = time + 2;
        return false;
      }
    }
    function n5SpamArenaStuff() {
      if (time < n5ArenaSpamDelay) return;
      n5ArenaSpamDelay = time + 0.25;
      const _pose = n5RightHandPose(1.2);
      const _things = [
        "Arena",
        "ArenaDefault",
        "ArenaGame",
        "ArenaGamemanager",
        "ArenaMap",
        "ItemSellingMachineController",
        "item_randombox_base",
      ];
      const _name = _things[Math.floor(Math.random() * _things.length)];
      if (String(_name).startsWith("item_"))
        n5SpawnItemAt(_name, _pose.pos, identityRotation);
      else spawnNetworkPrefab(_name, _pose.pos, identityRotation);
    }
    function n5LocalPlayerPos() {
      try {
        const _safe = n5GetSafeSelfPosition();
        if (n5IsGoodPosition(_safe)) return _safe;
      } catch (_) {}
      try {
        const _lp = NetPlayerCls.method("get_localPlayer").invoke();
        if (_lp && (!_lp.handle || !_lp.handle.isNull()))
          return getTransform(_lp).method("get_position").invoke();
      } catch (_) {}
      try {
        return getTransform(headCollider).method("get_position").invoke();
      } catch (_) {}
      return rightHandTransform.method("get_position").invoke();
    }
    function n5SpawnRigDupeAt(_pos, _count = 1) {
      let _spawned = 0;
      try {
        for (let _i = 0; _i < _count; _i++) {
          const _a = Math.PI * 2 * (_i / Math.max(1, _count)),
            _r = _count > 1 ? 0.45 + 0.12 * _i : 0;
          const _p = [
            (_pos[0] || 0) + Math.cos(_a) * _r,
            (_pos[1] || 0) + 0.05,
            (_pos[2] || 0) + Math.sin(_a) * _r,
          ];
          const _o =
            spawnNetworkPrefab("NetPlayer", _p, identityRotation) ||
            spawnNetworkPrefab("NetSpectator", _p, identityRotation);
          if (_o) _spawned++;
        }
      } catch (_e) {
        console.error("[N5 RigDupe]", _e);
      }
      currentNotification = "Rig dupe: " + _spawned + "/" + _count;
      notifactionResetTime = time + 2;
      return _spawned > 0;
    }
    function n5RigDupeMe(_count = 1) {
      if (time < n5RigDupeDelay) {
        currentNotification = "Rig dupe cooldown";
        notifactionResetTime = time + 1;
        return false;
      }
      n5RigDupeDelay = time + 0.35;
      return n5SpawnRigDupeAt(n5LocalPlayerPos(), _count);
    }
    function n5RigDupeGun() {
      if (!rightGrab || !rightTrigger || time < n5RigDupeDelay) return;
      n5RigDupeDelay = time + 0.2;
      const _g = getGunPointerResult(),
        _p = _g.point || n5LocalPlayerPos();
      n5SpawnRigDupeAt(_p, 1);
    }
    function n5RigSpam() {
      if (time < n5RigSpamDelay) return;
      n5RigSpamDelay = time + 0.12;
      const _p = n5LocalPlayerPos();
      const _o = [
        (_p[0] || 0) + (Math.random() - 0.5) * 2.5,
        (_p[1] || 0) + Math.random() * 1.5,
        (_p[2] || 0) + (Math.random() - 0.5) * 2.5,
      ];
      n5SpawnRigDupeAt(_o, 1);
    }
    function n5RunRigSpasm() {
      if (!n5RigSpasmEnabled) return;
      try {
        if (!n5RigSpasmBase) {
          n5RigSpasmBase = {
            rh: rightHandTransform.method("get_position").invoke(),
            lh: leftHandTransform.method("get_position").invoke(),
            head: getTransform(headCollider).method("get_position").invoke(),
          };
        }
        const _j = 0.18 + Math.random() * 0.2;
        const _rnd = () => [
          (Math.random() - 0.5) * _j,
          (Math.random() - 0.5) * _j,
          (Math.random() - 0.5) * _j,
        ];
        const _add = (_a, _b) => [
          (_a[0] || 0) + (_b[0] || 0),
          (_a[1] || 0) + (_b[1] || 0),
          (_a[2] || 0) + (_b[2] || 0),
        ];
        rightHandTransform
          .method("set_position")
          .invoke(_add(n5RigSpasmBase.rh, _rnd()));
        leftHandTransform
          .method("set_position")
          .invoke(_add(n5RigSpasmBase.lh, _rnd()));
        getTransform(headCollider)
          .method("set_position")
          .invoke(_add(n5RigSpasmBase.head, _rnd()));
        const _s = 0.7 + Math.random() * 1.6;
        rightHandTransform
          .method("set_localScale")
          .invoke([_s, 2.0 - _s, 0.6 + Math.random()]);
        leftHandTransform
          .method("set_localScale")
          .invoke([2.0 - _s, _s, 0.6 + Math.random()]);
      } catch (_e) {
        console.error("[N5 RigSpasm]", _e);
      }
    }
    function n5StopRigSpasm() {
      try {
        rightHandTransform.method("set_localScale").invoke([1, 1, 1]);
        leftHandTransform.method("set_localScale").invoke([1, 1, 1]);
        if (n5RigSpasmBase) {
          try {
            rightHandTransform.method("set_position").invoke(n5RigSpasmBase.rh);
          } catch (_) {}
          try {
            leftHandTransform.method("set_position").invoke(n5RigSpasmBase.lh);
          } catch (_) {}
          try {
            getTransform(headCollider)
              .method("set_position")
              .invoke(n5RigSpasmBase.head);
          } catch (_) {}
        }
      } catch (_) {}
      n5RigSpasmBase = null;
    }
    function n5FindAllClass(_className) {
      try {
        const _cls = acImage.class(_className);
        const _arr = UnityObjectCls.method("FindObjectsOfType", 0)
          .inflate(_cls)
          .invoke();
        const _out = [];
        let _len = 0;
        try {
          if (_arr && typeof _arr.length === "number") _len = _arr.length;
        } catch (_) {}
        try {
          if (!_len && _arr && _arr.method)
            _len = _arr.method("get_Length").invoke();
        } catch (_) {}
        for (let _i = 0; _i < _len; _i++) {
          try {
            let _o = null;
            try {
              _o = _arr.get ? _arr.get(_i) : null;
            } catch (_e) {}
            try {
              if (!_o && _arr.method) _o = _arr.method("GetValue").invoke(_i);
            } catch (_e) {}
            if (!_o) _o = _arr[_i];
            if (_o && (!_o.handle || !_o.handle.isNull())) _out.push(_o);
          } catch (_) {}
        }
        return _out;
      } catch (_) {
        return [];
      }
    }
    function n5KillOneMob(_mob) {
      if (!_mob || (_mob.handle && _mob.handle.isNull())) return false;
      let _ok = false;
      const _pos = (() => {
        try {
          return _mob
            .method("get_transform")
            .invoke()
            .method("get_position")
            .invoke();
        } catch (_) {
          return n5LocalPlayerPos();
        }
      })();
      try {
        const _src = acImage
          .class("AnimalCompany.DamageSourceInfo")
          .method("get_LocalPlayer")
          .invoke();
        const _target = acImage
          .class("AnimalCompany.DamageTargetInfo")
          .method("get_Default")
          .invoke();
        _mob
          .method("Hit", 6)
          .invoke(2147483647, 2, _pos, [0, 99999, 0], _src, _target);
        _ok = true;
      } catch (_) {}
      if (!_ok) {
        try {
          _mob
            .method("Hit", 6)
            .invoke(2147483647, 2, _pos, [0, 99999, 0], null, null);
          _ok = true;
        } catch (_) {}
      }
      try {
        _mob.method("set_n_health").invoke(0);
        _ok = true;
      } catch (_) {}
      try {
        _mob.field("_n_health").value = 0;
        _ok = true;
      } catch (_) {}
      try {
        _mob.method("set_n_isDie").invoke(true);
        _ok = true;
      } catch (_) {}
      try {
        _mob.field("_n_isDie").value = true;
        _ok = true;
      } catch (_) {}
      try {
        _mob.method("set_n_status").invoke(8);
        _ok = true;
      } catch (_) {}
      for (const _km of [
        "RPC_Hit",
        "Die",
        "Kill",
        "RPC_Die",
        "RPC_Kill",
        "Death",
        "OnDeath",
        "KillMob",
        "DieInstantly",
      ]) {
        try {
          _mob.method(_km).invoke(2147483647);
          _ok = true;
          break;
        } catch (_) {}
        try {
          _mob.method(_km).invoke();
          _ok = true;
          break;
        } catch (_) {}
      }
      if (!_ok) {
        try {
          _mob.method("RPC_AddForce", 3).invoke([0, 99999, 0]);
          _ok = true;
        } catch (_) {}
      }
      if (!_ok) {
        try {
          UnityObjectCls.method("Destroy", 1).invoke(
            _mob.method("get_gameObject").invoke(),
          );
          _ok = true;
        } catch (_) {}
      }
      return _ok;
    }
    function n5KillAllMobsNow() {
      let _count = 0;
      try {
        for (const _horde of n5FindAllClass(
          "AnimalCompany.HordeMobController",
        )) {
          try {
            _horde.method("KillAllMobs", 1).invoke(true);
            _count++;
            continue;
          } catch (_) {}
          try {
            _horde.method("RPC_Reset").invoke();
            _count++;
            continue;
          } catch (_) {}
          try {
            _horde.method("Reset").invoke();
            _count++;
          } catch (_) {}
        }
      } catch (_e) {
        console.error("[N5 KillAllMobs horde]", _e);
      }
      try {
        const _mobs = n5FindAllClass("AnimalCompany.MobController");
        for (const _mob of _mobs) {
          try {
            if (n5KillOneMob(_mob)) _count++;
          } catch (_e) {
            console.error("[N5 KillOneMob]", _e);
          }
        }
      } catch (_e) {
        console.error("[N5 KillAllMobs base]", _e);
      }
      return _count;
    }
    function n5CallMethodsOnAll(_className, _methods, ..._args) {
      let _count = 0;
      if (typeof _methods === "string") _methods = [_methods];
      for (const _o of n5FindAllClass(_className)) {
        for (const _m of _methods) {
          try {
            _o.method(_m).invoke(..._args);
            _count++;
            break;
          } catch (_) {}
        }
      }
      return _count;
    }
    function n5SetFieldsOnAll(_className, _fields) {
      let _count = 0;
      for (const _o of n5FindAllClass(_className)) {
        let _did = false;
        for (const _k of Object.keys(_fields)) {
          try {
            _o.field(_k).value = _fields[_k];
            _did = true;
          } catch (_) {}
          try {
            _o.method("set_" + _k).invoke(_fields[_k]);
            _did = true;
          } catch (_) {}
        }
        if (_did) _count++;
      }
      return _count;
    }
    function n5PlayNightAlarmSound() {
      let _count = 0;
      for (const _watch of n5FindAllClass("AnimalCompany.PlayerWatch")) {
        try {
          _watch.method("RPC_PlayNightAlarm").invoke();
          _count++;
          continue;
        } catch (_) {}
        try {
          _watch.method("PlayNightAlarm").invoke();
          _count++;
        } catch (_) {}
      }
      for (const _cls of [
        "AnimalCompany.NetPlayer",
        "AnimalCompany.GameTimeManager",
      ]) {
        for (const _o of n5FindAllClass(_cls)) {
          try {
            _o.method("PlayNightAlarm").invoke();
            _count++;
          } catch (_) {}
        }
      }
      try {
        const _gtm = acImage.class("AnimalCompany.GameTimeManager");
        let _inst = null;
        try {
          _inst = _gtm.field("_instance").value;
        } catch (_) {}
        if (_inst && (!_inst.handle || !_inst.handle.isNull())) {
          try {
            _inst.method("PlayNightAlarm").invoke();
            _count++;
          } catch (_) {}
        }
      } catch (_) {}
      if (!_count) {
        try {
          if (n5PlayServerAudioAt(422, n5LocalPlayerPos())) _count++;
        } catch (_) {}
      }
      currentNotification = "Night alarm calls: " + _count;
      notifactionResetTime = time + 2;
      return _count;
    }
    function n5ToggleAllBoomboxes() {
      let _count = 0;
      for (const _bb of n5FindAllClass("AnimalCompany.Boombox")) {
        try {
          _bb.method("RPC_ToggleOnOff").invoke();
          _count++;
          continue;
        } catch (_) {}
        try {
          _bb.method("set_isOn").invoke(!_bb.method("get_isOn").invoke());
          _count++;
        } catch (_) {}
      }
      currentNotification = "Boombox toggles: " + _count;
      notifactionResetTime = time + 2;
      return _count;
    }
    function n5PopAllBalloons() {
      let _count = 0;
      for (const _b of n5FindAllClass("AnimalCompany.Balloon")) {
        try {
          _b.method("Pop").invoke();
          _count++;
          continue;
        } catch (_) {}
        try {
          _b.method("RPC_Pop").invoke();
          _count++;
          continue;
        } catch (_) {}
        try {
          _b.method("PopInternal").invoke();
          _count++;
        } catch (_) {}
      }
      for (const _bp of n5FindAllClass("AnimalCompany.BalloonPopable")) {
        try {
          _bp
            .method("Hit")
            .invoke(999, 0, n5LocalPlayerPos(), [0, 0, 0], null, null);
          _count++;
          continue;
        } catch (_) {}
        try {
          const _balloon = _bp.method("get_balloon").invoke();
          if (_balloon && (!_balloon.handle || !_balloon.handle.isNull())) {
            _balloon.method("Pop").invoke();
            _count++;
          }
        } catch (_) {}
      }
      currentNotification = "Balloons popped: " + _count;
      notifactionResetTime = time + 2;
      return _count;
    }
    function n5SpawnPrefabNameAtHand(_name, _dist = 1.0) {
      try {
        const _p = n5RightHandPose(_dist);
        return spawnNetworkPrefab(_name, _p.pos, _p.rot || identityRotation);
      } catch (_) {
        return null;
      }
    }
    function n5ActivateBuff(_id = n5BuffId) {
      try {
        const _cls = acImage.class("AnimalCompany.PlayerBuffController");
        let _inst = null;
        try {
          _inst = _cls.field("_instance").value;
        } catch (_) {}
        if (!_inst || (_inst.handle && _inst.handle.isNull())) {
          try {
            _inst = UnityObjectCls.method("FindObjectOfType", 0)
              .inflate(_cls)
              .invoke();
          } catch (_) {}
        }
        if (!_inst || (_inst.handle && _inst.handle.isNull())) return false;
        _inst.method("ActivateBuff", 1).invoke(_id | 0);
        currentNotification = "Buff ID: " + (_id | 0);
        notifactionResetTime = time + 2;
        return true;
      } catch (_e) {
        console.error("[N5 Buff]", _e);
        currentNotification = "buff failed";
        notifactionResetTime = time + 2;
        return false;
      }
    }
    function n5ClearBuffs() {
      try {
        acImage
          .class("AnimalCompany.PlayerBuffController")
          .method("DeactivateAllBuffs")
          .invoke();
        currentNotification = "Buffs cleared";
        notifactionResetTime = time + 2;
        return true;
      } catch (_e) {
        console.error("[N5 ClearBuffs]", _e);
        return false;
      }
    }
    function n5RunBuffSpam() {
      if (!n5BuffSpam || time < n5BuffSpamDelay) return;
      n5BuffSpamDelay = time + 0.25;
      n5ActivateBuff(n5BuffId);
    }
    function n5ActivateBuffSilent(_id) {
      try {
        const _cls = acImage.class("AnimalCompany.PlayerBuffController");
        let _inst = null;
        try {
          _inst = _cls.field("_instance").value;
        } catch (_) {}
        if (!_inst || (_inst.handle && _inst.handle.isNull())) {
          try {
            _inst = UnityObjectCls.method("FindObjectOfType", 0)
              .inflate(_cls)
              .invoke();
          } catch (_) {}
        }
        if (!_inst || (_inst.handle && _inst.handle.isNull())) return false;
        _inst.method("ActivateBuff", 1).invoke(_id | 0);
        return true;
      } catch (_) {
        return false;
      }
    }
    function n5RunInfFart() {
      if (!n5InfFartEnabled || time < n5InfFartDelay) return;
      n5InfFartDelay = time + 0.06;
      const _did = n5ActivateBuffSilent(11) | n5ActivateBuffSilent(12);
      try {
        const _p = n5LocalPlayerPos();
        n5PlayVFXAt(
          VFXTypes.MidAirJump_Fart || VFXTypes.Asset_FartTag,
          _p,
          identityRotation,
        );
      } catch (_) {}
      if (_did && frameCount % 60 === 0) {
        currentNotification = "Inf Fart ON";
        notifactionResetTime = time + 1;
      }
    }
    function n5RunInfiniteJetpack() {
      if (!n5InfiniteJetpackEnabled || time < n5InfiniteJetpackDelay) return;
      n5InfiniteJetpackDelay = time + 0.03;
      let _count = 0;
      for (const _jp of n5FindAllClass("AnimalCompany.JetpackHandy")) {
        try {
          _jp.field("_isUsed").value = false;
        } catch (_) {}
        try {
          _jp.method("RPC_UseJetpack").invoke();
          _count++;
        } catch (_) {}
        try {
          _jp.method("RPC_PlayJetpackAnimation").invoke();
        } catch (_) {}
      }
      if (_count && frameCount % 90 === 0) {
        currentNotification = "Infinite Jetpack x" + _count;
        notifactionResetTime = time + 1;
      }
    }
    function n5ActivateAllTimebombs(_notify = true) {
      if (time < n5TimebombSpamDelay && !_notify) return 0;
      n5TimebombSpamDelay = time + 0.06;
      let _count = 0;
      for (const _tb of n5FindAllClass("AnimalCompany.TimeBomb")) {
        try {
          _tb.method("SetBomb").invoke(0);
        } catch (_) {}
        try {
          _tb.method("Explode").invoke();
          _count++;
          continue;
        } catch (_) {}
        try {
          _tb.method("RPC_Explode").invoke();
          _count++;
          continue;
        } catch (_) {}
        try {
          _tb.method("ExplodeInternal").invoke();
          _count++;
        } catch (_) {}
      }
      for (const _ex of n5FindAllClass("AnimalCompany.HandExplosive")) {
        try {
          _ex.field("_isExploded").value = false;
        } catch (_) {}
        try {
          _ex.method("Activate").invoke(true);
          _count++;
          continue;
        } catch (_) {}
        try {
          _ex.method("ForceExplode").invoke();
          _count++;
          continue;
        } catch (_) {}
        try {
          _ex.method("RPC_Explode").invoke();
          _count++;
        } catch (_) {}
      }
      if (_notify) {
        currentNotification = "Activated timebombs: " + _count;
        notifactionResetTime = time + 2;
      }
      return _count;
    }
    function n5StartAllTimebombTimers(_seconds = 3) {
      let _count = 0;
      let _tickTimerClass = null;
      try {
        _tickTimerClass = Il2Cpp.domain
          .assembly("Fusion.Runtime")
          .image.class("Fusion.TickTimer");
      } catch (_) {}
      for (const _tb of n5FindAllClass("AnimalCompany.TimeBomb")) {
        let _did = false;
        try {
          _tb.field("_isTimeoutSoundPlayed").value = false;
        } catch (_) {}
        try {
          _tb.method("SetBomb").invoke(_seconds | 0);
          _did = true;
        } catch (_) {}
        try {
          const _routine = _tb
            .method("StartTimerCoroutine")
            .invoke(_seconds | 0);
          try {
            _tb.method("StartCoroutine", 1).invoke(_routine);
            _did = true;
          } catch (_) {}
          try {
            _tb.method("StartCoroutine").invoke(_routine);
            _did = true;
          } catch (_) {}
        } catch (_) {}
        if (_tickTimerClass) {
          try {
            let _runner = null;
            try {
              _runner = _tb.method("get_Runner").invoke();
            } catch (_) {}
            if (_runner && (!_runner.handle || !_runner.handle.isNull())) {
              const _timer = _tickTimerClass
                .method("CreateFromSeconds", 2)
                .invoke(_runner, +_seconds);
              try {
                _tb.method("set__timerExplode").invoke(_timer);
                _did = true;
              } catch (_) {}
              try {
                _tb.field("__timerExplode").value = _timer;
                _did = true;
              } catch (_) {}
            }
          } catch (_) {}
        }
        try {
          _tb.method("HandleTimerChanged").invoke();
          _did = true;
        } catch (_) {}
        try {
          _tb.method("FixedUpdateNetwork").invoke();
        } catch (_) {}
        try {
          _tb.method("RPC_PlayTimeoutSound").invoke();
        } catch (_) {}
        if (_did) _count++;
      }
      for (const _ex of n5FindAllClass("AnimalCompany.HandExplosive")) {
        try {
          _ex.field("_isExploded").value = false;
        } catch (_) {}
        try {
          _ex.method("Activate").invoke(false);
          _count++;
          continue;
        } catch (_) {}
        try {
          _ex.method("RPC_Use").invoke(false, false);
          _count++;
        } catch (_) {}
      }
      currentNotification = "Timebomb countdowns: " + _count;
      notifactionResetTime = time + 2;
      return _count;
    }
    function n5DoorOpenAll() {
      const _c = n5CallMethodsOnAll(
        "AnimalCompany.AreaDoorsNetObject",
        "OpenAllDoors",
      );
      currentNotification = "Door open calls: " + _c;
      notifactionResetTime = time + 2;
    }
    function n5DoorCloseAll() {
      const _c = n5CallMethodsOnAll(
        "AnimalCompany.AreaDoorsNetObject",
        "CloseAllDoors",
      );
      currentNotification = "Door close calls: " + _c;
      notifactionResetTime = time + 2;
    }
    function n5ThunderStrike() {
      let _c = 0;
      for (const _o of n5FindAllClass("AnimalCompany.ThunderController")) {
        try {
          _o.method("Strike").invoke();
          _c++;
          continue;
        } catch (_) {}
        try {
          _o.method("RPC_Strike").invoke(7, Math.floor(Math.random() * 255));
          _c++;
        } catch (_) {}
      }
      if (!_c)
        spawnNetworkPrefab(
          "ThunderController",
          n5RightHandPose(1.4).pos,
          identityRotation,
        );
      currentNotification = "Thunder: " + (_c || "spawned");
      notifactionResetTime = time + 2;
    }
    function n5DuplicationMachineMax() {
      let _c = n5SetFieldsOnAll("AnimalCompany.DuplicationMachine", {
        _duckValue: 999.0,
        _chaosValue: 999.0,
        machineInProgress: false,
      });
      for (const _o of n5FindAllClass("AnimalCompany.DuplicationMachine")) {
        try {
          _o.method("RPC_KeycardEnter").invoke();
        } catch (_) {}
        try {
          _o.field("_storedEquipmentID").value = Il2Cpp.string(
            itemIDs[itemIndex] || "item_goldbar",
          );
        } catch (_) {}
      }
      currentNotification = "Dupe machines juiced: " + _c;
      notifactionResetTime = time + 2;
    }
    function n5SellingMachines() {
      const _out = n5FindAllClass("AnimalCompany.ItemSellingMachineController");
      try {
        const _inst = acImage
          .class("AnimalCompany.ItemSellingMachineController")
          .method("get_instance")
          .invoke();
        if (_inst && (!_inst.handle || !_inst.handle.isNull()))
          _out.push(_inst);
      } catch (_) {}
      const _dedup = [],
        _seen = new Set();
      for (const _o of _out) {
        let _k = "";
        try {
          _k = String(_o.handle || _o);
        } catch (_) {
          _k = String(_o);
        }
        if (!_seen.has(_k)) {
          _seen.add(_k);
          _dedup.push(_o);
        }
      }
      return _dedup;
    }
    function n5SpawnSellingMachine() {
      const _obj =
        n5SpawnPrefabNameAtHand("ItemSellingMachineController", 1.2) ||
        n5SpawnPrefabNameAtHand("item_selling_machine", 1.2);
      if (_obj) {
        try {
          _obj.method("Spawned").invoke();
        } catch (_) {}
        try {
          _obj.method("Setup").invoke();
        } catch (_) {}
      }
      currentNotification = _obj ? "Selling machine spawned" : "Selling failed";
      notifactionResetTime = time + 2;
      return _obj;
    }
    function n5SellingMachineCall(_mode = "button") {
      let _c = 0;
      for (const _m of n5SellingMachines()) {
        try {
          _m.field("_isSellingInProgress").value = false;
        } catch (_) {}
        try {
          _m.field("_isOverheated").value = false;
        } catch (_) {}
        try {
          _m.field("_isExploded").value = false;
        } catch (_) {}
        try {
          _m.field("_heatMeter").value = 0.0;
        } catch (_) {}
        try {
          _m.field("_itemSoldValue").value = 999999;
        } catch (_) {}
        if (_mode === "explode") {
          try {
            _m.method("RPC_ExplodeMachine").invoke();
            _c++;
            continue;
          } catch (_) {}
        }
        if (_mode === "recover") {
          try {
            _m.method("RPC_RecoverExplosion").invoke();
            _c++;
            continue;
          } catch (_) {}
        }
        if (_mode === "sell") {
          try {
            _m.method("RPC_StartItemSelling").invoke(0.01);
            _c++;
            continue;
          } catch (_) {}
        }
        for (let _i = 0; _i < 11; _i++) {
          try {
            _m.method("ButtonPressed").invoke(_i);
            _c++;
          } catch (_) {}
          try {
            _m.method("RPC_ButtonPressed").invoke(_i);
            _c++;
          } catch (_) {}
        }
      }
      currentNotification = "Selling " + _mode + ": " + _c;
      notifactionResetTime = time + 2;
      return _c;
    }
    function n5RunSellAmountSpam(_notify = false) {
      if (!n5SellAmountSpam && !_notify) return;
      if (!_notify && time < n5MachineSpamDelay) return;
      n5MachineSpamDelay = time + 0.1;
      const _max = 2147483647;
      let _c = 0;
      for (const _m of n5SellingMachines()) {
        try {
          _m.field("_isSellingInProgress").value = false;
        } catch (_) {}
        try {
          _m.field("_isOverheated").value = false;
        } catch (_) {}
        try {
          _m.field("_isExploded").value = false;
        } catch (_) {}
        try {
          _m.field("_heatMeter").value = 0.0;
        } catch (_) {}
        try {
          _m.field("_itemSoldValue").value = _max;
          _c++;
        } catch (_) {}
        try {
          _m.method("set_itemSoldValue").invoke(_max);
          _c++;
        } catch (_) {}
        try {
          _m.method("RPC_StartItemSelling").invoke(0.01);
          _c++;
        } catch (_) {}
        for (const _amt of [
          2000000000, 2000000000, 2000000000, 2000000000, 1999999999,
        ]) {
          try {
            _m.method("RPC_AddPlayerMoneyToAll").invoke(_amt, null);
            _c++;
          } catch (_) {}
          try {
            _m.method("RPC_AddPlayerMoneyToAll").invoke(_amt);
            _c++;
          } catch (_) {}
        }
      }
      if (_notify || (_c && frameCount % 60 === 0)) {
        currentNotification = "Sell amount spam: 9999999999";
        notifactionResetTime = time + 2;
      }
      return _c;
    }
    function n5RunSellingSpasm() {
      if (!n5SellingSpasm || time < n5MachineSpamDelay) return;
      n5MachineSpamDelay = time + 0.12;
      n5SellingMachineCall("button");
      n5SellingMachineCall("sell");
    }
    function n5FlushToilets(_spawnFallback = true) {
      let _c = 0;
      for (const _t of n5FindAllClass("AnimalCompany.ToiletPullChain")) {
        try {
          _t.method("FlushToilet").invoke();
          _c++;
          continue;
        } catch (_) {}
        try {
          _t.method("PopRandomItem").invoke();
          _c++;
          continue;
        } catch (_) {}
        try {
          _t.method("SpawnItem").invoke();
          _c++;
        } catch (_) {}
      }
      if (!_c && _spawnFallback) {
        const _p = n5RightHandPose(0.8);
        for (const _id of [
          "item_toilet_paper",
          "item_toilet_paper_mega",
          "item_toilet_paper_roll_empty",
          "item_plunger",
        ]) {
          try {
            if (n5SpawnConfiguredItemAt(_id, _p.pos, _p.rot)) _c++;
          } catch (_) {}
        }
        try {
          spawnNetworkPrefab(
            "ToiletPullChain",
            _p.pos,
            _p.rot || identityRotation,
          );
        } catch (_) {}
      }
      currentNotification = "Toilet flush: " + _c;
      notifactionResetTime = time + 2;
      return _c;
    }
    function n5RunToiletSpam() {
      if (!n5ToiletSpam || time < n5MachineSpamDelay) return;
      n5MachineSpamDelay = time + 0.2;
      n5FlushToilets(false);
    }
    function n5ToiletPaperBurst() {
      try {
        const _p = n5RightHandPose(0.8),
          _ids = [
            "item_toilet_paper",
            "item_toilet_paper_mega",
            "item_toilet_paper_roll_empty",
            "item_plunger",
          ];
        let _c = 0;
        for (let _i = 0; _i < 24; _i++) {
          const _a = (Math.PI * 2 * _i) / 24,
            _pos = [
              (_p.pos[0] || 0) + Math.cos(_a) * 0.8,
              (_p.pos[1] || 0) + 0.04 * _i,
              (_p.pos[2] || 0) + Math.sin(_a) * 0.8,
            ];
          if (
            n5SpawnConfiguredItemAt(
              _ids[_i % _ids.length],
              _pos,
              identityRotation,
            )
          )
            _c++;
        }
        currentNotification = "Toilet burst: " + _c;
        notifactionResetTime = time + 2;
      } catch (_e) {
        console.error("[N5 ToiletBurst]", _e);
      }
    }
    function n5ActivateTeleporters() {
      const _c = n5CallMethodsOnAll("AnimalCompany.TeleportationMachine", [
        "RPC_RequestActivation",
        "RPC_PlayChargingParticles",
        "MasterTeleport",
        "RPC_Teleport",
      ]);
      currentNotification = "Teleporter calls: " + _c;
      notifactionResetTime = time + 2;
    }
    function n5CoreTeleporterHot() {
      const _c = n5SetFieldsOnAll("AnimalCompany.CoreTeleporter", {
        _requiredLaserCount: 0,
        _requiredHoldDuration: 0.0,
        _activeDuration: 999.0,
        _rearmDelay: 0.0,
        _pullForce: 999.0,
        _blackHoleMaxScale: 8.0,
      });
      currentNotification = "Core teleporters hot: " + _c;
      notifactionResetTime = time + 2;
    }
    function n5MomSupplyBurst() {
      let _c = 0;
      try {
        const _m = n5MomBoss();
        if (_m) {
          let _sp = null;
          try {
            _sp = _m.method("get_itemSpawner").invoke();
          } catch (_) {}
          if (_sp && (!_sp.handle || !_sp.handle.isNull())) {
            try {
              _sp.method("SpawnSupplyItems").invoke();
              _c++;
            } catch (_) {}
            try {
              _sp
                .method("SpawnItems")
                .invoke(
                  [
                    "item_arena_pistol",
                    "item_shotgun_ammo",
                    "item_company_ration_heal",
                  ],
                  5,
                  5.0,
                );
              _c++;
            } catch (_) {}
          }
        }
      } catch (_e) {
        console.error("[N5 MomSupply]", _e);
      }
      if (!_c) {
        const _p = n5RightHandPose(1.1);
        for (const _id of [
          "item_arena_pistol",
          "item_shotgun_ammo",
          "item_company_ration_heal",
          "item_rpg_ammo",
        ])
          for (let _i = 0; _i < 4; _i++)
            n5SpawnItemAt(
              _id,
              [
                (_p.pos[0] || 0) + (Math.random() - 0.5) * 1.5,
                (_p.pos[1] || 0) + Math.random(),
                (_p.pos[2] || 0) + (Math.random() - 0.5) * 1.5,
              ],
              identityRotation,
            );
      }
      currentNotification = "Mom supplies: " + (_c || "fallback");
      notifactionResetTime = time + 2;
    }
    function n5HordeControl(_active = true) {
      let _c = n5SetFieldsOnAll("AnimalCompany.HordeMobController", {
        _n_isActive: _active,
        _n_mobCountToSpawn: _active ? 64 : 0,
        _ignoreLootDrop: false,
      });
      _c += n5SetFieldsOnAll("AnimalCompany.HordeMobSpawner", {
        _enableTest: _active,
        _testAutoWave: _active,
        _autoKillFromThisPlayer: !_active,
      });
      currentNotification = "Horde " + (_active ? "on" : "off") + ": " + _c;
      notifactionResetTime = time + 2;
    }
    function n5RunShotgunNoCooldown() {
      if (!n5ShotgunNoCooldown) return;
      try {
        const _cls = acImage.class("AnimalCompany.Shotgun");
        const _arr = UnityObjectCls.method("FindObjectsOfType", 0)
          .inflate(_cls)
          .invoke();
        const _len = _arr && typeof _arr.length === "number" ? _arr.length : 0;
        for (let _i = 0; _i < _len; _i++) {
          const _sg = _arr.get ? _arr.get(_i) : _arr[_i];
          if (!_sg || (_sg.handle && _sg.handle.isNull())) continue;
          try {
            _sg.field("_reloadTimer").value = 0;
          } catch (_) {}
          try {
            _sg.method("set__ammoLeft").invoke(99);
          } catch (_) {}
          try {
            _sg.field("__ammoLeft").value = 99;
          } catch (_) {}
          try {
            const _gun = _sg.field("_gun").value;
            if (_gun && !_gun.handle.isNull()) {
              try {
                const _cfg = _gun.method("get_config").invoke();
                if (_cfg && !_cfg.handle.isNull())
                  _cfg.field("shootTime").value = 0.01;
              } catch (_) {}
            }
          } catch (_) {}
        }
      } catch (_) {}
    }
    function n5ApplyRainbowItemConfig(_obj) {
      n5RainbowPhase = ((n5RainbowPhase || 0) + 0.075) % 1;
      const _h = Math.floor(((n5RainbowPhase || 0) % 1) * 255) & 255;
      n5ApplyBlueprintItemConfig(_obj, {
        scaleModifier: 0,
        colorHue: _h,
        colorSaturation: 127,
      });
      n5ApplyItemVisualConfig(_obj, _h, 127, 0);
    }
    function n5Il2CppStringToJs(_value) {
      try {
        if (_value && typeof _value.toString === "function")
          return String(_value.toString());
      } catch (_) {}
      return String(_value || "");
    }
    function n5GetDroppedItemID(_grabbableObject) {
      try {
        let _gi = null;
        try {
          if (_grabbableObject && _grabbableObject.method) {
            const _direct = _grabbableObject.method("get_itemID").invoke();
            if (_direct)
              return n5Il2CppStringToJs(_direct).replace(/^item_prefab\//, "");
          }
        } catch (_) {}
        try {
          if (_grabbableObject && _grabbableObject.field) {
            const _direct = _grabbableObject.field("_itemID").value;
            if (_direct)
              return n5Il2CppStringToJs(_direct).replace(/^item_prefab\//, "");
          }
        } catch (_) {}
        try {
          _gi = _grabbableObject
            .method("GetComponent", 1)
            .inflate(GrabbableItemCls)
            .invoke();
        } catch (_) {}
        if ((!_gi || (_gi.handle && _gi.handle.isNull())) && _grabbableObject) {
          try {
            const _go = _grabbableObject.method("get_gameObject").invoke();
            if (_go && !_go.isNull())
              _gi = _go
                .method("GetComponent", 1)
                .inflate(GrabbableItemCls)
                .invoke();
          } catch (_) {}
        }
        if (_gi && (!_gi.handle || !_gi.handle.isNull())) {
          try {
            return n5Il2CppStringToJs(
              _gi.method("get_itemID").invoke(),
            ).replace(/^item_prefab\//, "");
          } catch (_) {}
          try {
            return n5Il2CppStringToJs(_gi.field("_itemID").value).replace(
              /^item_prefab\//,
              "",
            );
          } catch (_) {}
        }
      } catch (_) {}
      return null;
    }
    function n5DupeDroppedBagItem(_grabbableObject) {
      if (!n5BagDropDupeEnabled || time < n5BagDropDupeDelay) return;
      n5BagDropDupeDelay = time + 0.04;
      try {
        const _id = n5GetDroppedItemID(_grabbableObject);
        if (!_id) return;
        let _tf = null;
        try {
          _tf = getTransform(_grabbableObject);
        } catch (_) {}
        if (!_tf || (_tf.isNull && _tf.isNull())) return;
        const _pos = _tf.method("get_position").invoke();
        let _rot = identityRotation;
        try {
          _rot = _tf.method("get_rotation").invoke();
        } catch (_) {}
        let _made = 0;
        const _amt = Math.max(1, Math.min(75, n5BagDropDupeAmount | 0));
        for (let _i = 0; _i < _amt; _i++) {
          const _a = Math.PI * 2 * (_i / Math.max(1, _amt));
          const _off = [
            Math.cos(_a) * 0.12 * (1 + (_i % 4)),
            0.4 + 0.02 * _i,
            Math.sin(_a) * 0.12 * (1 + (_i % 4)),
          ];
          const _spawnPos = [
            (_pos[0] || 0) + _off[0],
            (_pos[1] || 0) + _off[1],
            (_pos[2] || 0) + _off[2],
          ];
          const _obj = n5SpawnConfiguredItemAt(_id, _spawnPos, _rot);
          if (_obj) _made++;
        }
        currentNotification = "Bag drop dupe: " + _made + "x " + _id;
        notifactionResetTime = time + 2;
      } catch (_e) {
        console.error("[N5 BagDropDupe]", _e);
      }
    }
    function n5InstallBagDropDupeHooks() {
      if (n5BagDropDupeHooksInstalled) return;
      try {
        const _dropHandlerCls = acImage.class(
          "AnimalCompany.GrabbableObjectDropHandler",
        );
        const _tryToDrop = _dropHandlerCls.method("TryToDrop", 1);
        const _origTryToDrop = _tryToDrop.implementation;
        _tryToDrop.implementation = function (_grabbableObject) {
          let _ret = true;
          if (!allowAllContainers) {
            try {
              if (_origTryToDrop && typeof _origTryToDrop === "function")
                _ret = _origTryToDrop.call(this, _grabbableObject);
            } catch (_) {}
          }
          if (n5BagDropDupeEnabled && _ret !== false)
            n5DupeDroppedBagItem(_grabbableObject);
          return allowAllContainers ? true : _ret;
        };
      } catch (_dropTryHookErr) {
        console.error("[BagDropDupe] TryToDrop hook failed:", _dropTryHookErr);
      }
      try {
        const _quiverCls = acImage.class("AnimalCompany.Quiver");
        const _nextOut = _quiverCls.method("TryGetNextItemOut", 1);
        const _origNextOut = _nextOut.implementation;
        _nextOut.implementation = function (_grabbableObject) {
          let _ret = true;
          try {
            if (_origNextOut && typeof _origNextOut === "function")
              _ret = _origNextOut.call(this, _grabbableObject);
          } catch (_) {}
          if (n5BagDropDupeEnabled && _ret !== false)
            n5DupeDroppedBagItem(_grabbableObject);
          return _ret;
        };
      } catch (_quiverOutHookErr) {
        console.error(
          "[BagDropDupe] Quiver out hook failed:",
          _quiverOutHookErr,
        );
      }
      try {
        const _backpackCls = acImage.class("AnimalCompany.BackpackItem");
        const _tryOut = _backpackCls.method("TryGetItemOut", 2);
        const _origTryOut = _tryOut.implementation;
        _tryOut.implementation = function (_rootItemID, _grabbableItem) {
          let _ret = true;
          try {
            if (_origTryOut && typeof _origTryOut === "function")
              _ret = _origTryOut.call(this, _rootItemID, _grabbableItem);
          } catch (_) {}
          if (n5BagDropDupeEnabled && _ret !== false)
            n5DupeDroppedBagItem(_grabbableItem);
          return _ret;
        };
        const _removeItem = _backpackCls.method("RemoveItem", 1);
        const _origRemoveItem = _removeItem.implementation;
        _removeItem.implementation = function (_itemKey) {
          if (n5BagDropDupeEnabled || n5NoBackpackRemoveEnabled) return;
          try {
            if (_origRemoveItem && typeof _origRemoveItem === "function")
              return _origRemoveItem.call(this, _itemKey);
          } catch (_) {}
        };
      } catch (_backpackOutHookErr) {
        console.error(
          "[BagDropDupe] Backpack out hook failed:",
          _backpackOutHookErr,
        );
      }
      n5BagDropDupeHooksInstalled = true;
    }
    function n5HeldGrabbable(_handIndex = 0) {
      try {
        const _pl = NetPlayerCls.method("get_localPlayer").invoke();
        if (!_pl) return null;
        const _hand = _pl.method("GetHandInteractor", 1).invoke(_handIndex);
        if (!_hand) return null;
        const _anchor = _hand.field("_itemAnchor").value;
        if (!_anchor) return null;
        const _held = _anchor.method("get_grabbableObject").invoke();
        return _held && (!_held.handle || !_held.handle.isNull())
          ? _held
          : null;
      } catch (_) {
        return null;
      }
    }
    function n5HeldItemComponent(_handIndex = 0) {
      const _held = n5HeldGrabbable(_handIndex);
      if (!_held) return null;
      try {
        const _gi = _held
          .method("GetComponent", 1)
          .inflate(GrabbableItemCls)
          .invoke();
        if (_gi && (!_gi.handle || !_gi.handle.isNull())) return _gi;
      } catch (_) {}
      try {
        const _go = _held.method("get_gameObject").invoke();
        const _gi = _go
          .method("GetComponent", 1)
          .inflate(GrabbableItemCls)
          .invoke();
        if (_gi && (!_gi.handle || !_gi.handle.isNull())) return _gi;
      } catch (_) {}
      return null;
    }
    function n5SetHeldItemValue(_amount = n5HeldValueAmount) {
      try {
        const _gi = n5HeldItemComponent(0) || n5HeldItemComponent(1);
        if (!_gi) {
          currentNotification = "Hold an item first";
          notifactionResetTime = time + 2;
          return false;
        }
        const _v = Math.max(0, Math.min(2147483647, _amount | 0));
        try {
          _gi.method("SetAdditionalSellValue", 1).invoke(_v);
        } catch (_) {}
        try {
          _gi.method("RPC_SetAdditionalSellValue", 1).invoke(_v);
        } catch (_) {}
        try {
          _gi.method("set_additionalSellValue").invoke(_v);
        } catch (_) {}
        try {
          _gi.field("_additionalSellValue").value = _v;
        } catch (_) {}
        currentNotification = "Item value: " + _v;
        notifactionResetTime = time + 2;
        return true;
      } catch (_e) {
        console.error("[N5 ItemValue]", _e);
        currentNotification = "Item value failed";
        notifactionResetTime = time + 2;
        return false;
      }
    }
    function n5DisableItemDespawn(_it) {
      if (!_it || (_it.handle && _it.handle.isNull())) return false;
      try {
        _it.method("set_disableAutoDespawnTimer").invoke(true);
      } catch (_) {}
      try {
        _it.field("_disableAutoDespawnTimer").value = true;
      } catch (_) {}
      try {
        _it.field("useCustomAutoDestroyTime").value = false;
      } catch (_) {}
      try {
        _it.field("autoDestroyTime").value = 99999999;
      } catch (_) {}
      return true;
    }
    function n5InstallNeverDespawnHook() {
      if (n5NeverDespawnHookInstalled) return true;
      try {
        const _giCls = acImage.class("AnimalCompany.GrabbableItem");
        try {
          const _spawned = _giCls.method("Spawned", 0);
          _spawned.implementation = function () {
            const _ret = this.method("Spawned", 0).invoke();
            if (n5NeverDespawnItems) n5DisableItemDespawn(this);
            return _ret;
          };
        } catch (_) {}
        try {
          const _upd = _giCls.method("UpdateDespawnTimer", 1);
          _upd.implementation = function (_resetEvenIfRunning) {
            if (n5NeverDespawnItems) {
              n5DisableItemDespawn(this);
              return;
            }
            return this.method("UpdateDespawnTimer", 1).invoke(
              _resetEvenIfRunning,
            );
          };
        } catch (_) {}
        n5NeverDespawnHookInstalled = true;
        return true;
      } catch (_e) {
        console.error("[N5 NeverDespawn hook]", _e);
        return false;
      }
    }
    function n5RunNeverDespawnItems() {
      if (!n5NeverDespawnItems || time < n5NeverDespawnDelay) return;
      n5NeverDespawnDelay = time + 0.75;
      try {
        const _all = UnityObjectCls.method("FindObjectsByType", 2)
          .inflate(GrabbableItemCls)
          .invoke(0);
        let _c = 0;
        for (let _i = 0; _all && _i < _all.length; _i++) {
          try {
            const _it = _all.get(_i);
            if (!_it || (_it.handle && _it.handle.isNull())) continue;
            n5DisableItemDespawn(_it);
            _c++;
          } catch (_) {}
        }
        if (frameCount % 180 === 0) {
          currentNotification = "No despawn items: " + _c;
          notifactionResetTime = time + 1;
        }
      } catch (_e) {
        console.error("[N5 NeverDespawnItems]", _e);
      }
    }
    function n5JuiceGunConfig(_cfg) {
      if (!_cfg || (_cfg.handle && _cfg.handle.isNull())) return false;
      try {
        _cfg.field("hitDamage").value = 999999;
      } catch (_) {}
      try {
        _cfg.field("minDamage").value = 999999;
      } catch (_) {}
      try {
        _cfg.field("bulletsPerShot").value = 24;
      } catch (_) {}
      try {
        _cfg.field("shotSpread").value = 0;
      } catch (_) {}
      try {
        _cfg.field("hitForceMag").value = 4500;
      } catch (_) {}
      try {
        _cfg.field("recoilForceMag").value = 0;
      } catch (_) {}
      try {
        _cfg.field("handRecoilForceMag").value = 0;
      } catch (_) {}
      try {
        _cfg.field("shootTime").value = 0.01;
      } catch (_) {}
      try {
        _cfg.field("defaultMaxAmmo").value = 255;
      } catch (_) {}
      try {
        _cfg.field("maxDistance").value = 9999;
      } catch (_) {}
      try {
        _cfg.field("headShotMultiplier").value = 99;
      } catch (_) {}
      return true;
    }
    function n5RunInfiniteGunStats(_notify = false) {
      if (!n5InfiniteGunStats && !_notify) return;
      if (!_notify && time < n5GunStatsDelay) return;
      n5GunStatsDelay = time + 0.5;
      let _c = 0;
      try {
        const _gunCls = acImage.class("AnimalCompany.Gun");
        const _guns = UnityObjectCls.method("FindObjectsByType", 2)
          .inflate(_gunCls)
          .invoke(0);
        for (let _i = 0; _guns && _i < _guns.length; _i++) {
          try {
            const _g = _guns.get(_i);
            if (!_g || (_g.handle && _g.handle.isNull())) continue;
            let _cfg = null;
            try {
              _cfg = _g.method("get_config").invoke();
            } catch (_) {}
            try {
              if (!_cfg) _cfg = _g.field("_config").value;
            } catch (_) {}
            if (n5JuiceGunConfig(_cfg)) _c++;
            try {
              _g.method("set_shootTimer").invoke(0);
            } catch (_) {}
            try {
              _g.field("_shootTimer").value = 0;
            } catch (_) {}
          } catch (_) {}
        }
      } catch (_e) {
        console.error("[N5 InfiniteGunStats]", _e);
      }
      try {
        n5RunShotgunNoCooldown();
      } catch (_) {}
      if (_notify) {
        currentNotification = "Juiced guns: " + _c;
        notifactionResetTime = time + 2;
      }
    }
    function n5RunNoRecoil(_notify = false) {
      if (!n5NoRecoilEnabled && !_notify) return;
      if (!_notify && time < n5GunStatsDelay) return;
      n5GunStatsDelay = time + 0.35;
      let _c = 0;
      try {
        const _gunCls = acImage.class("AnimalCompany.Gun");
        const _guns = UnityObjectCls.method("FindObjectsByType", 2)
          .inflate(_gunCls)
          .invoke(0);
        for (let _i = 0; _guns && _i < _guns.length; _i++) {
          try {
            const _g = _guns.get(_i);
            if (!_g || (_g.handle && _g.handle.isNull())) continue;
            let _cfg = null;
            try {
              _cfg = _g.method("get_config").invoke();
            } catch (_) {}
            try {
              if (!_cfg) _cfg = _g.field("_config").value;
            } catch (_) {}
            if (_cfg && (!_cfg.handle || !_cfg.handle.isNull())) {
              try {
                _cfg.field("recoilForceMag").value = 0.0;
              } catch (_) {}
              try {
                _cfg.field("handRecoilForceMag").value = 0.0;
              } catch (_) {}
              try {
                _cfg.field("shotSpread").value = 0.0;
              } catch (_) {}
              try {
                _cfg.field("shotSpreadMin").value = 0.0;
              } catch (_) {}
              try {
                _cfg.field("shotSpreadMax").value = 0.0;
              } catch (_) {}
              _c++;
            }
            try {
              _g.field("_recoilCooldown").value = 0.0;
            } catch (_) {}
            try {
              _g.field("recoilForceMag").value = 0.0;
            } catch (_) {}
            try {
              _g.field("_recoilForceMag").value = 0.0;
            } catch (_) {}
          } catch (_) {}
        }
      } catch (_e) {
        console.error("[N5 NoRecoil]", _e);
      }
      if (_notify) {
        currentNotification = "No recoil guns: " + _c;
        notifactionResetTime = time + 2;
      }
    }
    function n5RunItemForceCannon() {
      if (!rightGrab || !rightTrigger || time < n5ItemForceDelay) return;
      n5ItemForceDelay = time + 0.04;
      try {
        const _g = getGunPointerResult(),
          _r = _g.ray;
        if (!_r || !n5GunRayOk(_r)) return;
        const _hit = _r.method("get_point").invoke();
        const _fwd = rightHandTransform.method("get_forward").invoke();
        const _force = Vector3Cls.method("op_Multiply", 2).invoke(_fwd, 185);
        const _all = UnityObjectCls.method("FindObjectsByType", 2)
          .inflate(GrabbableItemCls)
          .invoke(0);
        let _c = 0;
        for (let _i = 0; _all && _i < _all.length; _i++) {
          try {
            const _it = _all.get(_i);
            if (!_it || (_it.handle && _it.handle.isNull())) continue;
            const _p = getTransform(_it).method("get_position").invoke();
            const _d = Vector3Cls.method("Distance").invoke(_hit, _p);
            if (_d > 4.0) continue;
            let _ok = false;
            try {
              _it.method("AddExternalForceVelocity", 1).invoke(_force);
              _ok = true;
            } catch (_) {}
            try {
              if (!_ok) _it.method("AddExternalForce", 2).invoke(_force, 1);
              _ok = true;
            } catch (_) {}
            if (!_ok) {
              const _go = _it.method("get_gameObject").invoke();
              const _rb = _go
                .method("GetComponent", 1)
                .inflate(RigidbodyCls)
                .invoke();
              if (_rb && (!_rb.handle || !_rb.handle.isNull())) {
                _rb.method("AddForce", 2).invoke(_force, 1);
                _ok = true;
              }
            }
            if (_ok) _c++;
          } catch (_) {}
        }
        if (_c > 0) {
          currentNotification = "Item force: " + _c;
          notifactionResetTime = time + 0.5;
        }
      } catch (_e) {
        console.error("[N5 ItemForceCannon]", _e);
      }
    }
    function n5PickupTypeValue(_name, _fallback) {
      try {
        const _enum = acImage.class("AnimalCompany.PickupType");
        const _v = _enum.field(_name).value;
        if (_v !== null && _v !== undefined) return _v;
      } catch (_) {}
      return _fallback;
    }
    function n5SpawnPickupAt(_pickupName, _pos, _count, _fallbackItemId) {
      let _ok = false;
      try {
        const _mgr = acImage.class("AnimalCompany.PickupManager");
        const _ptype =
          _pickupName === "Nuts"
            ? n5PickupTypeValue("Nuts", 2)
            : n5PickupTypeValue("Ammo", 1);
        try {
          _mgr
            .method("SpawnPickup", 4)
            .overload(
              "AnimalCompany.PickupType",
              "UnityEngine.Vector3",
              "System.Int32",
              "System.Boolean",
            )
            .invoke(_ptype, _pos, _count | 0, true);
          _ok = true;
        } catch (_) {}
        try {
          if (!_ok)
            _mgr
              .method("SpawnPickup", 4)
              .invoke(_ptype, _pos, _count | 0, true);
          _ok = true;
        } catch (_) {}
        try {
          if (!_ok)
            _mgr
              .method("SpawnPickup", 4)
              .invoke(_ptype, _pos, _count | 0, false);
          _ok = true;
        } catch (_) {}
      } catch (_e) {
        console.error("[N5 Pickup SpawnPickup]", _e);
      }
      if (!_ok && _fallbackItemId) {
        try {
          _ok = !!n5SpawnConfiguredItemAt(
            _fallbackItemId,
            _pos,
            identityRotation,
          );
        } catch (_) {}
      }
      return _ok;
    }
    function n5RunPickupGun(_pickupName, _label, _fallbackItemId, _count = 1) {
      if (!rightGrab || !rightTrigger) return;
      n5PickupGunDelay = time;
      try {
        const _g = getGunPointerResult(),
          _r = _g.ray;
        if (!_r || !n5GunRayOk(_r)) return;
        const _pos = _r.method("get_point").invoke();
        const _ok = n5SpawnPickupAt(_pickupName, _pos, _count, _fallbackItemId);
        currentNotification = _ok
          ? _label + " pickup spawned"
          : _label + " pickup failed";
        notifactionResetTime = time + 1.5;
      } catch (_e) {
        console.error("[N5 PickupGun " + _label + "]", _e);
      }
    }
    function n5DestroyItemObject(_obj) {
      if (!_obj) return false;
      try {
        _obj.method("RPC_Destroy").invoke();
        return true;
      } catch (_) {}
      try {
        _obj.method("DestroySelf").invoke();
        return true;
      } catch (_) {}
      try {
        _obj.method("Despawn").invoke();
        return true;
      } catch (_) {}
      try {
        _obj.method("RPC_Teleport").invoke([0, -99999, 0]);
        return true;
      } catch (_) {}
      try {
        getTransform(_obj).method("set_position").invoke([0, -99999, 0]);
      } catch (_) {}
      try {
        const _go = _obj.method("get_gameObject").invoke();
        if (_go && !_go.isNull())
          UnityObjectCls.method("Destroy", 1).invoke(_go);
        return true;
      } catch (_) {}
      try {
        UnityObjectCls.method("Destroy", 1).invoke(_obj);
        return true;
      } catch (_) {}
      return false;
    }
    function n5ItemFromRayHit(_ray) {
      try {
        const _col = _ray.method("get_collider").invoke();
        if (!_col || (_col.isNull && _col.isNull())) return null;
        let _it = null;
        try {
          _it = getComponentInParent(_col, GrabbableItemCls);
        } catch (_) {}
        if (!_it || (_it.handle && _it.handle.isNull()))
          try {
            _it = getComponentInParent(_col, GrabbableObjectCls);
          } catch (_) {}
        if (_it && (!_it.handle || !_it.handle.isNull())) return _it;
        try {
          const _go = _col.method("get_gameObject").invoke();
          if (_go && !_go.isNull()) {
            try {
              _it = _go
                .method("GetComponent", 1)
                .inflate(GrabbableItemCls)
                .invoke();
            } catch (_) {}
            if (!_it || (_it.handle && _it.handle.isNull()))
              try {
                _it = _go
                  .method("GetComponent", 1)
                  .inflate(GrabbableObjectCls)
                  .invoke();
              } catch (_) {}
            if (_it && (!_it.handle || !_it.handle.isNull())) return _it;
          }
        } catch (_) {}
      } catch (_) {}
      return null;
    }
    function n5EnumField(_className, _fieldName) {
      try {
        return acImage.class(_className).field(_fieldName).value;
      } catch (_) {}
      return null;
    }
    function n5RunVoxelNuke() {
      if (!rightGrab || !rightTrigger) return;
      n5VoxelNukeDelay = time;
      try {
        const _g = getGunPointerResult(),
          _r = _g.ray;
        if (!_r || !n5GunRayOk(_r)) return;
        const _p = _r.method("get_point").invoke();
        const _vmCls = acImage.class("AnimalCompany.Voxel.VoxelManager");
        let _vm = null;
        try {
          _vm = _vmCls.method("get_instance").invoke();
        } catch (_) {}
        if (!_vm || (_vm.handle && _vm.handle.isNull()))
          try {
            _vm = UnityObjectCls.method("FindObjectOfType", 0)
              .inflate(_vmCls)
              .invoke();
          } catch (_) {}
        if (!_vm || (_vm.handle && _vm.handle.isNull())) {
          currentNotification = "VoxelManager not found";
          notifactionResetTime = time + 2;
          return;
        }
        const _damage =
          n5EnumField("AnimalCompany.DamageType", "Explosive") ?? 4;
        const _src =
          n5EnumField("AnimalCompany.Voxel.VoxelEventSource", "Player") ?? 0;
        let _count = 0;
        try {
          _count = _vm
            .method("MineWorldRadius", 6)
            .invoke(_p, 7.5, 999999, _damage, false, _src);
        } catch (_) {}
        if (!_count)
          try {
            _count = _vm
              .method("MineWorldRadius")
              .invoke(_p, 7.5, 999999, 4, false, 0);
          } catch (_) {}
        currentNotification = "Voxel nuke: " + _count;
        notifactionResetTime = time + 1.5;
      } catch (_e) {
        console.error("[N5 VoxelNuke]", _e);
        currentNotification = "Voxel nuke failed";
        notifactionResetTime = time + 2;
      }
    }
    function n5FirePrefabLauncher(
      _prefabName,
      _label,
      _power = 0,
      _cooldown = 0,
    ) {
      if (!rightGrab || !rightTrigger || time < n5OrbitFuckeryShootDelay)
        return;
      n5OrbitFuckeryShootDelay = time + _cooldown;
      try {
        const _handPos = rightHandTransform.method("get_position").invoke();
        const _handRot = rightHandTransform.method("get_rotation").invoke();
        const _handFwd = rightHandTransform.method("get_forward").invoke();
        const _spawnPos = Vector3Cls.method("op_Addition").invoke(
          _handPos,
          Vector3Cls.method("op_Multiply", 2).invoke(_handFwd, 0.65),
        );
        const _obj = spawnNetworkPrefab(_prefabName, _spawnPos, _handRot);
        if (_obj && _power > 0) n5LaunchItemObject(_obj, _handFwd, _power);
        currentNotification = "Launched: " + (_label || _prefabName);
        notifactionResetTime = time + 1;
      } catch (_e) {
        console.error("[N5 PrefabLauncher]", _e);
      }
    }
    function n5FireFlareProjectileLauncher() {
      if (!rightGrab || !rightTrigger) return;
      try {
        const _handPos = rightHandTransform.method("get_position").invoke();
        const _handRot = rightHandTransform.method("get_rotation").invoke();
        const _handFwd = rightHandTransform.method("get_forward").invoke();
        const _spawnPos = Vector3Cls.method("op_Addition").invoke(
          _handPos,
          Vector3Cls.method("op_Multiply", 2).invoke(_handFwd, 0.75),
        );
        const _obj = spawnNetworkPrefab(
          "FlareGunProjectile",
          _spawnPos,
          _handRot,
        );
        if (_obj) n5LaunchItemObject(_obj, _handFwd, 75);
        currentNotification = "Launched: flare";
        notifactionResetTime = time + 1;
      } catch (_e) {
        console.error("[N5 FlareProjectileLauncher]", _e);
      }
    }
    function n5FireItemLauncher(
      _itemId,
      _label,
      _power = 95,
      _cooldown = 0,
      _rainbow = false,
    ) {
      if (!rightGrab || !rightTrigger || time < n5OrbitFuckeryShootDelay)
        return;
      n5OrbitFuckeryShootDelay = time + _cooldown;
      try {
        const _handPos = rightHandTransform.method("get_position").invoke();
        const _handRot = rightHandTransform.method("get_rotation").invoke();
        const _handFwd = rightHandTransform.method("get_forward").invoke();
        const _spawnPos = Vector3Cls.method("op_Addition").invoke(
          _handPos,
          Vector3Cls.method("op_Multiply", 2).invoke(_handFwd, 0.65),
        );
        const _obj = _rainbow
          ? n5SpawnItemSyncAt(_itemId, _spawnPos, _handRot) ||
            n5SpawnItemObjectAt(_itemId, _spawnPos, _handRot)
          : n5SpawnConfiguredItemAt(_itemId, _spawnPos, _handRot);
        if (_obj && _obj !== true) {
          if (_rainbow) n5ApplyRainbowItemConfig(_obj);
          n5LaunchItemObject(_obj, _handFwd, _power);
        } else {
          if (!_rainbow) n5SpawnItemAt(_itemId, _spawnPos, _handRot);
          else {
            currentNotification = "Rainbow spawn needs sync item object";
            notifactionResetTime = time + 1;
            return;
          }
        }
        currentNotification = "Launched: " + (_label || _itemId);
        notifactionResetTime = time + 1;
      } catch (_e) {
        console.error("[N5 ItemLauncher]", _e);
      }
    }
    function n5BuildLaunchersCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back to Combat",
          isTogglable: false,
          toolTip: "back to combat hub",
          method: () => {
            currentCategory = 43;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Item +",
          isTogglable: false,
          toolTip: "next item",
          method: () => {
            itemIndex = (itemIndex + 1) % itemIDs.length;
            currentNotification = "ITEM: " + itemIDs[itemIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Item -",
          isTogglable: false,
          toolTip: "previous item",
          method: () => {
            itemIndex = (itemIndex - 1 + itemIDs.length) % itemIDs.length;
            currentNotification = "ITEM: " + itemIDs[itemIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Selected Item Launcher",
          isTogglable: true,
          toolTip: "hold right grip and trigger to spam launch selected item",
          method: () =>
            n5FireItemLauncher(itemIDs[itemIndex], itemIDs[itemIndex], 95, 0),
        }),
        new MenuItem({
          buttonText: "Rainbow Item Launcher",
          isTogglable: true,
          toolTip:
            "hold right grip and trigger to spam launch selected item with rainbow color",
          method: () =>
            n5FireItemLauncher(
              itemIDs[itemIndex],
              "rainbow " + itemIDs[itemIndex],
              105,
              0,
              true,
            ),
        }),
        new MenuItem({
          buttonText: "Timebomb Launcher",
          isTogglable: true,
          toolTip: "hold right grip and trigger to spam launch timebombs",
          method: () => n5FireItemLauncher("item_timebomb", "timebomb", 100, 0),
        }),
        new MenuItem({
          buttonText: "Pelican Case Launcher",
          isTogglable: true,
          toolTip: "hold right grip and trigger to spam launch pelican cases",
          method: () =>
            n5FireItemLauncher("item_pelican_case", "pelican case", 90, 0),
        }),
        new MenuItem({
          buttonText: "Rare Card Launcher",
          isTogglable: true,
          toolTip: "hold right grip and trigger to spam launch rare cards",
          method: () =>
            n5FireItemLauncher("item_rare_card", "rare card", 105, 0),
        }),
        new MenuItem({
          buttonText: "Rocket Launcher",
          isTogglable: true,
          toolTip: "hold right grip and trigger to fire RPGRocket",
          method: () => n5FirePrefabLauncher("RPGRocket", "rocket", 0),
        }),
        new MenuItem({
          buttonText: "Robot Rocket Launcher",
          isTogglable: true,
          toolTip: "hold right grip and trigger to fire RobotDogRPG",
          method: () => n5FirePrefabLauncher("RobotDogRPG", "robot rocket", 0),
        }),
        new MenuItem({
          buttonText: "Rocket Spear Launcher",
          isTogglable: true,
          toolTip: "hold right grip and trigger to fire RPGRocketSpear",
          method: () =>
            n5FirePrefabLauncher("RPGRocketSpear", "rocket spear", 0),
        }),
        new MenuItem({
          buttonText: "Rocket Egg Launcher",
          isTogglable: true,
          toolTip: "hold right grip and trigger to fire RPGRocketEgg",
          method: () => n5FirePrefabLauncher("RPGRocketEgg", "rocket egg", 0),
        }),
        new MenuItem({
          buttonText: "Flare Launcher",
          isTogglable: true,
          toolTip: "hold right grip and trigger to fire FlareGunProjectile",
          method: () => n5FireFlareProjectileLauncher(),
        }),
        new MenuItem({
          buttonText: "Buggy Launcher",
          isTogglable: true,
          toolTip: "hold right grip and trigger to spam launch buggies",
          method: () => n5FirePrefabLauncher("Vehicle_Buggy", "buggy", 85, 0),
        }),
      ];
    }
    function n5RunInfiniteHoverpadBattery() {
      if (!n5InfiniteHoverpadBattery) return;
      try {
        const _cls = acImage.class("AnimalCompany.Hoverpad");
        const _arr = UnityObjectCls.method("FindObjectsOfType", 0)
          .inflate(_cls)
          .invoke();
        const _len = _arr && typeof _arr.length === "number" ? _arr.length : 0;
        for (let _i = 0; _i < _len; _i++) {
          const _hp = _arr instanceof Map ? _arr.get(_i) : _arr[_i];
          if (!_hp || (_hp.handle && _hp.handle.isNull())) continue;
          try {
            _hp.method("set_battery").invoke(1.0);
          } catch (_) {}
          try {
            _hp.field("_battery").value = 1.0;
          } catch (_) {}
          try {
            _hp.method("HandleBatteryChanged").invoke();
          } catch (_) {}
        }
      } catch (_) {}
    }

    function n5BuildArenaFuckeryCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Arena Start",
          isTogglable: false,
          toolTip: "calls ArenaGameManager.StartGame from dump",
          method: () => n5ArenaManagerCall("StartGame"),
        }),
        new MenuItem({
          buttonText: "Arena End",
          isTogglable: false,
          toolTip: "calls ArenaGameManager.EndGame from dump",
          method: () => n5ArenaManagerCall("EndGame"),
        }),
        new MenuItem({
          buttonText: "Spam Start+Stop",
          isTogglable: true,
          toolTip: "spams ArenaGameManager.StartGame and EndGame together",
          enableMethod: () => {
            n5ArenaStartStopSpam = true;
          },
          disableMethod: () => {
            n5ArenaStartStopSpam = false;
          },
          method: () => n5RunArenaStartStopSpam(),
        }),
        new MenuItem({
          buttonText: "Arena Enter Map",
          isTogglable: false,
          toolTip: "calls ArenaGameManager.EnterMap",
          method: () => n5ArenaManagerCall("EnterMap"),
        }),
        new MenuItem({
          buttonText: "Arena Exit Map",
          isTogglable: false,
          toolTip: "calls ArenaGameManager.ExitMap",
          method: () => n5ArenaManagerCall("ExitMap"),
        }),
        new MenuItem({
          buttonText: "Arena Team 1",
          isTogglable: false,
          toolTip: "set local arena team 1",
          method: () => n5ArenaManagerCall("SetLocalPlayerTeam", 1),
        }),
        new MenuItem({
          buttonText: "Arena Team 2",
          isTogglable: false,
          toolTip: "set local arena team 2",
          method: () => n5ArenaManagerCall("SetLocalPlayerTeam", 2),
        }),
        new MenuItem({
          buttonText: "Spam Arena",
          isTogglable: true,
          toolTip: "spams arena prefabs/items at right hand",
          method: () => n5SpamArenaStuff(),
        }),
        new MenuItem({
          buttonText: "Arena Ore Burst",
          isTogglable: false,
          toolTip:
            "uses ArenaOreSpawner SpawnGold/SpawnEmerald, fallback hell ores",
          method: () => n5ArenaOreBurst(),
        }),
        new MenuItem({
          buttonText: "Arena Item Burst",
          isTogglable: false,
          toolTip: "spawns arena guns, ammo, ores, and weapon boxes",
          method: () => n5ArenaItemBurst(false),
        }),
        new MenuItem({
          buttonText: "Arena Item Gun",
          isTogglable: true,
          toolTip: "hold right grip + trigger to spawn arena items at pointer",
          method: () => {
            if (!rightGrab || !rightTrigger || time < n5ArenaSpamDelay) return;
            n5ArenaSpamDelay = time + 0.35;
            n5ArenaItemBurst(true);
          },
        }),
        new MenuItem({
          buttonText: "Arena Guns Burst",
          isTogglable: false,
          toolTip: "spawns arena guns and shotgun ammo",
          method: () => {
            try {
              const _pose = n5RightHandPose(1.0),
                _ids = [
                  "item_arena_pistol",
                  "item_arena_shotgun",
                  "item_shotgun_ammo",
                  "item_revolver_ammo",
                ];
              for (let _i = 0; _i < 20; _i++) {
                const _a = (Math.PI * 2 * _i) / 20;
                n5SpawnItemAt(
                  _ids[_i % _ids.length],
                  [
                    (_pose.pos[0] || 0) + Math.cos(_a) * 0.5,
                    (_pose.pos[1] || 0) + 0.05 * _i,
                    (_pose.pos[2] || 0) + Math.sin(_a) * 0.5,
                  ],
                  identityRotation,
                );
              }
              currentNotification = "Arena guns burst";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("[N5 Arena Guns]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Giveaway Bag Launcher",
          isTogglable: true,
          toolTip: "hold right grip + B to launch a random filled bag",
          method: () => {
            if (!(rightGrab && rightSecondary) || time < n5GiveawayBagDelay)
              return;
            n5GiveawayBagDelay = time + 0.45;
            n5SpawnGiveawayBag(true);
          },
        }),
      ];
    }
    const n5OreIDs = [
      "Arena_BlueTeam",
      "Arena_Emerald",
      "Arena_Gold",
      "Arena_Health",
      "Arena_Loot",
      "Arena_RedTeam",
      "BrainMatter",
      "Carrot",
      "Copper",
      "Duck",
      "Garbage",
      "Gold",
      "Graveyard",
      "HeartMatter",
      "HeartMatter_Blue",
      "Hell",
      "Nuts",
      "Pelican",
      "RP",
      "RP_Big",
      "Silver",
      "Teleporter",
      "TESTING",
      "Uranium",
      "Wireframe",
    ];
    let n5OreIndex = 15,
      n5OreSpawnCount = 5,
      n5OreGunDelay = 0,
      n5LooseOres = [],
      n5NetworkOreHosts = [];
    function n5OreID() {
      return n5OreIndex + 1;
    }
    function n5OreLabel() {
      return n5OreIDs[n5OreIndex] + " (" + n5OreID() + ")";
    }
    function n5OreVeins() {
      try {
        return n5FindAllClass("AnimalCompany.GameGen.OreVein");
      } catch (_) {
        return [];
      }
    }
    function n5SpawnLooseOre(_pos, _rot = identityRotation) {
      try {
        const _oreCls = acImage.class("AnimalCompany.Ore");
        const _sheetCls = acImage.class("AnimalCompany.OreDataSheet");
        const _sheet = _sheetCls.method("get_instance").invoke();
        if (!_sheet || (_sheet.handle && _sheet.handle.isNull())) return null;
        const _prefab = _sheet.field("oreBasePrefab").value;
        if (!_prefab || (_prefab.handle && _prefab.handle.isNull()))
          return null;
        const _data = _sheet.method("GetOreData").invoke(n5OreID());
        if (!_data || (_data.handle && _data.handle.isNull())) return null;
        let _ore = null;
        try {
          _ore = UnityObjectCls.method("Instantiate", 3)
            .inflate(_oreCls)
            .invoke(_prefab, _pos, _rot);
        } catch (_) {}
        if (!_ore || (_ore.handle && _ore.handle.isNull()))
          try {
            _ore = UnityObjectCls.method("Instantiate", 3).invoke(
              _prefab,
              _pos,
              _rot,
            );
          } catch (_) {}
        if (!_ore || (_ore.handle && _ore.handle.isNull())) return null;
        let _health = 100;
        try {
          _health = _data.field("health").value;
        } catch (_) {}
        try {
          _ore.method("InitOre").invoke(_data, _health);
        } catch (_) {}
        try {
          getTransform(_ore).method("set_position").invoke(_pos);
        } catch (_) {}
        try {
          getTransform(_ore).method("set_rotation").invoke(_rot);
        } catch (_) {}
        try {
          const _go = _ore.method("get_gameObject").invoke();
          if (_go && !_go.isNull()) _go.method("SetActive").invoke(true);
        } catch (_) {}
        n5LooseOres.push(_ore);
        return _ore;
      } catch (_e) {
        console.error("[N5 Loose Ore]", _e);
        return null;
      }
    }
    function n5SpawnLooseOreBurst(_point, _count = n5OreSpawnCount) {
      let _made = 0;
      _count = Math.max(1, Math.min(50, _count | 0));
      for (let _i = 0; _i < _count; _i++) {
        const _a = (Math.PI * 2 * _i) / Math.max(1, _count),
          _r = 0.08 * Math.sqrt(_i);
        const _pos = [
          n5VecNum(_point, 0, "x") + Math.cos(_a) * _r,
          n5VecNum(_point, 1, "y") + 0.04 * Math.floor(_i / 8),
          n5VecNum(_point, 2, "z") + Math.sin(_a) * _r,
        ];
        if (n5SpawnLooseOre(_pos, identityRotation)) _made++;
      }
      return _made;
    }
    function n5ClearLooseOres() {
      let _count = 0;
      for (const _ore of n5LooseOres) {
        try {
          const _go = _ore.method("get_gameObject").invoke();
          if (_go && !_go.isNull()) {
            UnityObjectCls.method("Destroy", 1).invoke(_go);
            _count++;
          }
        } catch (_) {
          try {
            UnityObjectCls.method("Destroy", 1).invoke(_ore);
            _count++;
          } catch (_2) {}
        }
      }
      n5LooseOres = [];
      return _count;
    }
    function n5NearestOreVein(_point) {
      let _best = null,
        _bestDist = Infinity;
      for (const _vein of n5OreVeins()) {
        try {
          const _pos = getTransform(_vein).method("get_position").invoke();
          const _dist = Vector3Cls.method("Distance").invoke(_pos, _point);
          if (_dist < _bestDist) {
            _best = _vein;
            _bestDist = _dist;
          }
        } catch (_) {}
      }
      return _best;
    }
    function n5OreVeinPrefabDescriptions() {
      const _matches = [];
      try {
        const _runner = PrefabGeneratorCls.field("_instance")
          .value.method("get_runner")
          .invoke();
        if (!_runner || _runner.isNull()) return _matches;
        const _sources = _runner
          .field("_config")
          .value.field("PrefabTable")
          .value.field("_sources").value;
        const _count = _sources.method("get_Count").invoke();
        for (let _i = 0; _i < _count; _i++) {
          try {
            const _entry = _sources.method("get_Item").invoke(_i);
            const _desc = n5ManagedString(
              _entry.method("get_Description").invoke(),
            );
            const _lower = _desc.toLowerCase();
            if (_lower.includes("ore") && _lower.includes("vein"))
              _matches.push(_desc);
          } catch (_) {}
        }
      } catch (_e) {
        console.error("[N5 Ore prefab scan]", _e);
      }
      return _matches;
    }
    function n5OreVeinFromNetworkObject(_obj) {
      if (!_obj) return null;
      try {
        _obj.method("RPC_SpawnOre");
        return _obj;
      } catch (_) {}
      let _go = null;
      try {
        _go = _obj.method("get_gameObject").invoke();
      } catch (_) {}
      if (!_go || _go.isNull()) return null;
      try {
        const _cls = acImage.class("AnimalCompany.GameGen.OreVein");
        const _vein = _go
          .method("GetComponentInChildren", 1)
          .inflate(_cls)
          .invoke(true);
        if (_vein && (!_vein.handle || !_vein.handle.isNull())) return _vein;
      } catch (_) {}
      try {
        return n5GetComponentByName(_go, "AnimalCompany.GameGen.OreVein");
      } catch (_) {}
      return null;
    }
    function n5SpawnNetworkOreVein(_point) {
      const _names = n5OreVeinPrefabDescriptions();
      for (const _name of _names) {
        try {
          const _obj = spawnNetworkPrefab(_name, _point, identityRotation);
          if (!_obj) continue;
          const _vein = n5OreVeinFromNetworkObject(_obj);
          if (_vein) {
            n5NetworkOreHosts.push(_obj);
            console.log("[N5 Ore] spawned network host: " + _name);
            return _vein;
          }
          try {
            n5DespawnPrefabObj(_obj);
          } catch (_) {}
        } catch (_) {}
      }
      for (const _name of ["OreVein", "Ore Vein", "ore_vein"]) {
        try {
          const _obj = spawnNetworkPrefab(_name, _point, identityRotation);
          if (!_obj) continue;
          const _vein = n5OreVeinFromNetworkObject(_obj);
          if (_vein) {
            n5NetworkOreHosts.push(_obj);
            console.log("[N5 Ore] spawned guessed network host: " + _name);
            return _vein;
          }
          try {
            n5DespawnPrefabObj(_obj);
          } catch (_) {}
        } catch (_) {}
      }
      return null;
    }
    function n5SpawnOreOnVein(
      _vein,
      _ore = n5OreID(),
      _count = n5OreSpawnCount,
    ) {
      if (!_vein) return 0;
      _count = Math.max(1, Math.min(255, _count | 0));
      try {
        _vein.method("RPC_SpawnOre").invoke(_ore, _count);
        return _count;
      } catch (_) {}
      try {
        const _made = _vein.method("RequestOreSpawn").invoke(_ore, _count);
        if ((_made | 0) > 0) return _made | 0;
      } catch (_) {}
      return 0;
    }
    function n5SpawnSelectedOreAll() {
      let _veins = 0,
        _spawned = 0;
      for (const _vein of n5OreVeins()) {
        const _made = n5SpawnOreOnVein(_vein);
        if (_made) {
          _veins++;
          _spawned += _made;
        }
      }
      currentNotification =
        "Spawned " +
        n5OreLabel() +
        " x" +
        _spawned +
        " on " +
        _veins +
        " vein(s)";
      notifactionResetTime = time + 3;
    }
    function n5RunOreSpawnGun() {
      if (!n5IsAiming() || !rightTrigger || time < n5OreGunDelay) return;
      n5OreGunDelay = time + 0.35;
      try {
        const _g = getGunPointerResult(),
          _point = _g.endPosition || _g.point;
        let _vein = n5SpawnNetworkOreVein(_point),
          _newHost = !!_vein;
        if (!_vein) _vein = n5NearestOreVein(_point);
        const _made = n5SpawnOreOnVein(_vein);
        if (_newHost && !_made) {
          const _failedHost = n5NetworkOreHosts.pop();
          try {
            n5DespawnPrefabObj(_failedHost);
          } catch (_) {}
        }
        currentNotification = _made
          ? (_newHost ? "SERVER ORE: " : "VEIN RPC: ") +
            n5OreLabel() +
            " x" +
            _made
          : "No network OreVein host/prefab";
        notifactionResetTime = time + 2;
      } catch (_e) {
        console.error("[N5 Ore Gun]", _e);
      }
    }
    function n5BreakAllOres() {
      let _hits = 0,
        _veins = 0;
      for (const _vein of n5OreVeins()) {
        _veins++;
        let _len = 0;
        try {
          _len = n5ManagedArrayLength(_vein.field("_oreInstances").value);
        } catch (_) {}
        if (!_len)
          try {
            _len = n5ManagedArrayLength(
              _vein.field("instantiatedOreLocal").value,
            );
          } catch (_) {}
        if (!_len) _len = 64;
        let _pos = vec3Zero;
        try {
          _pos = getTransform(_vein).method("get_position").invoke();
        } catch (_) {}
        for (let _i = 0; _i < Math.min(255, _len); _i++) {
          try {
            _vein.method("RPC_HitOre").invoke(_i, 255, _pos);
            _hits++;
          } catch (_) {}
        }
      }
      const _loose = n5ClearLooseOres();
      currentNotification =
        "Break all ores: " +
        _hits +
        " RPC hit(s), " +
        _loose +
        " loose destroyed";
      notifactionResetTime = time + 3;
    }
    function n5ClearAllOres() {
      let _count = 0;
      for (const _vein of n5OreVeins())
        try {
          _vein.method("ClearAllOre").invoke();
          _count++;
        } catch (_) {}
      let _hosts = 0;
      for (const _host of n5NetworkOreHosts)
        try {
          n5DespawnPrefabObj(_host);
          _hosts++;
        } catch (_) {}
      n5NetworkOreHosts = [];
      const _loose = n5ClearLooseOres();
      currentNotification =
        "Cleared " +
        _count +
        " vein(s), " +
        _hosts +
        " host(s), " +
        _loose +
        " loose ore(s)";
      notifactionResetTime = time + 2;
    }
    function n5BuildOreFuckeryCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Ore Spawn Gun",
          isTogglable: true,
          toolTip:
            "hold aim + trigger to spawn a network OreVein host and RPC mineable ore at the pointer",
          method: n5RunOreSpawnGun,
        }),
        new MenuItem({
          buttonText: "Ore ID +",
          isTogglable: false,
          toolTip: "next ore data id",
          method: () => {
            n5OreIndex = (n5OreIndex + 1) % n5OreIDs.length;
            currentNotification = "ORE: " + n5OreLabel();
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Ore ID -",
          isTogglable: false,
          toolTip: "previous ore data id",
          method: () => {
            n5OreIndex = (n5OreIndex - 1 + n5OreIDs.length) % n5OreIDs.length;
            currentNotification = "ORE: " + n5OreLabel();
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Current Ore ID",
          isTogglable: false,
          toolTip: "show selected ore id",
          method: () => {
            currentNotification = "ORE: " + n5OreLabel();
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Ore Count +",
          isTogglable: false,
          toolTip: "increase spawn count",
          method: () => {
            n5OreSpawnCount = Math.min(255, n5OreSpawnCount + 5);
            currentNotification = "ORE COUNT: " + n5OreSpawnCount;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Ore Count -",
          isTogglable: false,
          toolTip: "decrease spawn count",
          method: () => {
            n5OreSpawnCount = Math.max(1, n5OreSpawnCount - 5);
            currentNotification = "ORE COUNT: " + n5OreSpawnCount;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Loose Ore (Local)",
          isTogglable: false,
          toolTip: "local visual clone only; it is not networked or mineable",
          method: () => {
            const _p = n5RightHandPose(0.8),
              _c = n5SpawnLooseOreBurst(_p.pos);
            currentNotification = "LOCAL loose " + n5OreLabel() + ": " + _c;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Ore All Veins",
          isTogglable: false,
          toolTip: "spawn selected ore in every live ore vein",
          method: n5SpawnSelectedOreAll,
        }),
        new MenuItem({
          buttonText: "Break All Ores",
          isTogglable: false,
          toolTip: "RPC hit every ore slot with max byte damage",
          method: n5BreakAllOres,
        }),
        new MenuItem({
          buttonText: "Clear All Ores",
          isTogglable: false,
          toolTip: "call ClearAllOre on every ore vein",
          method: n5ClearAllOres,
        }),
      ];
    }
    function n5BuildRigShitCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Rig Duper",
          isTogglable: false,
          toolTip: "spawn a NetPlayer dupe at your position",
          method: () => n5RigDupeMe(1),
        }),
        new MenuItem({
          buttonText: "Rig Burst x5",
          isTogglable: false,
          toolTip: "spawn five NetPlayer dupes around you",
          method: () => n5RigDupeMe(5),
        }),
        new MenuItem({
          buttonText: "Rig Duper Gun",
          isTogglable: true,
          toolTip: "hold right grip and trigger to spawn rig dupes at pointer",
          method: () => n5RigDupeGun(),
        }),
        new MenuItem({
          buttonText: "Spam Rigs",
          isTogglable: true,
          toolTip: "spams NetPlayer dupes around your rig",
          method: () => n5RigSpam(),
        }),
        new MenuItem({
          buttonText: "Rig Spasm",
          isTogglable: true,
          toolTip: "makes your local rig/hands spasm",
          enableMethod: () => {
            n5RigSpasmEnabled = true;
            n5RigSpasmBase = null;
          },
          disableMethod: () => {
            n5RigSpasmEnabled = false;
            n5StopRigSpasm();
          },
          method: () => n5RunRigSpasm(),
        }),
        new MenuItem({
          buttonText: "Stop Rig Spasm",
          isTogglable: false,
          toolTip: "resets rig spasm offsets and hand scale",
          method: () => {
            n5RigSpasmEnabled = false;
            n5StopRigSpasm();
            currentNotification = "Rig spasm stopped";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Rig At Hand",
          isTogglable: false,
          toolTip: "spawn a NetPlayer dupe from your right hand",
          method: () => {
            const _p = n5RightHandPose(0.75);
            n5SpawnRigDupeAt(_p.pos, 1);
          },
        }),
        new MenuItem({
          buttonText: "Rig Rain",
          isTogglable: true,
          toolTip: "hold right grip to rain rig dupes above you",
          method: () => {
            if (!rightGrab || time < n5RigSpamDelay) return;
            n5RigSpamDelay = time + 0.2;
            const _p = n5LocalPlayerPos();
            n5SpawnRigDupeAt(
              [
                (_p[0] || 0) + (Math.random() - 0.5) * 4,
                (_p[1] || 0) + 3 + Math.random() * 2,
                (_p[2] || 0) + (Math.random() - 0.5) * 4,
              ],
              1,
            );
          },
        }),
      ];
    }
    function n5BuildBuffFuckeryCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Buff ID +",
          isTogglable: false,
          toolTip: "next dumped PlayerBuff id",
          method: () => {
            n5BuffId = (n5BuffId + 1) & 32767;
            currentNotification = "Buff ID: " + n5BuffId;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Buff ID -",
          isTogglable: false,
          toolTip: "previous dumped PlayerBuff id",
          method: () => {
            n5BuffId = Math.max(0, n5BuffId - 1);
            currentNotification = "Buff ID: " + n5BuffId;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Activate Buff",
          isTogglable: false,
          toolTip: "PlayerBuffController.ActivateBuff selected id",
          method: () => n5ActivateBuff(n5BuffId),
        }),
        new MenuItem({
          buttonText: "Spam Buff",
          isTogglable: true,
          toolTip: "spams selected buff id",
          enableMethod: () => {
            n5BuffSpam = true;
          },
          disableMethod: () => {
            n5BuffSpam = false;
          },
          method: () => n5RunBuffSpam(),
        }),
        new MenuItem({
          buttonText: "Inf Fart",
          isTogglable: true,
          toolTip: "spams Farty/FartBoost and fart VFX",
          enableMethod: () => {
            n5InfFartEnabled = true;
            n5RunInfFart();
            currentNotification = "Inf Fart ON";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5InfFartEnabled = false;
            currentNotification = "Inf Fart OFF";
            notifactionResetTime = time + 2;
          },
          method: () => n5RunInfFart(),
        }),
        new MenuItem({
          buttonText: "Clear Buffs",
          isTogglable: false,
          toolTip: "PlayerBuffController.DeactivateAllBuffs",
          method: () => n5ClearBuffs(),
        }),
        new MenuItem({
          buttonText: "Buff Burst 0-30",
          isTogglable: false,
          toolTip: "try the first 31 buff ids",
          method: () => {
            let _c = 0;
            for (let _i = 0; _i <= 30; _i++) if (n5ActivateBuff(_i)) _c++;
            currentNotification = "Buff burst tried: " + _c;
            notifactionResetTime = time + 2;
          },
        }),
      ];
    }
    function n5BuildWorldFuckeryCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Open All Doors",
          isTogglable: false,
          toolTip: "AreaDoorsNetObject.OpenAllDoors",
          method: () => n5DoorOpenAll(),
        }),
        new MenuItem({
          buttonText: "Close All Doors",
          isTogglable: false,
          toolTip: "AreaDoorsNetObject.CloseAllDoors",
          method: () => n5DoorCloseAll(),
        }),
        new MenuItem({
          buttonText: "Thunder Strike",
          isTogglable: false,
          toolTip: "ThunderController Strike/RPC_Strike",
          method: () => n5ThunderStrike(),
        }),
        new MenuItem({
          buttonText: "Spam Thunder",
          isTogglable: true,
          toolTip: "spam thunder strikes",
          method: () => {
            if (time < n5WorldSpamDelay) return;
            n5WorldSpamDelay = time + 0.35;
            n5ThunderStrike();
          },
        }),
        new MenuItem({
          buttonText: "Toggle All Boomboxes",
          isTogglable: false,
          toolTip: "Boombox.RPC_ToggleOnOff on every boombox",
          method: () => n5ToggleAllBoomboxes(),
        }),
        new MenuItem({
          buttonText: "Pop All Balloons",
          isTogglable: false,
          toolTip: "pop every Balloon/BalloonPopable found",
          method: () => n5PopAllBalloons(),
        }),
        new MenuItem({
          buttonText: "Spawn Blackhole",
          isTogglable: false,
          toolTip: "spawn Blackhole prefab",
          method: () => {
            currentNotification = n5SpawnPrefabNameAtHand("Blackhole", 1.2)
              ? "Blackhole spawned"
              : "Blackhole failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Voxel Nuke",
          isTogglable: true,
          toolTip:
            "hold right grip and trigger to MineWorldRadius at aim point",
          method: () => n5RunVoxelNuke(),
        }),
        new MenuItem({
          buttonText: "Spawn CoreTeleporter",
          isTogglable: false,
          toolTip: "spawn CoreTeleporter prefab",
          method: () => {
            currentNotification = n5SpawnPrefabNameAtHand("CoreTeleporter", 1.2)
              ? "CoreTeleporter spawned"
              : "Core spawn failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Spaceship TP",
          isTogglable: false,
          toolTip: "spawn SpaceshipTeleporter prefab",
          method: () => {
            currentNotification = n5SpawnPrefabNameAtHand(
              "SpaceshipTeleporter",
              1.2,
            )
              ? "Spaceship teleporter spawned"
              : "Spaceship failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Network Lever",
          isTogglable: false,
          toolTip: "spawn NetworkedLever_SecretLeft",
          method: () => {
            currentNotification = n5SpawnPrefabNameAtHand(
              "NetworkedLever_SecretLeft",
              1.0,
            )
              ? "Lever spawned"
              : "Lever failed";
            notifactionResetTime = time + 2;
          },
        }),
      ];
    }
    function n5BuildMachineFuckeryCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Dupe Machine",
          isTogglable: false,
          toolTip: "spawn Duplicator/DuplicationMachine prefab",
          method: () => {
            currentNotification =
              n5SpawnPrefabNameAtHand("Duplicator", 1.2) ||
              n5SpawnPrefabNameAtHand("DuplicationMachine", 1.2)
                ? "Dupe machine spawned"
                : "dupe machine failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Juice Dupe Machine",
          isTogglable: false,
          toolTip: "max duck/chaos and keycard-enter dupe machines",
          method: () => n5DuplicationMachineMax(),
        }),
        new MenuItem({
          buttonText: "Spam Dupe Juice",
          isTogglable: true,
          toolTip: "keeps juicing dupe machines",
          method: () => {
            if (time < n5MachineSpamDelay) return;
            n5MachineSpamDelay = time + 0.5;
            n5DuplicationMachineMax();
          },
        }),
        new MenuItem({
          buttonText: "Spawn Claw Machine",
          isTogglable: false,
          toolTip: "spawn ClawMachineNetObject",
          method: () => {
            currentNotification = n5SpawnPrefabNameAtHand(
              "ClawMachineNetObject",
              1.2,
            )
              ? "Claw spawned"
              : "Claw failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Sell Machine",
          isTogglable: false,
          toolTip: "spawn and setup ItemSellingMachineController",
          method: () => n5SpawnSellingMachine(),
        }),
        new MenuItem({
          buttonText: "Sell Button Spam",
          isTogglable: false,
          toolTip: "press all ItemSellingMachineController buttons from dump",
          method: () => n5SellingMachineCall("button"),
        }),
        new MenuItem({
          buttonText: "Selling Spasm",
          isTogglable: true,
          toolTip: "keeps spamming selling buttons and sell animation",
          enableMethod: () => {
            n5SellingSpasm = true;
          },
          disableMethod: () => {
            n5SellingSpasm = false;
          },
          method: () => n5RunSellingSpasm(),
        }),
        new MenuItem({
          buttonText: "Sell Amount Spam 9999999999",
          isTogglable: true,
          toolTip: "forces huge sell value and spams selling/money RPC chunks",
          enableMethod: () => {
            n5SellAmountSpam = true;
            n5RunSellAmountSpam(true);
          },
          disableMethod: () => {
            n5SellAmountSpam = false;
            currentNotification = "Sell amount spam OFF";
            notifactionResetTime = time + 2;
          },
          method: () => n5RunSellAmountSpam(false),
        }),
        new MenuItem({
          buttonText: "Sell Start",
          isTogglable: false,
          toolTip: "RPC_StartItemSelling on all selling machines",
          method: () => n5SellingMachineCall("sell"),
        }),
        new MenuItem({
          buttonText: "Sell Explode",
          isTogglable: false,
          toolTip: "RPC_ExplodeMachine on all selling machines",
          method: () => n5SellingMachineCall("explode"),
        }),
        new MenuItem({
          buttonText: "Sell Recover",
          isTogglable: false,
          toolTip: "RPC_RecoverExplosion on all selling machines",
          method: () => n5SellingMachineCall("recover"),
        }),
        new MenuItem({
          buttonText: "Flush Toilets",
          isTogglable: false,
          toolTip: "ToiletPullChain.FlushToilet from dump",
          method: () => n5FlushToilets(true),
        }),
        new MenuItem({
          buttonText: "Spam Toilets",
          isTogglable: true,
          toolTip: "repeatedly flush every live toilet chain",
          enableMethod: () => {
            n5ToiletSpam = true;
          },
          disableMethod: () => {
            n5ToiletSpam = false;
          },
          method: () => n5RunToiletSpam(),
        }),
        new MenuItem({
          buttonText: "Toilet Paper Burst",
          isTogglable: false,
          toolTip: "spawn toilet paper, mega rolls, empty rolls, plungers",
          method: () => n5ToiletPaperBurst(),
        }),
        new MenuItem({
          buttonText: "Spawn Money Gun",
          isTogglable: false,
          toolTip: "spawn item_moneygun",
          method: () => {
            const _p = n5RightHandPose(0.8);
            currentNotification = n5SpawnItemAt("item_moneygun", _p.pos, _p.rot)
              ? "Money gun spawned"
              : "Money gun failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Scanner",
          isTogglable: false,
          toolTip: "spawn item_prop_scanner",
          method: () => {
            const _p = n5RightHandPose(0.8);
            currentNotification = n5SpawnItemAt(
              "item_prop_scanner",
              _p.pos,
              _p.rot,
            )
              ? "Scanner spawned"
              : "Scanner failed";
            notifactionResetTime = time + 2;
          },
        }),
      ];
    }
    function n5SpawnN5TuffHellOres() {
      try {
        const _pose = n5SelfSpawnPose(1.35, 0.65),
          _base = [
            n5VecNum(_pose.pos, 0, "x") - n5VecNum(_pose.right, 0, "x") * 2.05,
            n5VecNum(_pose.pos, 1, "y") - n5VecNum(_pose.right, 1, "y") * 2.05,
            n5VecNum(_pose.pos, 2, "z") - n5VecNum(_pose.right, 2, "z") * 2.05,
          ],
          _hf = _pose.forward,
          _hr = _pose.right,
          _hu = _pose.up;
        const _panel = createPrimitiveGameObject(
          _base,
          _pose.rot,
          [2.6, 0.55, 0.03],
          3,
          [0.04, 0.01, 0.01, 0.72],
          null,
          true,
        );
        createUITextObject(
          _panel,
          "n5 is tuff",
          [1, 0.18, 0.08, 1],
          [0, 0, 0.02],
          [2.25, 0.42, 0.01],
        );
        const _font = {
          N: ["10001", "11001", "10101", "10011", "10001"],
          "5": ["11111", "10000", "11110", "00001", "11110"],
          I: ["111", "010", "010", "010", "111"],
          S: ["1111", "1000", "1110", "0001", "1110"],
          T: ["11111", "00100", "00100", "00100", "00100"],
          U: ["1001", "1001", "1001", "1001", "1111"],
          F: ["1111", "1000", "1110", "1000", "1000"],
        };
        const _text = "N5 IS TUFF";
        const _xStep = 0.095,
          _yStep = 0.082,
          _letterGap = 2,
          _spaceGap = 5;
        let _x = 0,
          _spawned = 0;
        for (const _ch of _text) {
          if (_ch === " ") {
            _x += _spaceGap;
            continue;
          }
          const _rows = _font[_ch] || [];
          const _w = _rows[0] ? _rows[0].length : 0;
          for (let _y = 0; _y < _rows.length; _y++) {
            for (let _c = 0; _c < _rows[_y].length; _c++) {
              if (_rows[_y][_c] !== "1") continue;
              const _xx = (_x + _c) * _xStep;
              const _yy = -_y * _yStep;
              const _pos = [
                _base[0] +
                  n5VecNum(_hr, 0, "x") * _xx +
                  n5VecNum(_hu, 0, "x") * _yy +
                  n5VecNum(_hf, 0, "x") * 0.08,
                _base[1] +
                  n5VecNum(_hr, 1, "y") * _xx +
                  n5VecNum(_hu, 1, "y") * _yy +
                  n5VecNum(_hf, 1, "y") * 0.08,
                _base[2] +
                  n5VecNum(_hr, 2, "z") * _xx +
                  n5VecNum(_hu, 2, "z") * _yy +
                  n5VecNum(_hf, 2, "z") * 0.08,
              ];
              if (n5SpawnHellOreAt(_pos, identityRotation)) _spawned++;
            }
          }
          _x += _w + _letterGap;
        }
        currentNotification = "n5 is tuff hell ores: " + _spawned;
        notifactionResetTime = time + 3;
      } catch (_e) {
        currentNotification = "hell ore text failed";
        notifactionResetTime = time + 2;
        console.error("[N5 HellOreText]", _e);
      }
    }
    function n5SpawnHellOreRing() {
      try {
        const _pose = n5SelfSpawnPose(0.85, 0.35);
        const _center = _pose.pos;
        let _count = 0;
        for (let _i = 0; _i < 24; _i++) {
          const _a = (Math.PI * 2 * _i) / 24;
          const _pos = [
            n5VecNum(_center, 0, "x") + Math.cos(_a) * 0.9,
            n5VecNum(_center, 1, "y") + Math.sin(_a) * 0.9,
            n5VecNum(_center, 2, "z"),
          ];
          if (n5SpawnHellOreAt(_pos, identityRotation)) _count++;
        }
        currentNotification = "Hell ore ring: " + _count;
        notifactionResetTime = time + 3;
      } catch (_e) {
        currentNotification = "hell ore ring failed";
        notifactionResetTime = time + 2;
        console.error("[N5 HellOreRing]", _e);
      }
    }
    function n5SpawnMimiLavaText() {
      try {
        const _pose = n5SelfSpawnPose(1.55, 0.75),
          _base = [
            n5VecNum(_pose.pos, 0, "x") - n5VecNum(_pose.right, 0, "x") * 2.3,
            n5VecNum(_pose.pos, 1, "y") - n5VecNum(_pose.right, 1, "y") * 2.3,
            n5VecNum(_pose.pos, 2, "z") - n5VecNum(_pose.right, 2, "z") * 2.3,
          ],
          _hf = _pose.forward,
          _hr = _pose.right,
          _hu = _pose.up;
        try {
          const _ft = acImage.class("AnimalCompany.FloatingTextManager");
          _ft
            .method("Show", 6)
            .invoke(
              Il2Cpp.string("I love MIMI"),
              0.65,
              [1, 0.22, 0.02, 1],
              _base,
              5.0,
              0,
            );
        } catch (_) {}
        const _font = {
          I: ["111", "010", "010", "010", "111"],
          L: ["1000", "1000", "1000", "1000", "1111"],
          O: ["1110", "1001", "1001", "1001", "1110"],
          V: ["10001", "10001", "01010", "01010", "00100"],
          E: ["1111", "1000", "1110", "1000", "1111"],
          M: ["10001", "11011", "10101", "10001", "10001"],
        };
        const _text = "I LOVE MIMI";
        const _xStep = 0.095,
          _yStep = 0.082,
          _letterGap = 2,
          _spaceGap = 5;
        let _x = 0,
          _spawned = 0;
        for (const _ch of _text) {
          if (_ch === " ") {
            _x += _spaceGap;
            continue;
          }
          const _rows = _font[_ch] || [];
          const _w = _rows[0] ? _rows[0].length : 0;
          for (let _y = 0; _y < _rows.length; _y++) {
            for (let _c = 0; _c < _rows[_y].length; _c++) {
              if (_rows[_y][_c] !== "1") continue;
              const _xx = (_x + _c) * _xStep;
              const _yy = -_y * _yStep;
              const _pos = [
                _base[0] +
                  n5VecNum(_hr, 0, "x") * _xx +
                  n5VecNum(_hu, 0, "x") * _yy +
                  n5VecNum(_hf, 0, "x") * 0.08,
                _base[1] +
                  n5VecNum(_hr, 1, "y") * _xx +
                  n5VecNum(_hu, 1, "y") * _yy +
                  n5VecNum(_hf, 1, "y") * 0.08,
                _base[2] +
                  n5VecNum(_hr, 2, "z") * _xx +
                  n5VecNum(_hu, 2, "z") * _yy +
                  n5VecNum(_hf, 2, "z") * 0.08,
              ];
              if (n5SpawnHellOreAt(_pos, identityRotation)) _spawned++;
            }
          }
          _x += _w + _letterGap;
        }
        currentNotification = "I love MIMI lava text: " + _spawned;
        notifactionResetTime = time + 3;
      } catch (_e) {
        currentNotification = "MIMI lava text failed";
        notifactionResetTime = time + 2;
        console.error("[N5 MimiLavaText]", _e);
      }
    }
    function n5SpawnSheldonLavaText() {
      try {
        const _pose = n5SelfSpawnPose(1.75, 1.05),
          _base = [
            n5VecNum(_pose.pos, 0, "x") - n5VecNum(_pose.right, 0, "x") * 3.55,
            n5VecNum(_pose.pos, 1, "y") - n5VecNum(_pose.right, 1, "y") * 3.55,
            n5VecNum(_pose.pos, 2, "z") - n5VecNum(_pose.right, 2, "z") * 3.55,
          ],
          _hf = _pose.forward,
          _hr = _pose.right,
          _hu = _pose.up;
        try {
          const _ft = acImage.class("AnimalCompany.FloatingTextManager");
          _ft
            .method("Show", 6)
            .invoke(
              Il2Cpp.string("Sheldon Lee Cooper You Dawg"),
              0.65,
              [1, 0.22, 0.02, 1],
              _base,
              5.0,
              0,
            );
        } catch (_) {}
        const _font = {
          A: ["01110", "10001", "11111", "10001", "10001"],
          C: ["01111", "10000", "10000", "10000", "01111"],
          D: ["11110", "10001", "10001", "10001", "11110"],
          E: ["11111", "10000", "11110", "10000", "11111"],
          G: ["01111", "10000", "10111", "10001", "01111"],
          H: ["10001", "10001", "11111", "10001", "10001"],
          L: ["10000", "10000", "10000", "10000", "11111"],
          N: ["10001", "11001", "10101", "10011", "10001"],
          O: ["01110", "10001", "10001", "10001", "01110"],
          P: ["11110", "10001", "11110", "10000", "10000"],
          R: ["11110", "10001", "11110", "10010", "10001"],
          S: ["01111", "10000", "01110", "00001", "11110"],
          U: ["10001", "10001", "10001", "10001", "01110"],
          W: ["10001", "10001", "10101", "11011", "10001"],
          Y: ["10001", "01010", "00100", "00100", "00100"],
        };
        const _text = "SHELDON LEE COOPER\nYOU DAWG";
        const _xStep = 0.066,
          _yStep = 0.074,
          _letterGap = 2,
          _spaceGap = 5,
          _lineGap = 7;
        let _x = 0,
          _line = 0,
          _spawned = 0;
        for (const _ch of _text) {
          if (_ch === "\n") {
            _line++;
            _x = 0;
            continue;
          }
          if (_ch === " ") {
            _x += _spaceGap;
            continue;
          }
          const _rows = _font[_ch] || [];
          const _w = _rows[0] ? _rows[0].length : 0;
          for (let _y = 0; _y < _rows.length; _y++) {
            for (let _c = 0; _c < _rows[_y].length; _c++) {
              if (_rows[_y][_c] !== "1") continue;
              const _xx = (_x + _c) * _xStep;
              const _yy = -(_line * _lineGap + _y) * _yStep;
              const _pos = [
                _base[0] +
                  n5VecNum(_hr, 0, "x") * _xx +
                  n5VecNum(_hu, 0, "x") * _yy +
                  n5VecNum(_hf, 0, "x") * 0.08,
                _base[1] +
                  n5VecNum(_hr, 1, "y") * _xx +
                  n5VecNum(_hu, 1, "y") * _yy +
                  n5VecNum(_hf, 1, "y") * 0.08,
                _base[2] +
                  n5VecNum(_hr, 2, "z") * _xx +
                  n5VecNum(_hu, 2, "z") * _yy +
                  n5VecNum(_hf, 2, "z") * 0.08,
              ];
              if (n5SpawnHellOreAt(_pos, identityRotation)) _spawned++;
            }
          }
          _x += _w + _letterGap;
        }
        currentNotification = "Sheldon lava text: " + _spawned;
        notifactionResetTime = time + 3;
      } catch (_e) {
        currentNotification = "Sheldon lava text failed";
        notifactionResetTime = time + 2;
        console.error("[N5 SheldonLavaText]", _e);
      }
    }
    function n5SpawnDumpMobPack() {
      try {
        const _hand =
          gorillaLocomotionInstance.field("rightHandTransform").value ||
          rightHandTransform;
        const _hp = _hand.method("get_position").invoke();
        const _hf = _hand.method("get_forward").invoke();
        const _valid = [
          "Angler",
          "Banshee",
          "Bomb",
          "Chicken",
          "FakeGorilla",
          "BigHead",
          "Spider",
          "Lanky",
          "Blob",
          "Cutie",
          "Mimic",
          "RobotDog",
          "Shadow",
          "BigShark",
          "EdenZombie",
          "Skinwalker",
          "ArmstrongSpace",
          "Smiley",
        ];
        let _count = 0;
        for (let _i = 0; _i < 8; _i++) {
          const _a = (Math.PI * 2 * _i) / 8;
          const _pos = [
            (_hp[0] || 0) + (_hf[0] || 0) * 2.0 + Math.cos(_a) * 1.25,
            (_hp[1] || 0) + 0.1,
            (_hp[2] || 0) + (_hf[2] || 0) * 2.0 + Math.sin(_a) * 1.25,
          ];
          const _id = _valid[Math.floor(Math.random() * _valid.length)];
          if (n5SpawnMobAt(_id, _pos, identityRotation)) _count++;
        }
        currentNotification = "Dump mob pack: " + _count + "/8";
        notifactionResetTime = time + 3;
      } catch (_e) {
        currentNotification = "mob pack failed";
        notifactionResetTime = time + 2;
        console.error("[N5 DumpMobPack]", _e);
      }
    }
    function n5SpawnPissBurstAtTransform(_tf, _count = 1) {
      try {
        if (!_tf) return 0;
        const _pos = _tf.method("get_position").invoke();
        const _fwd = _tf.method("get_forward").invoke();
        const _rot = _tf.method("get_rotation").invoke();
        let _made = 0;
        for (let _i = 0; _i < _count; _i++) {
          const _sp = [
            (_pos[0] || 0) +
              (_fwd[0] || 0) * 0.16 +
              (Math.random() - 0.5) * 0.05,
            (_pos[1] || 0) - 0.25 + (Math.random() - 0.5) * 0.03,
            (_pos[2] || 0) +
              (_fwd[2] || 0) * 0.16 +
              (Math.random() - 0.5) * 0.05,
          ];
          const _obj =
            n5SpawnItemObjectAt("item_goop", _sp, _rot) ||
            n5SpawnItemSyncAt("item_goop", _sp, _rot);
          if (_obj && _obj !== true) {
            n5ApplyItemVisualConfig(_obj, 56, 100, 0);
            n5SetObjectVelocity(_obj, _fwd, 5.2);
            try {
              UnityObjectCls.method("Destroy", 2).invoke(
                _obj.method("get_gameObject").invoke(),
                2.2,
              );
            } catch (_) {}
            _made++;
          } else if (n5SpawnItemAt("item_goop", _sp, _rot)) _made++;
        }
        return _made;
      } catch (_e) {
        console.error("[N5 PissBurst]", _e);
        return 0;
      }
    }
    function n5RunPissMod() {
      if (time < n5GoopSpamDelay) return;
      n5GoopSpamDelay = time + 0.055;
      try {
        let _tf = null;
        try {
          _tf = getTransform(bodyCollider);
        } catch (_) {}
        if (!_tf || (_tf.isNull && _tf.isNull())) _tf = rightHandTransform;
        n5SpawnPissBurstAtTransform(_tf, 1);
      } catch (_e) {
        console.error("[N5 PissMod]", _e);
      }
    }
    function n5RunPissGun() {
      if (!rightGrab || !rightTrigger || time < n5GoopSpamDelay) return;
      n5GoopSpamDelay = time + 0.055;
      try {
        const _g = getGunPointerResult(),
          _p = _g.point;
        if (!_p) return;
        const _obj =
          n5SpawnItemObjectAt("item_goop", _p, identityRotation) ||
          n5SpawnItemSyncAt("item_goop", _p, identityRotation);
        if (_obj && _obj !== true) n5ApplyItemVisualConfig(_obj, 56, 100, 0);
        else n5SpawnItemAt("item_goop", _p, identityRotation);
      } catch (_e) {
        console.error("[N5 PissGun]", _e);
      }
    }
    function n5BuildGooningCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Spawn n5 is tuff",
          isTogglable: false,
          toolTip: "spawn n5 is tuff text with hell ores",
          method: () => {
            n5SpawnN5TuffHellOres();
          },
        }),
        new MenuItem({
          buttonText: "Hell Ore Ring",
          isTogglable: false,
          toolTip: "spawn a ring of hell ores",
          method: () => {
            n5SpawnHellOreRing();
          },
        }),
        new MenuItem({
          buttonText: "I love MIMI Lava",
          isTogglable: false,
          toolTip: "spawn I love MIMI lava text",
          method: () => {
            n5SpawnMimiLavaText();
          },
        }),
        new MenuItem({
          buttonText: "Sheldon Lava",
          isTogglable: false,
          toolTip: "spawn Sheldon Lee Cooper You Dawg lava text",
          method: () => {
            n5SpawnSheldonLavaText();
          },
        }),
        new MenuItem({
          buttonText: "Dump Mob Pack",
          isTogglable: false,
          toolTip: "spawn random valid mobs from the dumped MobID enum",
          method: () => {
            n5SpawnDumpMobPack();
          },
        }),
        new MenuItem({
          buttonText: "Goop Spam",
          isTogglable: true,
          toolTip: "hold right grip to spam goop from right hand",
          method: () => {
            if (!rightGrab) return;
            try {
              getGunPointerResult();
              const _rh =
                gorillaLocomotionInstance.field("rightHandTransform").value ||
                rightHandTransform;
              const _hp = _rh.method("get_position").invoke();
              const _hf = _rh.method("get_forward").invoke();
              const _hr = _rh.method("get_rotation").invoke();
              const _pos = [
                (_hp[0] || 0) + (_hf[0] || 0) * 0.22,
                (_hp[1] || 0) + (_hf[1] || 0) * 0.22,
                (_hp[2] || 0) + (_hf[2] || 0) * 0.22,
              ];
              n5SpawnItemAt("item_goop", _pos, _hr);
            } catch (_e) {
              console.error("[N5 GoopSpam]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Piss Mod",
          isTogglable: true,
          toolTip: "yellow goop stream from body",
          enableMethod: () => {
            n5GoopSpamDelay = 0;
            currentNotification = "Piss Mod ON";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            currentNotification = "Piss Mod OFF";
            notifactionResetTime = time + 2;
          },
          method: () => {
            n5RunPissMod();
          },
        }),
        new MenuItem({
          buttonText: "Piss Gun",
          isTogglable: true,
          toolTip:
            "hold right grip and trigger to spawn yellow goop at pointer",
          method: () => {
            n5RunPissGun();
          },
        }),
        new MenuItem({
          buttonText: "Cover All",
          isTogglable: false,
          toolTip: "cover all players in goopfish",
          method: () => {
            try {
              let _count = 0;
              const _vals = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke();
              const _en = _vals.method("GetEnumerator").invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (!_pl || _pl.handle.isNull()) continue;
                const _p = getTransform(_pl).method("get_position").invoke();
                const _spots = [
                  [0, 0.2, 0],
                  [0.35, 0.6, 0],
                  [-0.35, 0.6, 0],
                  [0, 1.0, 0.35],
                  [0, 1.0, -0.35],
                  [0, 1.4, 0],
                ];
                for (const _o of _spots) {
                  const _pos = [
                    (_p[0] || 0) + _o[0],
                    (_p[1] || 0) + _o[1],
                    (_p[2] || 0) + _o[2],
                  ];
                  if (n5SpawnItemAt("item_goopfish", _pos, identityRotation))
                    _count++;
                }
              }
              currentNotification = "Covered with goopfish: " + _count;
              notifactionResetTime = time + 3;
            } catch (_e) {
              currentNotification = "Cover All failed";
              notifactionResetTime = time + 2;
              console.error("[N5 CoverAll]", _e);
            }
          },
        }),
      ];
    }
    function n5BuildUsersCategory() {
      const _sel = () => n5SelectedUser();
      const _label = () => {
        const _u = _sel();
        if (!_u) return "User: none";
        return "User: " + n5GetPlayerDisplayName(_u);
      };
      const _act = (_name, _fn) => {
        const _u = _sel();
        if (!_u) {
          currentNotification = "No user selected";
          notifactionResetTime = time + 2;
          return;
        }
        const _ok = _fn(_u);
        currentNotification = _name + (_ok ? " ok" : " failed");
        notifactionResetTime = time + 2;
      };
      return [
        new MenuItem({
          buttonText: "<< Back to Other Players",
          isTogglable: false,
          toolTip: "back to other players hub",
          method: () => {
            currentCategory = 42;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: _label(),
          isTogglable: false,
          toolTip: "selected user",
          method: () => {
            currentNotification = _label();
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "User +",
          isTogglable: false,
          toolTip: "next user",
          method: () => {
            const _n = n5AllNetPlayers().length || 1;
            n5UserIndex = (n5UserIndex + 1) % _n;
            currentNotification = _label();
            notifactionResetTime = time + 2;
            menuCategories[33] = n5BuildUsersCategory();
            _n5MenuLastCat = -1;
          },
        }),
        new MenuItem({
          buttonText: "User -",
          isTogglable: false,
          toolTip: "previous user",
          method: () => {
            const _n = n5AllNetPlayers().length || 1;
            n5UserIndex = (n5UserIndex - 1 + _n) % _n;
            currentNotification = _label();
            notifactionResetTime = time + 2;
            menuCategories[33] = n5BuildUsersCategory();
            _n5MenuLastCat = -1;
          },
        }),
        new MenuItem({
          buttonText: "Refresh Users",
          isTogglable: false,
          toolTip: "reload live players list",
          method: () => {
            n5RefreshUsersCategory();
          },
        }),
        new MenuItem({
          buttonText: "Save Lobby Users",
          isTogglable: false,
          toolTip:
            "write lobby player IDs, names, offline flag, whitelist state to json",
          method: () => n5SaveLobbyUsers(),
        }),
        new MenuItem({
          buttonText: "TP Selected To Me",
          isTogglable: false,
          toolTip: "teleport selected user to you",
          method: () =>
            _act("TP to me", (_u) => n5TeleportSelectedUserToMe(_u)),
        }),
        new MenuItem({
          buttonText: "TP Me To Selected",
          isTogglable: false,
          toolTip: "teleport yourself to selected user",
          method: () =>
            _act("TP to user", (_u) => n5TeleportMeToSelectedUser(_u)),
        }),
        new MenuItem({
          buttonText: "TP Selected To Map",
          isTogglable: false,
          toolTip: "teleport selected user to the selected Map ID",
          method: () =>
            _act("TP to " + mapIDs[n5MapIndex].name, (_u) =>
              n5TeleportUserToMap(_u, mapIDs[n5MapIndex].id),
            ),
        }),
        new MenuItem({
          buttonText: "TP Everyone To Map",
          isTogglable: false,
          toolTip: "teleport every remote user to the selected Map ID",
          method: () => {
            const _map = mapIDs[n5MapIndex],
              _pos = n5FindTeleTargetPosition(_map.id);
            if (!_pos) {
              currentNotification = "Map target not in scene";
              notifactionResetTime = time + 2;
              return;
            }
            const _c = n5ForUsers(n5AllRemoteUsers(), (_u) =>
              n5TeleportUserToPosition(_u, _pos),
            );
            currentNotification = "TP everyone to " + _map.name + ": " + _c;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Kick Selected",
          isTogglable: false,
          toolTip: "send kick to selected user",
          method: () => _act("Kick", (_u) => n5KickPlayerObject(_u)),
        }),
        new MenuItem({
          buttonText: "Kick Everyone Once",
          isTogglable: false,
          toolTip: "send kick to every non-local user once",
          method: () => {
            const _c = n5KickAllUsers(true);
            currentNotification = "Kick everyone once: " + _c;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Auto Kick All",
          isTogglable: true,
          toolTip: "keeps spamming the same kick method on everyone except you",
          enableMethod: () => {
            n5AutoKickAllDelay = 0;
            currentNotification = "Auto kick all ON";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            currentNotification = "Auto kick all OFF";
            notifactionResetTime = time + 2;
          },
          method: () => n5KickAllUsers(false),
        }),
        new MenuItem({
          buttonText: "Whitelist Selected",
          isTogglable: false,
          toolTip: "add selected user to whitelist",
          method: () => _act("Whitelist", (_u) => n5WhitelistAdd(_u)),
        }),
        new MenuItem({
          buttonText: "Unwhitelist Selected",
          isTogglable: false,
          toolTip: "remove selected user from whitelist",
          method: () => _act("Unwhitelist", (_u) => n5WhitelistRemove(_u)),
        }),
        new MenuItem({
          buttonText: "Buff ID +",
          isTogglable: false,
          toolTip: "next buff id",
          method: () => {
            n5BuffId = (n5BuffId + 1) & 32767;
            currentNotification = "Buff ID: " + n5BuffId;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Buff ID -",
          isTogglable: false,
          toolTip: "previous buff id",
          method: () => {
            n5BuffId = Math.max(0, n5BuffId - 1);
            currentNotification = "Buff ID: " + n5BuffId;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Buff Selected",
          isTogglable: false,
          toolTip: "try selected buff on selected user",
          method: () =>
            _act("Buff " + n5BuffId, (_u) => n5ApplyBuffToPlayer(_u, n5BuffId)),
        }),
        new MenuItem({
          buttonText: "Buff Everyone",
          isTogglable: false,
          toolTip: "try selected buff id on everyone except you",
          method: () => {
            const _c = n5ForUsers(n5AllRemoteUsers(), (_u) =>
              n5ApplyBuffToPlayer(_u, n5BuffId),
            );
            currentNotification = "Buff everyone " + n5BuffId + ": " + _c;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Shake Screen Selected",
          isTogglable: false,
          toolTip: "screen shake selected user",
          method: () => _act("Shake screen", (_u) => n5ShakePlayerScreen(_u)),
        }),
        new MenuItem({
          buttonText: "Shake Screen Everyone",
          isTogglable: false,
          toolTip: "screen shake everyone except you",
          method: () => {
            const _c = n5ForUsers(n5AllRemoteUsers(), (_u) =>
              n5ShakePlayerScreen(_u),
            );
            currentNotification = "Shake everyone: " + _c;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Stun Selected",
          isTogglable: false,
          toolTip: "stun selected user",
          method: () => _act("Stun", (_u) => n5StunUser(_u)),
        }),
        new MenuItem({
          buttonText: "Stun Everyone",
          isTogglable: false,
          toolTip: "stun everyone except you",
          method: () => {
            const _c = n5ForUsers(n5AllRemoteUsers(), (_u) => n5StunUser(_u));
            currentNotification = "Stun everyone: " + _c;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Size + Selected",
          isTogglable: false,
          toolTip: "make selected user larger locally",
          method: () => _act("Size +", (_u) => n5SetPlayerScale(_u, 0.15)),
        }),
        new MenuItem({
          buttonText: "Size - Selected",
          isTogglable: false,
          toolTip: "make selected user smaller locally",
          method: () => _act("Size -", (_u) => n5SetPlayerScale(_u, -0.15)),
        }),
        new MenuItem({
          buttonText: "Grow Selected",
          isTogglable: false,
          toolTip: "set selected user big",
          method: () => _act("Grow", (_u) => n5SetPlayerScaleExact(_u, 2.5)),
        }),
        new MenuItem({
          buttonText: "Small Selected",
          isTogglable: false,
          toolTip: "set selected user tiny",
          method: () => _act("Small", (_u) => n5SetPlayerScaleExact(_u, 0.35)),
        }),
        new MenuItem({
          buttonText: "Reset Size Selected",
          isTogglable: false,
          toolTip: "reset selected user size",
          method: () =>
            _act("Reset size", (_u) => n5SetPlayerScaleExact(_u, 1.0)),
        }),
        new MenuItem({
          buttonText: "Grow Everyone",
          isTogglable: false,
          toolTip: "set everyone except you big",
          method: () => {
            const _c = n5ForUsers(n5AllRemoteUsers(), (_u) =>
              n5SetPlayerScaleExact(_u, 2.5),
            );
            currentNotification = "Grow everyone: " + _c;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Small Everyone",
          isTogglable: false,
          toolTip: "set everyone except you tiny",
          method: () => {
            const _c = n5ForUsers(n5AllRemoteUsers(), (_u) =>
              n5SetPlayerScaleExact(_u, 0.35),
            );
            currentNotification = "Small everyone: " + _c;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Reset Size Everyone",
          isTogglable: false,
          toolTip: "reset everyone except you size",
          method: () => {
            const _c = n5ForUsers(n5AllRemoteUsers(), (_u) =>
              n5SetPlayerScaleExact(_u, 1.0),
            );
            currentNotification = "Reset everyone: " + _c;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Mute Selected",
          isTogglable: false,
          toolTip: "set selected player voice volume to zero",
          method: () => _act("Mute", (_u) => n5SetVoiceVolumeForRig(_u, 0.0)),
        }),
        new MenuItem({
          buttonText: "Loud Selected",
          isTogglable: false,
          toolTip: "set selected player voice volume high",
          method: () => _act("Loud", (_u) => n5SetVoiceVolumeForRig(_u, 2.0)),
        }),
        new MenuItem({
          buttonText: "Mute Everyone",
          isTogglable: false,
          toolTip: "set everyone except you voice volume to zero",
          method: () => {
            const _c = n5ForUsers(n5AllRemoteUsers(), (_u) =>
              n5SetVoiceVolumeForRig(_u, 0.0),
            );
            currentNotification = "Mute everyone: " + _c;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Loud Everyone",
          isTogglable: false,
          toolTip: "set everyone except you voice volume high",
          method: () => {
            const _c = n5ForUsers(n5AllRemoteUsers(), (_u) =>
              n5SetVoiceVolumeForRig(_u, 2.0),
            );
            currentNotification = "Loud everyone: " + _c;
            notifactionResetTime = time + 2;
          },
        }),
      ];
    }

    function n5SelectIdValue(_kind, _value) {
      try {
        if (_kind === "item") {
          const _idx = itemIDs.indexOf(_value);
          if (_idx >= 0) itemIndex = _idx;
          currentNotification = "ITEM: " + _value;
        } else if (_kind === "mob") {
          const _idx = mobIDs.indexOf(_value);
          if (_idx >= 0) mobIndex = _idx;
          currentNotification = "MOB: " + _value;
        } else if (_kind === "prefab") {
          const _idx = prefabList.indexOf(_value);
          if (_idx >= 0) prefabIndex = _idx;
          currentNotification = "PREFAB: " + _value;
        } else if (_kind === "map") {
          const _idx = mapIDs.findIndex((_map) => _map.id === _value.id);
          if (_idx >= 0) n5MapIndex = _idx;
          currentNotification = "MAP: " + _value.name + " (" + _value.id + ")";
        }
        notifactionResetTime = time + 3;
      } catch (_e) {
        console.error("[IDs 2.0 select]", _e);
      }
    }
    function n5IdButton(_kind, _value) {
      const _label =
        _kind === "map" ? _value.name + " [" + _value.id + "]" : _value;
      return new MenuItem({
        buttonText: _label,
        isTogglable: false,
        toolTip: "select " + _kind + " id: " + _label,
        method: () => n5SelectIdValue(_kind, _value),
      });
    }
    function n5BuildLocalPlayerCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back",
          isTogglable: false,
          toolTip: "back to main",
          method: () => {
            currentCategory = 0;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Settings",
          isTogglable: false,
          toolTip: "menu config, ids, themes, scale, clones, bag duping",
          method: () => {
            currentCategory = 2;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Movement",
          isTogglable: false,
          toolTip: "fly, joystick fly, hold-grip platforms",
          method: () => {
            currentCategory = 3;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Player",
          isTogglable: false,
          toolTip: "godmode, revive, invisibility, orbits, item magnet",
          method: () => {
            currentCategory = 4;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Cosmetics",
          isTogglable: false,
          toolTip: "held item hue, saturation, scale, jelly, value",
          method: () => {
            currentCategory = 6;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Utility",
          isTogglable: false,
          toolTip: "teleports and misc utilities",
          method: () => {
            currentCategory = 9;
            currentPage = 0;
          },
        }),
      ];
    }
    function n5BuildOtherPlayersHubCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back",
          isTogglable: false,
          toolTip: "back to main",
          method: () => {
            currentCategory = 0;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Other Players",
          isTogglable: false,
          toolTip: "guns and effects vs other players",
          method: () => {
            currentCategory = 5;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Users",
          isTogglable: false,
          toolTip: "select user, kick, buff, teleport",
          method: () => {
            menuCategories[33] = n5BuildUsersCategory();
            _iterMob = new Map();
            menuCategories
              .flat()
              .forEach((_b) => _iterMob.set(_b.buttonText, _b));
            currentCategory = 33;
            currentPage = 0;
            _n5MenuLastCat = -1;
          },
        }),
        new MenuItem({
          buttonText: "Whitelisting",
          isTogglable: false,
          toolTip: "whitelist gun and hand powers",
          method: () => {
            currentCategory = 23;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Tab",
          isTogglable: false,
          toolTip: "manage whitelist list",
          method: () => {
            currentCategory = 17;
            currentPage = 0;
          },
        }),
      ];
    }
    function n5BuildCombatHubCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back",
          isTogglable: false,
          toolTip: "back to main",
          method: () => {
            currentCategory = 0;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Weapons",
          isTogglable: false,
          toolTip: "gun mods and stat tweaks",
          method: () => {
            currentCategory = 8;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Guns",
          isTogglable: false,
          toolTip: "spawn and aim guns",
          method: () => {
            currentCategory = 15;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Launchers",
          isTogglable: false,
          toolTip: "item, rocket, case, card, timebomb launchers",
          method: () => {
            currentCategory = 34;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Spawning",
          isTogglable: false,
          toolTip: "spawn items, mobs, and prefabs",
          method: () => {
            currentCategory = 7;
            currentPage = 0;
          },
        }),
      ];
    }
    function n5BuildContentHubCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back",
          isTogglable: false,
          toolTip: "back to main",
          method: () => {
            currentCategory = 0;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Prefabs",
          isTogglable: false,
          toolTip: "prefab spawning and options",
          method: () => {
            currentCategory = 11;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "IDs",
          isTogglable: false,
          toolTip: "cycle item, mob, prefab, vfx ids",
          method: () => {
            currentCategory = 12;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "ids 2.0",
          isTogglable: false,
          toolTip: "full item, mob, prefab, map id picker",
          method: () => {
            currentCategory = 37;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Blueprints",
          isTogglable: false,
          toolTip: "spawn saved blueprint jsons",
          method: () => {
            menuCategories[25] = n5BuildBlueprintCategory();
            _iterMob = new Map();
            menuCategories
              .flat()
              .forEach((_b) => _iterMob.set(_b.buttonText, _b));
            currentCategory = 25;
            currentPage = 0;
            _n5MenuLastCat = -1;
          },
        }),
      ];
    }
    function n5BuildToolsHubCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back",
          isTogglable: false,
          toolTip: "back to main",
          method: () => {
            currentCategory = 0;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Presets",
          isTogglable: false,
          toolTip: "save and load preset slots",
          method: () => {
            currentCategory = 13;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Soundboard",
          isTogglable: false,
          toolTip: "play sounds and audio ids",
          method: () => {
            currentCategory = 14;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "RPC Blocks",
          isTogglable: false,
          toolTip: "block incoming grief rpcs",
          method: () => {
            currentCategory = 18;
            currentPage = 0;
          },
        }),
      ];
    }
    function n5BuildChaosHubCategory() {
      return [
        new MenuItem({
          buttonText: "<< Back",
          isTogglable: false,
          toolTip: "back to main",
          method: () => {
            currentCategory = 0;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Quiver Fuckery",
          isTogglable: false,
          toolTip: "quiver and backpack chaos",
          method: () => {
            currentCategory = 20;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Orbit Fuckery",
          isTogglable: false,
          toolTip: "prefab orbits and spawning",
          method: () => {
            currentCategory = 21;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Larping",
          isTogglable: false,
          toolTip: "become prefabs with no collisions",
          method: () => {
            currentCategory = 22;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Mommy Milker",
          isTogglable: false,
          toolTip: "mom boss tools",
          method: () => {
            currentCategory = 24;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Gooning",
          isTogglable: false,
          toolTip: "goop spam tools",
          method: () => {
            currentCategory = 26;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Arena Fuckery",
          isTogglable: false,
          toolTip: "arena game, ores, spam tools",
          method: () => {
            currentCategory = 27;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Rig Shit",
          isTogglable: false,
          toolTip: "rig duping and rig spasm",
          method: () => {
            currentCategory = 28;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Buff Fuckery",
          isTogglable: false,
          toolTip: "player buff tools",
          method: () => {
            currentCategory = 29;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "World Fuckery",
          isTogglable: false,
          toolTip: "doors, thunder, blackholes",
          method: () => {
            currentCategory = 30;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Machine Fuckery",
          isTogglable: false,
          toolTip: "dupe, selling, claw machines",
          method: () => {
            currentCategory = 31;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Shadow Boss Shit",
          isTogglable: false,
          toolTip: "shadow boss spawn and attacks",
          method: () => {
            currentCategory = 35;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Good Shit",
          isTogglable: false,
          toolTip: "shop, dev, no-spend bypasses",
          method: () => {
            currentCategory = 36;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Ore Fuckery",
          isTogglable: false,
          toolTip: "ore spawn gun, ore ids, break and clear ores",
          method: () => {
            currentCategory = 47;
            currentPage = 0;
          },
        }),
      ];
    }
    function n5BuildIds20Category() {
      return [
        new MenuItem({
          buttonText: "<< Back to World",
          isTogglable: false,
          toolTip: "back to world hub",
          method: () => {
            currentCategory = 44;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Items",
          isTogglable: false,
          toolTip: "full item id picker",
          method: () => {
            currentCategory = 38;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Mobs",
          isTogglable: false,
          toolTip: "full mob id picker",
          method: () => {
            currentCategory = 39;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Prefabs",
          isTogglable: false,
          toolTip: "full prefab id picker",
          method: () => {
            currentCategory = 40;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Map IDs",
          isTogglable: false,
          toolTip: "full map teleport id picker",
          method: () => {
            currentCategory = 41;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Teleport Me To Selected Map",
          isTogglable: false,
          toolTip: "teleport to the selected Map ID",
          method: () => teleportTo(mapIDs[n5MapIndex].id),
        }),
        new MenuItem({
          buttonText: "Current IDs",
          isTogglable: false,
          toolTip: "show currently selected ids",
          method: () => {
            currentNotification =
              "ITEM:" +
              itemIDs[itemIndex] +
              " | MOB:" +
              mobIDs[mobIndex] +
              " | PREFAB:" +
              prefabList[prefabIndex] +
              " | MAP:" +
              mapIDs[n5MapIndex].name +
              "(" +
              mapIDs[n5MapIndex].id +
              ")";
            notifactionResetTime = time + 5;
          },
        }),
      ];
    }
    function n5BuildIdListCategory(_kind, _list) {
      const _buttons = [
        new MenuItem({
          buttonText: "<< Back to IDs 2.0",
          isTogglable: false,
          toolTip: "back",
          method: () => {
            currentCategory = 37;
            currentPage = 0;
          },
        }),
      ];
      for (const _id of _list) _buttons.push(n5IdButton(_kind, _id));
      return _buttons;
    }
    const menuCategories = [
      [
        new MenuItem({
          buttonText: "Settings",
          isTogglable: false,
          toolTip: "menu config, ids, themes, scale, clones, bag duping",
          method: () => {
            currentCategory = 2;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Local Player",
          method: () => {
            ((currentCategory = 32), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "settings, movement, player, cosmetics, utility",
        }),
        new MenuItem({
          buttonText: "Other Players",
          method: () => {
            ((currentCategory = 42), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "other players, users, whitelisting",
        }),
        new MenuItem({
          buttonText: "Combat",
          method: () => {
            ((currentCategory = 43), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "weapons, guns, launchers, spawning",
        }),
        new MenuItem({
          buttonText: "World",
          method: () => {
            ((currentCategory = 44), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "prefabs, ids, blueprints",
        }),
        new MenuItem({
          buttonText: "Misc",
          method: () => {
            ((currentCategory = 45), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "presets, soundboard, rpc blocks",
        }),
        new MenuItem({
          buttonText: "Overpowered",
          method: () => {
            ((currentCategory = 46), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "quiver, orbit, bosses, machines, world tools",
        }),
        new MenuItem({
          buttonText: "Credits",
          isTogglable: false,
          toolTip: "credits",
          method: () => {
            currentCategory = 19;
            currentPage = 0;
          },
        }),
      ],
      [
        new MenuItem({
          buttonText: "Disconnect",
          method: () => {
            try {
              const _runner = PrefabGeneratorCls.field("_instance")
                .value.method("get_runner")
                .invoke();
              if (_runner && !_runner.isNull()) {
                _runner.method("Shutdown").invoke();
                currentNotification = "Disconnecting...";
                notifactionResetTime = time + 3;
              }
            } catch (_e) {
              console.error("[Disconnect]", _e);
            }
          },
          isTogglable: false,
          toolTip: "Disconnects you from the room.",
        }),
        new MenuItem({
          buttonText: "PreviousPage",
          method: () => {
            const _cat = menuCategories[currentCategory] || [];
            const _lastPage = Math.max(Math.ceil(_cat.length / 8) - 1, 0);
            currentPage--;
            if (currentPage < 0) currentPage = _lastPage;
          },
          isTogglable: false,
        }),
        new MenuItem({
          buttonText: "NextPage",
          method: () => {
            const _cat = menuCategories[currentCategory] || [];
            const _lastPage = Math.max(Math.ceil(_cat.length / 8) - 1, 0);
            currentPage++;
            currentPage %= _lastPage + 1;
          },
          isTogglable: false,
        }),
        new MenuItem({
          buttonText: "GlobalReturn",
          method: () => {
            n5SearchActive = false;
            currentCategory = 0;
            currentPage = 0;
          },
          isTogglable: false,
          toolTip: "Returns you back to the main category.",
        }),
        new MenuItem({
          buttonText: "MenuSearch",
          method: () => {
            n5StartMenuSearch();
          },
          isTogglable: false,
          toolTip: "Open the VR point-and-click search keyboard.",
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to Local Player",
          method: () => {
            ((currentCategory = 32), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "Returns you back to the Local Player category.",
        }),
        new MenuItem({
          buttonText: "ImGui Mode",
          isTogglable: true,
          toolTip: "switch between the original 3D menu and the N5 ImGui panel",
          enableMethod: () => {
            n5ImGuiMode = true;
            _n5RequestMenuRebuild();
          },
          disableMethod: () => {
            n5ImGuiMode = false;
            n5ImGuiDestroy();
            _n5RequestMenuRebuild();
          },
          method: () => {},
        }),
        new MenuItem({
          buttonText: "ImGui Flip H",
          isTogglable: true,
          toolTip:
            "Flip ImGui panel horizontally - toggle until correct then check console log",
          enableMethod: () => {
            _n5ImFlipH = true;
            n5ImGuiDestroy();
            _n5ImLogFlip();
          },
          disableMethod: () => {
            _n5ImFlipH = false;
            n5ImGuiDestroy();
            _n5ImLogFlip();
          },
          method: () => {},
        }),
        new MenuItem({
          buttonText: "ImGui Flip V",
          isTogglable: true,
          toolTip:
            "[Debug] Force extra vertical flip on top of auto-correction",
          enableMethod: () => {
            _n5ImFlipV = true;
            n5ImGuiDestroy();
            _n5ImLogFlip();
          },
          disableMethod: () => {
            _n5ImFlipV = false;
            n5ImGuiDestroy();
            _n5ImLogFlip();
          },
          method: () => {},
        }),
        new MenuItem({
          buttonText: "Item ID+",
          isTogglable: false,
          toolTip: "cycle item ID forward",
          method: () => {
            itemIndex = (itemIndex + 1) % itemIDs.length;
            currentNotification = "ITEM: " + itemIDs[itemIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Item ID-",
          isTogglable: false,
          toolTip: "cycle item ID backward",
          method: () => {
            itemIndex = (itemIndex - 1 + itemIDs.length) % itemIDs.length;
            currentNotification = "ITEM: " + itemIDs[itemIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Prefab ID+",
          isTogglable: false,
          toolTip: "cycle prefab forward",
          method: () => {
            prefabIndex = (prefabIndex + 1) % prefabList.length;
            currentNotification = "PREFAB: " + prefabList[prefabIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Prefab ID-",
          isTogglable: false,
          toolTip: "cycle prefab backward",
          method: () => {
            prefabIndex =
              (prefabIndex - 1 + prefabList.length) % prefabList.length;
            currentNotification = "PREFAB: " + prefabList[prefabIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Show Current IDs",
          isTogglable: false,
          toolTip: "print current item/mob/prefab IDs to notification",
          method: () => {
            currentNotification =
              "ITEM:" +
              itemIDs[itemIndex] +
              " | MOB:" +
              mobIDs[mobIndex] +
              " | PREFAB:" +
              prefabList[prefabIndex];
            notifactionResetTime = time + 5;
          },
        }),
        new MenuItem({
          buttonText: "Change Item ID",
          method: () => {
            (rightGrab ? itemIndex-- : itemIndex++,
              (itemIndex = _vx476.hXWTf(
                (_vx476.hXWTf(itemIndex + itemIDs.length), itemIDs.length),
                itemIDs.length,
              )),
              console.log(itemIDs[itemIndex]),
              setNotification(
                _vx476.HaQtP(
                  "<color=grey>[</color><color=#00ff59>MENU</color><color=grey>]</color> " +
                    "New item index: ",
                  itemIDs[itemIndex],
                ),
                false,
              ));
          },
          isTogglable: false,
          toolTip: "Changes the item ID. Hold right grip to go down",
        }),
        new MenuItem({
          buttonText: "Change Mob ID",
          method: () => {
            (rightGrab ? mobIndex-- : mobIndex++,
              (mobIndex = _vx476.PijQq(
                (_vx476.Oulwf(mobIndex + mobIDs.length), mobIDs.length),
                mobIDs.length,
              )),
              setNotification(
                "<color=grey>[</color><color=#00ff59>MENU</color><color=grey>]</color> Mob: " +
                  mobIDs[mobIndex],
                false,
              ));
          },
          isTogglable: false,
          toolTip: "Changes the mob to spawn. Hold right grip to go back.",
        }),
        new MenuItem({
          buttonText: "unlock all",
          method: () => {
            const n5VendingDevFields = {
              fGcqg: "_devModeOn",
              cIgmb: "RefreshItems",
            };
            !devModeHookSet &&
              ((ItemVendingMachineViewCls.method(
                "RefreshItems",
              ).implementation = function () {
                ((this.field(n5VendingDevFields.fGcqg).value = true),
                  this.method(n5VendingDevFields.cIgmb).invoke());
              }),
              (devModeHookSet = true));
          },
          disableMethod: () => {
            ((ItemVendingMachineViewCls.method("RefreshItems").implementation =
              null),
              (devModeHookSet = false));
          },
          isTogglable: true,
          toolTip: "Unlocks all items in the vending machine.",
        }),
        new MenuItem({
          buttonText: "Name: hi",
          isTogglable: false,
          toolTip: "pick a name",
          method: () => {
            n5NameIndex = (n5NameIndex + 1) % n5Names.length;
            currentNotification = "Name: " + n5Names[n5NameIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Name <",
          isTogglable: false,
          toolTip: "prev name",
          method: () => {
            n5NameIndex = (n5NameIndex - 1 + n5Names.length) % n5Names.length;
            currentNotification = "Name: " + n5Names[n5NameIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Apply Name",
          isTogglable: false,
          toolTip: "apply name",
          method: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp) return;

              const _cleanName = n5Names[n5NameIndex]
                .replace(/<color=[^>]+>/gi, "")
                .replace(/<\/color>/gi, "");
              _lp.method("set_displayName").invoke(Il2Cpp.string(_cleanName));
              currentNotification = "Name set: " + _cleanName;
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("Name spoof:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: ">> Next Theme",
          isTogglable: false,
          toolTip: "next theme",
          method: () => {
            n5ThemeIndex = (n5ThemeIndex + 1) % n5ThemeKeys.length;
            currentNotification = "Theme: " + n5ThemeKeys[n5ThemeIndex];
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Galaxy",
          isTogglable: false,
          toolTip: "galaxy",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Galaxy");
            currentNotification = "Theme: Galaxy";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Rainbow",
          isTogglable: false,
          toolTip: "rainbow",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Rainbow");
            currentNotification = "Theme: Rainbow";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Blood Red",
          isTogglable: false,
          toolTip: "blood red",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Blood Red");
            currentNotification = "Theme: Blood Red";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Ocean",
          isTogglable: false,
          toolTip: "ocean",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Ocean");
            currentNotification = "Theme: Ocean";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Gold",
          isTogglable: false,
          toolTip: "gold",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Gold");
            currentNotification = "Theme: Gold";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Ice",
          isTogglable: false,
          toolTip: "ice",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Ice");
            currentNotification = "Theme: Ice";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Neon",
          isTogglable: false,
          toolTip: "neon",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Neon");
            currentNotification = "Theme: Neon";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Sunset",
          isTogglable: false,
          toolTip: "sunset",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Sunset");
            currentNotification = "Theme: Sunset";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Matrix",
          isTogglable: false,
          toolTip: "matrix",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Matrix");
            currentNotification = "Theme: Matrix";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Midnight",
          isTogglable: false,
          toolTip: "midnight",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Midnight");
            currentNotification = "Theme: Midnight";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Toxic",
          isTogglable: false,
          toolTip: "toxic",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Toxic");
            currentNotification = "Theme: Toxic";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Fire",
          isTogglable: false,
          toolTip: "fire",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Fire");
            currentNotification = "Theme: Fire";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Void",
          isTogglable: false,
          toolTip: "void",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Void");
            currentNotification = "Theme: Void";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Snow",
          isTogglable: false,
          toolTip: "snow",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Snow");
            currentNotification = "Theme: Snow";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Cyber",
          isTogglable: false,
          toolTip: "cyber",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Cyber");
            currentNotification = "Theme: Cyber";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Jade",
          isTogglable: false,
          toolTip: "jade",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Jade");
            currentNotification = "Theme: Jade";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Sakura",
          isTogglable: false,
          toolTip: "sakura",
          method: () => {
            n5ThemeIndex = n5ThemeKeys.indexOf("Sakura");
            currentNotification = "Theme: Sakura";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Default Theme",
          isTogglable: false,
          toolTip: "default",
          method: () => {
            n5ThemeIndex = N5_DEFAULT_THEME_INDEX;
            currentNotification = "Theme: Void";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Scale +",
          isTogglable: false,
          toolTip: "scale up",
          method: () => {
            n5MenuScale = Math.min(1.5, n5MenuScale + 0.1);
            currentNotification = "Scale: " + n5MenuScale.toFixed(1);
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Scale -",
          isTogglable: false,
          toolTip: "scale down",
          method: () => {
            n5MenuScale = Math.max(0.5, n5MenuScale - 0.1);
            currentNotification = "Scale: " + n5MenuScale.toFixed(1);
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Orbit Speed +",
          isTogglable: false,
          toolTip: "faster orbit",
          method: () => {
            orbitSpeed = Math.min(5.0, +(orbitSpeed + 0.25).toFixed(2));
            currentNotification = "Orbit speed: " + orbitSpeed.toFixed(2);
            notifactionResetTime = time + 1.5;
          },
        }),
        new MenuItem({
          buttonText: "Orbit Speed -",
          isTogglable: false,
          toolTip: "slower orbit",
          method: () => {
            orbitSpeed = Math.max(0.05, +(orbitSpeed - 0.25).toFixed(2));
            currentNotification = "Orbit speed: " + orbitSpeed.toFixed(2);
            notifactionResetTime = time + 1.5;
          },
        }),
        new MenuItem({
          buttonText: "Item Rain",
          isTogglable: true,
          toolTip: "rains selected items above your live position",
          method: () => {
            if (time < n5ItemRainDelay) return;
            n5ItemRainDelay = time + 0.12;
            try {
              const _p = n5LocalPlayerPos();
              for (let _i = 0; _i < 2; _i++) {
                const _sp = [
                  (_p[0] || 0) + (Math.random() - 0.5) * 7,
                  (_p[1] || 0) + 6 + Math.random() * 3,
                  (_p[2] || 0) + (Math.random() - 0.5) * 7,
                ];
                if (
                  !n5SpawnConfiguredItemAt(
                    itemIDs[itemIndex],
                    _sp,
                    identityRotation,
                  )
                ) {
                  n5SpawnItemAt(itemIDs[itemIndex], _sp, identityRotation);
                }
              }
            } catch (_e) {
              console.error("[ItemRain]", _e);
            }
          },
          enableMethod: () => {
            n5ItemRainEnabled = true;
            currentNotification = "Item Rain ON  " + itemIDs[itemIndex];
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5ItemRainEnabled = false;
            currentNotification = "Item Rain OFF";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Big Hands",
          isTogglable: true,
          toolTip: "makes your hands massive",
          enableMethod: () => {
            try {
              rightHandTransform
                .method("set_localScale")
                .invoke(
                  Vector3Cls.method("op_Multiply").invoke([1, 1, 1], 3.0),
                );
              leftHandTransform
                .method("set_localScale")
                .invoke(
                  Vector3Cls.method("op_Multiply").invoke([1, 1, 1], 3.0),
                );
              n5BigHandsEnabled = true;
              currentNotification = "Big Hands ON";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("[BigHands]", _e);
            }
          },
          disableMethod: () => {
            try {
              rightHandTransform.method("set_localScale").invoke([1, 1, 1]);
              leftHandTransform.method("set_localScale").invoke([1, 1, 1]);
              n5BigHandsEnabled = false;
              currentNotification = "Big Hands OFF";
              notifactionResetTime = time + 2;
            } catch (_e) {}
          },
        }),
        new MenuItem({
          buttonText: "Tiny Hands",
          isTogglable: false,
          toolTip: "makes hands tiny (0.1x)",
          method: () => {
            try {
              rightHandTransform
                .method("set_localScale")
                .invoke([0.1, 0.1, 0.1]);
              leftHandTransform
                .method("set_localScale")
                .invoke([0.1, 0.1, 0.1]);
              currentNotification = "Tiny Hands!";
              notifactionResetTime = time + 2;
            } catch (_e) {}
          },
        }),
        new MenuItem({
          buttonText: "Reset Hand Size",
          isTogglable: false,
          toolTip: "reset hands to normal",
          method: () => {
            try {
              rightHandTransform.method("set_localScale").invoke([1, 1, 1]);
              leftHandTransform.method("set_localScale").invoke([1, 1, 1]);
              currentNotification = "Hands reset";
              notifactionResetTime = time + 2;
            } catch (_e) {}
          },
        }),
        new MenuItem({
          buttonText: "Random VFX Spam",
          isTogglable: false,
          toolTip: "spam random VFX at your position",
          method: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              const _p = getTransform(_lp).method("get_position").invoke();
              const _vkeys = Object.keys(VFXTypes).filter((k) => k !== "None");
              let _c = 0;
              for (let _i = 0; _i < 5 && _i < _vkeys.length; _i++) {
                try {
                  const _vk = _vkeys[Math.floor(Math.random() * _vkeys.length)];
                  if (n5PlayVFXAt(VFXTypes[_vk], _p, identityRotation)) _c++;
                } catch (_) {}
              }
              currentNotification = "VFX Spam: " + _c + " effects";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("[VFXSpam]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Freeze Self (kinematic)",
          isTogglable: true,
          toolTip: "makes your rigidbody kinematic so you dont move",
          method: () => {
            try {
              const _rb = gorillaLocomotionInstance
                .method("GetComponent", 1)
                .inflate(RigidbodyCls)
                .invoke();
              if (!_rb) return;
              const _cur = _rb.method("set_isKinematic").invoke();
              _rb.method("set_isKinematic").invoke(!_cur);
              currentNotification = "Kinematic: " + !_cur;
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("[FreezeSelf]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Warp to Origin (0,0,0)",
          isTogglable: false,
          toolTip: "teleport yourself to world origin",
          method: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp) return;
              _lp.method("RPC_Teleport").invoke([0, 2, 0]);
              currentNotification = "Warped to origin";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("[WarpOrigin]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Item Magnet",
          isTogglable: true,
          toolTip: "pull all nearby items toward you each frame",
          method: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp) return;
              const _mp = getTransform(_lp).method("get_position").invoke();
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(GrabbableItemCls)
                .invoke(0);
              if (!_all || _all.length === 0) return;
              for (let _i = 0; _i < Math.min(_all.length, 30); _i++) {
                try {
                  const _it = _all.get(_i);
                  if (!_it || _it.handle.isNull()) continue;
                  const _cp = _it
                    .method("get_transform")
                    .invoke()
                    .method("get_position")
                    .invoke();
                  const _dx = (_mp[0] || 0) - (_cp[0] || 0),
                    _dy = (_mp[1] || 0) - (_cp[1] || 0),
                    _dz = (_mp[2] || 0) - (_cp[2] || 0);
                  const _dist = Math.sqrt(_dx * _dx + _dy * _dy + _dz * _dz);
                  if (_dist > 15 || _dist < 0.5) continue;
                  const _spd = (5 * deltaTime) / _dist;
                  _it
                    .method("RPC_Teleport")
                    .invoke([
                      (_cp[0] || 0) + _dx * _spd,
                      (_cp[1] || 0) + _dy * _spd,
                      (_cp[2] || 0) + _dz * _spd,
                    ]);
                } catch (_) {}
              }
            } catch (_e) {}
          },
        }),
        new MenuItem({
          buttonText: "Infinite Jetpack",
          isTogglable: true,
          toolTip: "keeps JetpackHandy usable and spams RPC_UseJetpack",
          enableMethod: () => {
            n5InfiniteJetpackEnabled = true;
            n5RunInfiniteJetpack();
            currentNotification = "Infinite Jetpack ON";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5InfiniteJetpackEnabled = false;
            currentNotification = "Infinite Jetpack OFF";
            notifactionResetTime = time + 2;
          },
          method: () => n5RunInfiniteJetpack(),
        }),
        new MenuItem({
          buttonText: "Bag Drop Dupe",
          isTogglable: true,
          toolTip: "dupes items as they are dropped out of bags or quivers",
          enableMethod: () => {
            n5BagDropDupeEnabled = true;
            currentNotification = "Bag Drop Dupe ON x" + n5BagDropDupeAmount;
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5BagDropDupeEnabled = false;
            currentNotification = "Bag Drop Dupe OFF";
            notifactionResetTime = time + 2;
          },
          method: () => {},
        }),
        new MenuItem({
          buttonText: "No Backpack Remove",
          isTogglable: true,
          toolTip: "keeps backpack RemoveItem from deleting contained items",
          enableMethod: () => {
            n5InstallBagDropDupeHooks();
            n5NoBackpackRemoveEnabled = true;
            currentNotification = "No Backpack Remove ON";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5NoBackpackRemoveEnabled = false;
            currentNotification = "No Backpack Remove OFF";
            notifactionResetTime = time + 2;
          },
          method: () => {},
        }),
        new MenuItem({
          buttonText: "Bag Dupe Amount +",
          isTogglable: false,
          toolTip: "increase bag drop dupe amount",
          method: () => {
            n5BagDropDupeIndex =
              (n5BagDropDupeIndex + 1) % n5BagDropDupeValues.length;
            n5BagDropDupeAmount = n5BagDropDupeValues[n5BagDropDupeIndex];
            currentNotification = "Bag dupe amount: " + n5BagDropDupeAmount;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Bag Dupe Amount -",
          isTogglable: false,
          toolTip: "decrease bag drop dupe amount",
          method: () => {
            n5BagDropDupeIndex =
              (n5BagDropDupeIndex - 1 + n5BagDropDupeValues.length) %
              n5BagDropDupeValues.length;
            n5BagDropDupeAmount = n5BagDropDupeValues[n5BagDropDupeIndex];
            currentNotification = "Bag dupe amount: " + n5BagDropDupeAmount;
            notifactionResetTime = time + 2;
          },
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to Local Player",
          method: () => {
            ((currentCategory = 32), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "Returns you back to the Local Player category.",
        }),
        new MenuItem({
          buttonText: "Fly",
          method: () => {
            _vx125 = gorillaLocomotionInstance
              .method("GetComponent", 1)
              .inflate(RigidbodyCls)
              .invoke();
            if (!_vx125) return;
            if (rightTrigger) {
              const _vx4bc = rightHandTransform.method("get_forward").invoke(),
                _vx411 = Vector3Cls.method("op_Multiply", 2).invoke(
                  _vx4bc,
                  flySpeed * deltaTime,
                );
              _vx125.method("AddForce", 2).invoke(_vx411, 2);
            }
            if (leftTrigger) {
              const _vx1eb = leftHandTransform.method("get_forward").invoke(),
                _vx1d3 = Vector3Cls.method("op_Multiply", 2).invoke(
                  _vx1eb,
                  flySpeed * deltaTime,
                );
              _vx125.method("AddForce", 2).invoke(_vx1d3, 2);
            }
          },
          isTogglable: true,
          toolTip: "hold triggers to fly bro",
        }),
        new MenuItem({
          buttonText: "Joystick Fly",
          enableMethod: () => {
            joystickFlyEnabled = true;
            currentNotification =
              "Joystick Fly ON - L-stick up/down, R-stick fwd/back";
            notifactionResetTime = time + 3;
          },
          disableMethod: () => {
            joystickFlyEnabled = false;
            currentNotification = "Joystick Fly OFF";
            notifactionResetTime = time + 2;
          },
          isTogglable: true,
          toolTip: "joystick fly ts pmo",
        }),
        new MenuItem({
          buttonText: "Hold-Grip Platforms",
          enableMethod: () => {
            currentNotification = "Hold-Grip Platforms ON  hold grip to place";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5DestroyGripPlatforms();
            currentNotification = "Hold-Grip Platforms OFF";
            notifactionResetTime = time + 2;
          },
          isTogglable: true,
          toolTip: "hold either grip to hold a platform under that hand",
          method: () => {
            n5UpdateGripPlatforms();
          },
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to Local Player",
          method: () => {
            ((currentCategory = 32), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "Returns you back to the Local Player category.",
        }),
        new MenuItem({
          buttonText: "Play Night Alarm",
          isTogglable: false,
          toolTip: "calls NetPlayer/Watch/GameTimeManager PlayNightAlarm",
          method: () => {
            n5PlayNightAlarmSound();
          },
        }),
        new MenuItem({
          buttonText: "Allow All Move",
          isTogglable: true,
          toolTip:
            "removes all restrictions from quivers and backpacks  put anything in them",
          enableMethod: () => {
            allowAllContainers = true;
            currentNotification = "Allow All Move: TRUE";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            allowAllContainers = false;
            currentNotification = "Allow All Move: FALSE";
            notifactionResetTime = time + 2;
          },
          method: () => {},
        }),
        new MenuItem({
          buttonText: "Invisible Toggleable",
          enableMethod: () => {
            _vx433 = PlayerControllerCls.method("get_instance").invoke();
            const _n5PlayerView = _vx433
              ? _vx433.method("get_playerView").invoke()
              : null;
            if (!_n5PlayerView) return null;
            const _vx3d5 = _n5PlayerView.field("_cameraTransform").value;
            if (!_vx3d5) return null;
            _vx3d5.method("set_position").invoke([-4421 + 2039, -99999, 0]);
          },
          disableMethod: () => {
            ((_vxb2b = PlayerControllerCls.method("get_instance").invoke()),
              (_vx5c2 = _vxb2b.method("get_playerView").invoke()));
            if (!_vx5c2) return null;
            const _vx38b = _vx5c2.field("_cameraTransform").value;
            if (!_vx38b) return null;
            _vx38b
              .method("set_position")
              .invoke(
                getTransform(headCollider).method("get_position").invoke(),
              );
          },
          isTogglable: true,
          toolTip: "Turns you invisible.",
        }),
        new MenuItem({
          buttonText: "No Red Watch",
          method: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp) return;
              _lp.method("set_isWanted").invoke(false);
            } catch (_e) {
              console.error("[NoRedWatch]", _e);
            }
          },
          disableMethod: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp) return;
              _lp.method("set_isWanted").invoke(false);
            } catch (_e) {}
          },
          isTogglable: true,
          toolTip: "removes red watch",
        }),
        new MenuItem({
          buttonText: "Godmode",
          isTogglable: true,
          toolTip: "blocks local maxHealth setter",
          enableMethod: () => {
            n5GodModeEnabled = n5InstallGodModeHook();
            currentNotification = n5GodModeEnabled
              ? "Godmode ON"
              : "Godmode hook failed";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5GodModeEnabled = false;
            currentNotification = "Godmode OFF";
            notifactionResetTime = time + 2;
          },
          method: () => {},
        }),
        new MenuItem({
          buttonText: "No Death v2",
          isTogglable: true,
          toolTip: "blocks damage, death, stun, and keeps health topped",
          enableMethod: () => {
            n5BetterGodModeEnabled = n5InstallBetterGodModeHook();
            if (n5BetterGodModeEnabled) n5KeepAliveSelf();
            currentNotification = n5BetterGodModeEnabled
              ? "No Death v2 ON"
              : "No Death hook failed";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5BetterGodModeEnabled = false;
            currentNotification = "No Death v2 OFF";
            notifactionResetTime = time + 2;
          },
          method: () => {
            if (n5BetterGodModeEnabled) n5KeepAliveSelf();
          },
        }),
        new MenuItem({
          buttonText: "Fullbright",
          isTogglable: true,
          toolTip: "makes the game full bright",
          enableMethod: () => {
            n5FullbrightEnabled = n5InstallFullbrightHook();
            if (n5FullbrightEnabled) n5SetFullbrightAmbient(1.0);
            currentNotification = n5FullbrightEnabled
              ? "Fullbright ON"
              : "Fullbright hook failed";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5FullbrightEnabled = false;
            n5SetFullbrightAmbient(1.0);
            currentNotification = "Fullbright OFF";
            notifactionResetTime = time + 2;
          },
          method: () => {
            if (n5FullbrightEnabled && frameCount % 60 === 0)
              n5SetFullbrightAmbient(1.0);
          },
        }),
        new MenuItem({
          buttonText: "Revive Self",
          isTogglable: false,
          toolTip: "revives yourself if dead",
          method: () => {
            const _ok = n5ReviveSelf();
            currentNotification = _ok
              ? "Revive Self sent"
              : "Revive Self failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Revive Full Health",
          isTogglable: false,
          toolTip: "revives and forces full health",
          method: () => {
            n5ReviveFullHealth();
          },
        }),
        new MenuItem({
          buttonText: "Auto Revive Self",
          isTogglable: true,
          toolTip: "automatically revives you when dead",
          enableMethod: () => {
            n5InstallReviveSelfHook();
            n5AutoReviveSelfEnabled = true;
            currentNotification = "Auto Revive ON";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5AutoReviveSelfEnabled = false;
            currentNotification = "Auto Revive OFF";
            notifactionResetTime = time + 2;
          },
          method: () => {
            if (!n5AutoReviveSelfEnabled || time < n5AutoReviveSelfDelay)
              return;
            n5AutoReviveSelfDelay = time + 0.2;
            if (n5IsSelfDead()) n5ReviveSelf();
          },
        }),
        new MenuItem({
          buttonText: "Test RPC Notif",
          method: () => {
            rpcAlertMsg = " BLOCKED: TestRPC";
            rpcAlertExpiry = time + 4;
          },
          isTogglable: false,
          toolTip: "test notif",
        }),
        new MenuItem({
          buttonText: "Despawn All Items",
          method: () => {
            try {
              const _items = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(GrabbableItemCls)
                .invoke(0);
              if (!_items || _items.length === 0) {
                currentNotification = "No items found";
                notifactionResetTime = time + 2;
                return;
              }
              let _count = 0;
              const _col = [];
              for (let _i = 0; _i < _items.length; _i++) {
                try {
                  const _x = _items.get(_i);
                  if (_x && !_x.handle.isNull()) _col.push(_x);
                } catch (_) {}
              }
              for (const _it of _col) {
                try {
                  _it.method("RPC_Teleport").invoke([0, -99999, 0]);
                  _count++;
                } catch (_e) {
                  try {
                    UnityObjectCls.method("Destroy", 1).invoke(
                      _it.method("get_gameObject").invoke(),
                    );
                    _count++;
                  } catch (_) {}
                }
              }
              currentNotification = "Removed " + _count + " items";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[DespawnItems]", _e);
              currentNotification = "Items err: " + _e;
              notifactionResetTime = time + 3;
            }
          },
          isTogglable: false,
          toolTip: "yeet all items",
        }),
        new MenuItem({
          buttonText: "Kill All Mobs",
          method: () => {
            try {
              const _count = n5KillAllMobsNow();
              currentNotification = "Killed " + _count + " mobs";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[KillMobs]", _e);
              currentNotification = "Kill mobs err: " + _e;
              notifactionResetTime = time + 3;
            }
          },
          isTogglable: false,
          toolTip: "kill all mobs",
        }),
        new MenuItem({
          buttonText: "Explode Machine",
          method: () => {
            try {
              const _m = ItemSellingMachineControllerCls.field(
                "<Instance>k__BackingField",
              ).value;
              if (!_m || _m.isNull()) throw new Error("no machine");
              _m.method("RPC_ExplodeMachine").invoke();
              currentNotification = " Machine exploded!";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "Machine not found";
              notifactionResetTime = time + 2;
            }
          },
          isTogglable: false,
          toolTip: "explode the machine",
        }),
        new MenuItem({
          buttonText: "Recover Machine",
          method: () => {
            try {
              const _m = ItemSellingMachineControllerCls.field(
                "<Instance>k__BackingField",
              ).value;
              if (!_m || _m.isNull()) throw new Error("no machine");
              _m.method("RPC_RecoverExplosion").invoke();
              currentNotification = " Machine recovered";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "Machine not found";
              notifactionResetTime = time + 2;
            }
          },
          isTogglable: false,
          toolTip: "recover the machine",
        }),
        new MenuItem({
          buttonText: "Spaz Machine",
          method: () => {
            try {
              const _m = ItemSellingMachineControllerCls.field(
                "<Instance>k__BackingField",
              ).value;
              if (!_m || _m.isNull()) throw new Error("no machine");
              _m.method("RPC_ExplodeMachine").invoke();
              _m.method("RPC_RecoverExplosion").invoke();
              currentNotification = " Machine spazzed";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "Machine not found";
              notifactionResetTime = time + 2;
            }
          },
          isTogglable: false,
          toolTip: "spaz the machine",
        }),
        new MenuItem({
          buttonText: "Spaz Item Buttons",
          method: () => {
            try {
              const _m = ItemSellingMachineControllerCls.field(
                "<Instance>k__BackingField",
              ).value;
              if (!_m || _m.isNull()) throw new Error("no machine");
              for (let _bi = 0; _bi < 10; _bi++)
                try {
                  _m.method("RPC_ButtonPressed").invoke(_bi);
                } catch (_) {}
              currentNotification = "Spammed 10 machine buttons";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "Machine not found";
              notifactionResetTime = time + 2;
            }
          },
          isTogglable: false,
          toolTip: "spam machine buttons",
        }),
        new MenuItem({
          buttonText: "Item Orbit",
          isTogglable: true,
          toolTip: "orbit selected item around u",
          method: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp || _lp.handle.isNull()) return;
              const _myPos = getTransform(_lp).method("get_position").invoke();
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(GrabbableItemCls)
                .invoke(0);
              if (!_all || _all.length === 0) return;
              const _targetId = "item_prefab/" + itemIDs[itemIndex];
              let _idx = 0;
              for (let _i = 0; _i < _all.length; _i++) {
                try {
                  const _it = _all.get(_i);
                  if (!_it || _it.handle.isNull()) continue;
                  const _idObj = _it.method("get_itemID").invoke();
                  if (!_idObj || _idObj.isNull()) continue;
                  if (_idObj.content !== itemIDs[itemIndex]) continue;
                  const _ang = _idx * ((Math.PI * 2) / 5) + time * 1.8;
                  const _tp = Vector3Cls.method("op_Addition").invoke(_myPos, [
                    Math.cos(_ang) * 3.5,
                    1.2,
                    Math.sin(_ang) * 3.5,
                  ]);
                  _it.method("RPC_Teleport").invoke(_tp);
                  _idx++;
                } catch (_) {}
              }
            } catch (_e) {
              console.error("ItemOrbit:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Prefab Orbit",
          isTogglable: true,
          toolTip: "orbit selected prefab around u",
          method: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp || _lp.handle.isNull()) return;
              const _myPos = getTransform(_lp).method("get_position").invoke();
              let _netObjCls = null;
              try {
                _netObjCls = Il2Cpp.domain
                  .assembly("Fusion.Runtime")
                  .image.class("Fusion.NetworkObject");
              } catch (_) {}
              if (!_netObjCls) return;
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(_netObjCls)
                .invoke(0);
              if (!_all || _all.length === 0) return;
              const _target = prefabList[prefabIndex];
              let _idx = 0;
              for (let _i = 0; _i < _all.length; _i++) {
                try {
                  const _obj = _all.get(_i);
                  if (!_obj || _obj.handle.isNull()) continue;
                  try {
                    if (_obj.method("get_IsMine").invoke()) continue;
                  } catch (_) {}
                  const _nm = _obj
                    .method("get_gameObject")
                    .invoke()
                    .method("set_name")
                    .invoke()
                    .toString();
                  if (!_nm.includes(_target)) continue;
                  const _ang = _idx * ((Math.PI * 2) / 5) + time * 1.8;
                  const _tp = Vector3Cls.method("op_Addition").invoke(_myPos, [
                    Math.cos(_ang) * 3.5,
                    1.2,
                    Math.sin(_ang) * 3.5,
                  ]);
                  getTransform(_obj).method("set_position").invoke(_tp);
                  _idx++;
                } catch (_) {}
              }
            } catch (_e) {
              console.error("PrefabOrbit:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Orbit All Items",
          isTogglable: true,
          toolTip: "orbit every item around u",
          method: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp || _lp.handle.isNull()) return;
              const _myPos = getTransform(_lp).method("get_position").invoke();
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(GrabbableItemCls)
                .invoke(0);
              if (!_all || _all.length === 0) return;
              for (let _i = 0; _i < _all.length; _i++) {
                try {
                  const _it = _all.get(_i);
                  if (!_it || _it.handle.isNull()) continue;
                  const _ang = _i * ((Math.PI * 2) / _all.length) + time * 1.5;
                  const _r = 3.2 + (_i % 3) * 0.6;
                  const _tp = Vector3Cls.method("op_Addition").invoke(_myPos, [
                    Math.cos(_ang) * _r,
                    1.0 + (_i % 4) * 0.5,
                    Math.sin(_ang) * _r,
                  ]);
                  _it.method("RPC_Teleport").invoke(_tp);
                } catch (_) {}
              }
            } catch (_e) {
              console.error("OrbitAllItems:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Orbit All Prefabs",
          isTogglable: true,
          toolTip: "orbit all prefabs around u",
          method: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp || _lp.handle.isNull()) return;
              const _myPos = getTransform(_lp).method("get_position").invoke();
              let _netObjCls = null;
              try {
                _netObjCls = Il2Cpp.domain
                  .assembly("Fusion.Runtime")
                  .image.class("Fusion.NetworkObject");
              } catch (_) {}
              if (!_netObjCls) return;
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(_netObjCls)
                .invoke(0);
              if (!_all || _all.length === 0) return;
              let _idx = 0;
              for (let _i = 0; _i < _all.length; _i++) {
                try {
                  const _obj = _all.get(_i);
                  if (!_obj || _obj.handle.isNull()) continue;
                  try {
                    if (_obj.method("get_IsMine").invoke()) continue;
                  } catch (_) {}
                  const _ang =
                    _idx * ((Math.PI * 2) / Math.max(1, _all.length)) +
                    time * 1.5;
                  const _r = 3.2 + (_idx % 3) * 0.6;
                  const _tp = Vector3Cls.method("op_Addition").invoke(_myPos, [
                    Math.cos(_ang) * _r,
                    1.0 + (_idx % 4) * 0.5,
                    Math.sin(_ang) * _r,
                  ]);
                  getTransform(_obj).method("set_position").invoke(_tp);
                  _idx++;
                } catch (_) {}
              }
            } catch (_e) {
              console.error("OrbitAllPrefabs:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Bring All Items Gun",
          isTogglable: true,
          toolTip: "pull all items to ur aim",
          method: () => {
            try {
              if (!rightGrab) return;
              const _g = getGunPointerResult();
              if (!n5GunRayOk(_g.ray)) return;
              if (frameCount % 10 !== 0) return;
              const _pos = _g.endPosition;
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(GrabbableItemCls)
                .invoke(0);
              if (!_all || _all.length === 0) return;
              for (let _i = 0; _i < _all.length; _i++) {
                try {
                  const _it = _all.get(_i);
                  if (!_it || _it.handle.isNull()) continue;
                  _it.method("RPC_Teleport").invoke(_pos);
                } catch (_) {}
              }
            } catch (_e) {
              console.error("BringAllItemsGun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn All In Bag",
          isTogglable: false,
          toolTip: "spawn all items in a bag",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _bag = PrefabGeneratorCls.method("SpawnItem", 4).invoke(
                Il2Cpp.string("item_prefab/item_backpack_large_base"),
                _pos,
                identityRotation,
                nullObjectRef,
              );
              if (!_bag || _bag.handle.isNull()) {
                currentNotification = "Bag spawn failed";
                notifactionResetTime = time + 2;
                return;
              }
              const _bagPos = getTransform(_bag)
                .method("get_position")
                .invoke();
              for (let _i = 0; _i < itemIDs.length; _i++) {
                try {
                  const _off = Vector3Cls.method("op_Addition").invoke(
                    _bagPos,
                    [0, 0.05 * _i, 0],
                  );
                  PrefabGeneratorCls.method("SpawnItem", 4).invoke(
                    Il2Cpp.string("item_prefab/" + itemIDs[_i]),
                    _off,
                    identityRotation,
                    nullObjectRef,
                  );
                } catch (_) {}
              }
              currentNotification =
                " Spawned all " + itemIDs.length + " items in bag";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("SpawnAllInBag:", _e);
              currentNotification = "Bag error";
              notifactionResetTime = time + 2;
            }
          },
        }),
        new MenuItem({
          buttonText: "Rainbow Snowball Fist",
          isTogglable: true,
          toolTip: "shoot rainbow snowballs from ur hand",
          method: () => {
            try {
              if (!rightTrigger) return;
              if (frameCount % 3 !== 0) return;
              const _rh =
                gorillaLocomotionInstance.field("rightHandTransform").value;
              const _handPos = _rh.method("get_position").invoke();
              const _handFwd = _rh.method("get_forward").invoke();
              const _sb = PrefabGeneratorCls.method("SpawnItem", 4).invoke(
                Il2Cpp.string("item_prefab/item_snowball"),
                _handPos,
                identityRotation,
                nullObjectRef,
              );
              if (!_sb || _sb.handle.isNull()) return;
              const _gbi = _sb
                .method("get_gameObject")
                .invoke()
                .method("GetComponent", 1)
                .inflate(GrabbableItemCls)
                .invoke();
              if (_gbi && !_gbi.isNull()) {
                const _h = Math.round(((time * 0.7) % 1.0) * 254) - 127;
                try {
                  _gbi.method("set_colorHue").invoke(_h);
                } catch (_) {}
                try {
                  _gbi.method("set_colorSaturation").invoke(100);
                } catch (_) {}
                const _sc = Math.round((0.5 + Math.random() * 1.5) * 50);
                try {
                  _gbi.method("set_scaleModifier").invoke(_sc);
                } catch (_) {}
              }
              const _fwd = Vector3Cls.method("op_Multiply", 2).invoke(
                _handFwd,
                18 + Math.random() * 10,
              );
              try {
                _sb.method("RPC_AddForce", 3).invoke(_fwd);
              } catch (_) {}
            } catch (_e) {
              console.error("RainbowSnowballFist:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Piss Fist",
          isTogglable: true,
          toolTip: "piss from ur hand",
          method: () => {
            try {
              if (!rightTrigger) return;
              if (frameCount % 3 !== 0) return;
              const _rh =
                gorillaLocomotionInstance.field("rightHandTransform").value;
              const _handPos = _rh.method("get_position").invoke();
              const _handFwd = _rh.method("get_forward").invoke();
              const _sb = PrefabGeneratorCls.method("SpawnItem", 4).invoke(
                Il2Cpp.string("item_prefab/item_snowball"),
                _handPos,
                identityRotation,
                nullObjectRef,
              );
              if (!_sb || _sb.handle.isNull()) return;
              const _gbi = _sb
                .method("get_gameObject")
                .invoke()
                .method("GetComponent", 1)
                .inflate(GrabbableItemCls)
                .invoke();
              if (_gbi && !_gbi.isNull()) {
                try {
                  _gbi.method("set_colorHue").invoke(-87);
                } catch (_) {}
                try {
                  _gbi.method("set_colorSaturation").invoke(100);
                } catch (_) {}
              }
              const _fwd = Vector3Cls.method("op_Multiply", 2).invoke(
                _handFwd,
                20 + Math.random() * 8,
              );
              try {
                _sb.method("RPC_AddForce", 3).invoke(_fwd);
              } catch (_) {}
            } catch (_e) {
              console.error("PissFist:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Orbit Rainbow Snowballs",
          isTogglable: true,
          toolTip: "7 colored snowballs orbit u",
          enableMethod: () => {
            _n5OrbitSnowBalls = new Array(7).fill(null);
            _n5OrbitSnowHues = [-127, -90, -54, -18, 18, 54, 90];
            _n5OrbitSnowScales = [20, 35, 15, 40, 25, 30, 18];
          },
          disableMethod: () => {
            _n5OrbitSnowBalls = null;
          },
          method: () => {
            try {
              if (!_n5OrbitSnowBalls) return;
              if (frameCount % 2 !== 0) return;
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp || _lp.handle.isNull()) return;
              const _myPos = getTransform(_lp).method("get_position").invoke();
              for (let _i = 0; _i < 7; _i++) {
                try {
                  let _sb = _n5OrbitSnowBalls[_i];
                  let _valid = false;
                  if (_sb) {
                    try {
                      _valid =
                        !_sb.handle.isNull() &&
                        _sb.method("get_activeSelf").invoke();
                    } catch (_) {
                      _valid = false;
                    }
                  }
                  if (!_valid) {
                    try {
                      _sb = PrefabGeneratorCls.method("SpawnItem", 4).invoke(
                        Il2Cpp.string("item_prefab/item_snowball"),
                        _myPos,
                        identityRotation,
                        nullObjectRef,
                      );
                      if (_sb && !_sb.handle.isNull()) {
                        const _gbi = _sb
                          .method("get_gameObject")
                          .invoke()
                          .method("GetComponent", 1)
                          .inflate(GrabbableItemCls)
                          .invoke();
                        if (_gbi && !_gbi.isNull()) {
                          try {
                            _gbi
                              .method("set_colorHue")
                              .invoke(_n5OrbitSnowHues[_i]);
                          } catch (_) {}
                          try {
                            _gbi.method("set_colorSaturation").invoke(100);
                          } catch (_) {}
                          try {
                            _gbi
                              .method("set_scaleModifier")
                              .invoke(_n5OrbitSnowScales[_i]);
                          } catch (_) {}
                        }
                        _n5OrbitSnowBalls[_i] = _sb;
                      }
                    } catch (_) {}
                    break;
                  }
                  const _ang = _i * ((Math.PI * 2) / 7) + time * 2.2;
                  const _r = 1.5 + (_i % 3) * 0.25;
                  const _tp = Vector3Cls.method("op_Addition").invoke(_myPos, [
                    Math.cos(_ang) * _r,
                    0.9 + Math.sin(time * 1.5 + _i) * 0.3,
                    Math.sin(_ang) * _r,
                  ]);
                  _sb.method("RPC_Teleport").invoke(_tp);
                } catch (_) {}
              }
            } catch (_e) {
              console.error("OrbitSnow:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Despawn All Prefabs",
          method: () => {
            try {
              let _netObjCls = null;
              try {
                _netObjCls = Il2Cpp.domain
                  .assembly("Fusion.Runtime")
                  .image.class("Fusion.NetworkObject");
              } catch (_) {}
              if (!_netObjCls) {
                currentNotification = "NetworkObject not found";
                notifactionResetTime = time + 2;
                return;
              }
              const _objs = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(_netObjCls)
                .invoke(0);
              if (!_objs || _objs.length === 0) {
                currentNotification = "No networked objects";
                notifactionResetTime = time + 2;
                return;
              }
              let _count = 0;
              const _col = [];
              for (let _i = 0; _i < _objs.length; _i++) {
                try {
                  const _x = _objs.get(_i);
                  if (!_x || _x.handle.isNull()) continue;
                  try {
                    if (_x.method("get_IsMine").invoke()) continue;
                  } catch (_) {}
                  _col.push(_x);
                } catch (_) {}
              }

              const _runner = PrefabGeneratorCls.field("_instance")
                .value.method("get_runner")
                .invoke();
              for (const _obj of _col) {
                try {
                  _runner.method("Despawn", 1).invoke(_obj);
                  _count++;
                } catch (_e2) {
                  try {
                    _obj.method("set_position").invoke([0, -99999, 0]);
                    _count++;
                  } catch (_e3) {
                    try {
                      UnityObjectCls.method("Destroy", 1).invoke(
                        _obj.method("get_gameObject").invoke(),
                      );
                      _count++;
                    } catch (_) {}
                  }
                }
              }
              currentNotification = "Removed " + _count + " prefabs";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[DespawnPrefabs]", _e);
              currentNotification = "Prefabs err: " + _e;
              notifactionResetTime = time + 3;
            }
          },
          isTogglable: false,
          toolTip: "despawn all prefabs",
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to Other Players",
          method: () => {
            ((currentCategory = 42), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "Returns you back to the Other Players hub.",
        }),
        new MenuItem({
          buttonText: "TP All To Me",
          method: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp) return;
              const _myPos = _lp
                .method("get_transform")
                .invoke()
                .method("get_position")
                .invoke();
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                _pl.method("RPC_Teleport").invoke(_myPos);
              }
              currentNotification = "Teleported all to you";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("TPAllToMe:", _e);
            }
          },
          isTogglable: false,
          toolTip: "pull everyone to u",
        }),
        new MenuItem({
          buttonText: "Orbit All",
          enableMethod: () => {
            orbitAllEnabled = true;
            currentNotification = "Orbit All ON";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            orbitAllEnabled = false;
            currentNotification = "Orbit All OFF";
            notifactionResetTime = time + 2;
          },
          isTogglable: true,
          toolTip: "everyone orbits u",
        }),
        new MenuItem({
          buttonText: "Fling Player Gun",
          isTogglable: true,
          toolTip: "fling nearest player up",
          method: () => {
            if (!rightGrab) return;
            const _g = getGunPointerResult(),
              _gp = _g.gunPointer;
            if (!rightTrigger || !_gp || _gp.isNull()) return;
            if (!(time > tagGunDelay)) return;
            tagGunDelay = time + 0.3;
            try {
              const _gpos = getTransform(_gp).method("get_position").invoke();
              let _minD = Number.MAX_SAFE_INTEGER,
                _target = null;
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                const _d = Vector3Cls.method("Distance").invoke(
                  _gpos,
                  getTransform(_pl).method("get_position").invoke(),
                );
                if (_d < _minD) {
                  _minD = _d;
                  _target = _pl;
                }
              }
              if (_target && !_target.handle.isNull())
                _target
                  .method("RPC_AddForce")
                  .invoke(
                    Vector3Cls.method("op_Addition").invoke(
                      [0, 0, 0],
                      [0, 80, 0],
                    ),
                  );
            } catch (_e) {
              console.error("Fling Player Gun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Fling All",
          isTogglable: false,
          toolTip: "fling everyone up",
          method: () => {
            try {
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              let _cnt = 0;
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                _pl
                  .method("RPC_AddForce")
                  .invoke(
                    Vector3Cls.method("op_Addition").invoke(
                      [0, 0, 0],
                      [0, 80, 0],
                    ),
                  );
                _cnt++;
              }
              currentNotification = "Flung " + _cnt + " players!";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("Fling All:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Tag All Stinky",
          isTogglable: false,
          toolTip: "tag everyone stinky",
          method: () => {
            try {
              let _cnt = 0;
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                try {
                  _pl.method("RPC_TagAsStinky").invoke();
                  _cnt++;
                } catch (_) {}
              }
              currentNotification = "Stinkied " + _cnt + " players!";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("Tag All Stinky:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Kill All",
          isTogglable: false,
          toolTip: "obliterate everyone",
          method: () => {
            try {
              const _sfx = SFXManagerCls.field("_instance")
                .value.method("get__currentRunner")
                .invoke();
              let _cnt = 0;
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                try {
                  const _pos = getTransform(_pl)
                    .method("get_position")
                    .invoke();
                  for (const _vk of Object.keys(VFXTypes)) {
                    if (_vk === "None") continue;
                    try {
                      n5PlayVFXAt(VFXTypes[_vk], _pos, identityRotation);
                    } catch (_) {}
                  }
                  _pl.method("RPC_Teleport").invoke([0, -99999, 0]);
                  _pl
                    .method("RPC_AddForce")
                    .invoke(
                      Vector3Cls.method("op_Addition").invoke(
                        [0, 0, 0],
                        [0, 500, 0],
                      ),
                    );
                  _pl.method("RPC_SetColorHSV").invoke(NaN, NaN, NaN, NaN);
                  _cnt++;
                } catch (_) {}
              }
              currentNotification = "Killed " + _cnt + " players!";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("Kill All:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Scale All +",
          isTogglable: false,
          toolTip: "make everyone big",
          method: () => {
            try {
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                try {
                  _pl.method("RPC_ApplyBuff").invoke(10);
                } catch (_) {}
              }
              currentNotification = "Scaled up all players";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("Scale All:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Scale All -",
          isTogglable: false,
          toolTip: "make everyone small",
          method: () => {
            try {
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                try {
                  _pl.method("RPC_ApplyBuff").invoke(-10);
                } catch (_) {}
              }
              currentNotification = "Shrunk all players";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("Scale All:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Drag Player",
          isTogglable: true,
          toolTip: "pull player to ur aim",
          method: () => {
            if (!rightGrab) return;
            const _g = getGunPointerResult(),
              _gp = _g.gunPointer;
            if (!_gp || _gp.isNull()) return;
            if (!(time > tagGunDelay)) return;
            tagGunDelay = time + 0.1;
            try {
              const _gpos = getTransform(_gp).method("get_position").invoke();
              const _myPos = getTransform(gorillaLocomotionInstance)
                .method("get_position")
                .invoke();
              let _minD = Number.MAX_SAFE_INTEGER,
                _target = null;
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                const _d = Vector3Cls.method("Distance").invoke(
                  _gpos,
                  getTransform(_pl).method("get_position").invoke(),
                );
                if (_d < _minD) {
                  _minD = _d;
                  _target = _pl;
                }
              }
              if (_target && !_target.handle.isNull()) {
                const _tpos = getTransform(_target)
                  .method("get_position")
                  .invoke();
                const _dir = Vector3Cls.method("op_Subtraction", 2).invoke(
                  _myPos,
                  _tpos,
                );
                _target
                  .method("RPC_AddForce")
                  .invoke(Vector3Cls.method("op_Multiply").invoke(_dir, 25));
              }
            } catch (_e) {
              console.error("Drag Player:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Give Self Money",
          isTogglable: false,
          toolTip: "give urself money",
          method: () => {
            try {
              acImage
                .class("AnimalCompany.GameManager")
                .method("AddPlayerMoney")
                .invoke(999999);
              currentNotification = " Money given!";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "Give money failed";
              notifactionResetTime = time + 2;
            }
          },
        }),
        new MenuItem({
          buttonText: "Pay All Money",
          isTogglable: false,
          toolTip: "give everyone money",
          method: () => {
            try {
              let _cnt = 0;
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                try {
                  _pl.method("RPC_AddPlayerMoney").invoke(777777);
                  _cnt++;
                } catch (_) {}
              }
              currentNotification = " Paid " + _cnt + " players";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "Pay all failed";
              notifactionResetTime = time + 2;
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn Item (hand)",
          isTogglable: false,
          toolTip: "spawn item at hand",
          method: () => {
            try {
              const _rh =
                gorillaLocomotionInstance.field("rightHandTransform").value;
              const _pos = _rh.method("get_position").invoke();
              const _spawned = n5SpawnConfiguredItemAt(
                itemIDs[itemIndex],
                _pos,
                identityRotation,
              );
              currentNotification = _spawned
                ? " " + itemIDs[itemIndex]
                : "Spawn failed";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "Spawn failed";
              notifactionResetTime = time + 2;
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn Mob (hand)",
          isTogglable: false,
          toolTip: "spawn mob at hand",
          method: () => {
            try {
              const _rh =
                gorillaLocomotionInstance.field("rightHandTransform").value;
              const _pos = _rh.method("get_position").invoke();
              const _spawned = n5SpawnMobAt(
                mobIDs[mobIndex],
                _pos,
                identityRotation,
              );
              currentNotification = _spawned
                ? " " + mobIDs[mobIndex]
                : "Mob spawn failed";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "Mob spawn failed";
              notifactionResetTime = time + 2;
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn All Items (hand)",
          isTogglable: false,
          toolTip: "spawn all items at hand",
          method: () => {
            try {
              const _rh =
                gorillaLocomotionInstance.field("rightHandTransform").value;
              const _pos = _rh.method("get_position").invoke();
              let _spawned = 0;
              for (let _i = 0; _i < itemIDs.length; _i++) {
                try {
                  if (n5SpawnItemAt(itemIDs[_i], _pos, identityRotation))
                    _spawned++;
                } catch (_) {}
              }
              currentNotification =
                " Spawned " + _spawned + "/" + itemIDs.length + " items";
              notifactionResetTime = time + 3;
            } catch (_e) {
              currentNotification = "Spawn all items failed";
              notifactionResetTime = time + 2;
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn All Mobs (hand)",
          isTogglable: false,
          toolTip: "spawn all mobs at hand",
          method: () => {
            try {
              const _rh =
                gorillaLocomotionInstance.field("rightHandTransform").value;
              const _pos = _rh.method("get_position").invoke();
              let _spawned = 0;
              for (let _i = 0; _i < mobIDs.length; _i++) {
                try {
                  if (n5SpawnMobAt(mobIDs[_i], _pos, identityRotation))
                    _spawned++;
                } catch (_) {}
              }
              currentNotification =
                " Spawned " + _spawned + "/" + mobIDs.length + " mobs";
              notifactionResetTime = time + 3;
            } catch (_e) {
              currentNotification = "Spawn all mobs failed";
              notifactionResetTime = time + 2;
            }
          },
        }),
        new MenuItem({
          buttonText: "Rainbow Monsters",
          isTogglable: true,
          toolTip: "rainbow all mobs",
          method: () => {
            try {
              const _mobCls = acImage.class("AnimalCompany.MobController");
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(_mobCls)
                .invoke(0);
              if (!_all || _all.length === 0) return;
              for (let _i = 0; _i < _all.length; _i++) {
                try {
                  const _h = (time * 0.3) % 1;
                  _all
                    .get(_i)
                    .method("RPC_SetColorHSV")
                    .invoke(0.1, _h, 1.0, 1.0);
                } catch (_) {}
              }
            } catch (_e) {}
          },
        }),
        new MenuItem({
          buttonText: "Rainbow Players",
          isTogglable: true,
          toolTip: "rainbow all players",
          method: () => {
            try {
              const _h = (time * 0.3) % 1;
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                try {
                  _pl.method("RPC_SetColorHSV").invoke(_h, 0.1, 1.0, 1.0);
                } catch (_) {}
              }
            } catch (_e) {}
          },
        }),
        new MenuItem({
          buttonText: "Up All",
          isTogglable: true,
          toolTip: "launch everyone up constantly",
          method: () => {
            try {
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                try {
                  _pl.method("RPC_AddForce").invoke([0, 100, 0]);
                } catch (_) {}
              }
            } catch (_e) {}
          },
        }),
        new MenuItem({
          buttonText: "Stun All",
          isTogglable: true,
          toolTip: "Continuously stuns all players",
          method: () => {
            try {
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                try {
                  const _pos = _pl
                    .method("get_transform")
                    .invoke()
                    .method("get_position")
                    .invoke();
                  _pl.method("RPC_PlayerStun").invoke(_pos, 5, 1, 0);
                } catch (_) {}
              }
            } catch (_e) {}
          },
        }),
        new MenuItem({
          buttonText: "Kick All",
          isTogglable: true,
          toolTip: "kick everyone",
          method: () => {
            try {
              const _kickCls = acImage.class("AnimalCompany.NetSessionRPCs");
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                try {
                  const _uid = _pl.field("_userID").value;
                  _kickCls.method("RPC_KickPlayer").invoke(_uid);
                } catch (_) {}
              }
            } catch (_e) {}
          },
        }),
        new MenuItem({
          buttonText: "Kill All Players",
          isTogglable: false,
          toolTip: "kill everyone",
          method: () => {
            try {
              let _cnt = 0;
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                try {
                  const _pos = _pl
                    .method("get_transform")
                    .invoke()
                    .method("get_position")
                    .invoke();
                  _pl
                    .method("RPC_PlayerHit")
                    .invoke(2147483647, _pos, nullObjectRef);
                  _cnt++;
                } catch (_) {}
              }
              currentNotification = " Killed " + _cnt + " players";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "Kill players failed";
              notifactionResetTime = time + 2;
            }
          },
        }),
        new MenuItem({
          buttonText: "TP Death",
          isTogglable: false,
          toolTip: "void all players",
          method: () => {
            try {
              let _cnt = 0;
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (!_pl || _pl.handle.isNull()) continue;
                try {
                  _pl.method("RPC_Teleport").invoke([0, -9999999, 0]);
                  _cnt++;
                } catch (_) {}
              }
              currentNotification = "TP Death: " + _cnt + " players";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "TP Death failed";
              notifactionResetTime = time + 2;
            }
          },
        }),
        new MenuItem({
          buttonText: "TP Items Death",
          isTogglable: false,
          toolTip: "void all items",
          method: () => {
            try {
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(GrabbableItemCls)
                .invoke(0);
              if (!_all || _all.length === 0) {
                currentNotification = "No items found";
                notifactionResetTime = time + 2;
                return;
              }
              let _cnt = 0;
              for (let _i = 0; _i < _all.length; _i++) {
                try {
                  _all.get(_i).method("RPC_Teleport").invoke([0, -9999999, 0]);
                  _cnt++;
                } catch (_) {}
              }
              currentNotification = "Yeeted " + _cnt + " items";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "TP items failed";
              notifactionResetTime = time + 2;
            }
          },
        }),
        new MenuItem({
          buttonText: "Whitelist mods",
          method: () => {
            ((currentCategory = 10), (currentPage = -7135 + 7135));
          },
          isTogglable: false,
          toolTip: "Opens the test category.",
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to Local Player",
          method: () => {
            ((currentCategory = 32), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "Returns you back to the Local Player category.",
        }),
        new MenuItem({
          buttonText: "Custom hue Held Item",
          method: () => {
            try {
              const _vx3d1 = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_vx3d1) return;
              const _vx40b = _vx3d1.method("GetHandInteractor", 1).invoke(0);
              if (!_vx40b) return;
              const _vx64a = _vx40b.field("_itemAnchor").value;
              if (!_vx64a) return;
              const _vx59b = _vx64a.method("get_grabbableObject").invoke();
              if (!_vx59b) return;
              if (rightGrab) {
                hueVal++;
                if (hueVal > 127) hueVal = -127;
              }
              if (leftGrab) {
                hueVal--;
                if (hueVal < -127) hueVal = 127;
              }
              _vx59b.method("set_colorHue").invoke(hueVal);
            } catch (_vx5b3) {
              console.error(_vx5b3);
            }
          },
          isTogglable: true,
          toolTip: "Hold A to increase, grip to decrease scale of held item.",
        }),
        new MenuItem({
          buttonText: "Custom saturation Held Item",
          method: () => {
            try {
              const _vx1de = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_vx1de) return;
              const _vxd13 = _vx1de.method("GetHandInteractor", 1).invoke(0);
              if (!_vxd13) return;
              const _vx295 = _vxd13.field("_itemAnchor").value;
              if (!_vx295) return;
              const _vx360 = _vx295.method("get_grabbableObject").invoke();
              if (!_vx360) return;
              if (rightGrab) {
                satVal++;
                if (satVal > 127) satVal = -127;
              }
              if (leftGrab) {
                satVal--;
                if (satVal < -127) satVal = 127;
              }
              _vx360.method("set_colorSaturation").invoke(satVal);
            } catch (_vx1c3) {
              console.error(_vx1c3);
            }
          },
          isTogglable: true,
          toolTip: "Hold A to increase, grip to decrease scale of held item.",
        }),
        new MenuItem({
          buttonText: "Custom Scale Held Item",
          method: () => {
            try {
              const _vx29b = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_vx29b) return;
              const _vx3e1 = _vx29b.method("GetHandInteractor", 1).invoke(0);
              if (!_vx3e1) return;
              const _vx7ef = _vx3e1.field("_itemAnchor").value;
              if (!_vx7ef) return;
              const _vx22c = _vx7ef.method("get_grabbableObject").invoke();
              if (!_vx22c) return;
              if (rightGrab) {
                scaleVal++;
                if (scaleVal > 127) scaleVal = -127;
              }
              if (leftGrab) {
                scaleVal--;
                if (scaleVal < -127) scaleVal = 127;
              }
              _vx22c.method("set_scaleModifier").invoke(scaleVal);
            } catch (_vxd6f) {
              console.error(_vxd6f);
            }
          },
          isTogglable: true,
          toolTip: "Hold A to increase, grip to decrease scale of held item.",
        }),
        new MenuItem({
          buttonText: "Jelly Held Item",
          method: () => {
            try {
              const _pl = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_pl) return;
              const _hand = _pl.method("GetHandInteractor", 1).invoke(0);
              if (!_hand) return;
              const _anchor = _hand.field("_itemAnchor").value;
              if (!_anchor) return;
              const _held = _anchor.method("get_grabbableObject").invoke();
              if (!_held) return;
              if (rightGrab) jellyVal = Math.min(255, jellyVal + 5);
              if (leftGrab) jellyVal = Math.max(0, jellyVal - 5);
              const _byte = jellyVal & 255;
              try {
                _held.method("SetJellyStrengthData").invoke(_byte);
              } catch (_) {}
              try {
                _held.method("RPC_SetJellyStrengthData").invoke(_byte);
              } catch (_) {}
              try {
                _held.method("SetJellyStrength").invoke(_byte / 255.0);
              } catch (_) {}
              try {
                _held.method("set_jellyStrength").invoke(_byte);
              } catch (_) {}
              try {
                _held.field("_jellyStrength").value = _byte;
              } catch (_) {}
              try {
                _held.method("HandleJellyStrengthChanged").invoke();
              } catch (_) {}
              if (time > tagGunDelay) {
                currentNotification = "Jelly: " + _byte;
                notifactionResetTime = time + 1.5;
                tagGunDelay = time + 0.25;
              }
            } catch (_e) {
              console.error("[Jelly Held Item]", _e);
            }
          },
          isTogglable: true,
          toolTip: "hold right grip to increase jelly, left grip to decrease",
        }),
        new MenuItem({
          buttonText: "Infinite Item Value",
          method: () => {
            n5SetHeldItemValue(n5HeldValueAmount);
          },
          isTogglable: false,
          toolTip: "sets held item additional sell value huge",
        }),
        new MenuItem({
          buttonText: "Item Value +",
          method: () => {
            n5HeldValueAmount = Math.min(2147483647, n5HeldValueAmount * 10);
            currentNotification = "Held value amount: " + n5HeldValueAmount;
            notifactionResetTime = time + 2;
          },
          isTogglable: false,
          toolTip: "raise item value amount",
        }),
        new MenuItem({
          buttonText: "Item Value -",
          method: () => {
            n5HeldValueAmount = Math.max(999, (n5HeldValueAmount / 10) | 0);
            currentNotification = "Held value amount: " + n5HeldValueAmount;
            notifactionResetTime = time + 2;
          },
          isTogglable: false,
          toolTip: "lower item value amount",
        }),
        new MenuItem({
          buttonText: "Never Despawn Items",
          enableMethod: () => {
            n5InstallNeverDespawnHook();
            n5NeverDespawnItems = true;
            n5RunNeverDespawnItems();
            currentNotification = "Never Despawn Items ON";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5NeverDespawnItems = false;
            currentNotification = "Never Despawn Items OFF";
            notifactionResetTime = time + 2;
          },
          method: () => n5RunNeverDespawnItems(),
          isTogglable: true,
          toolTip: "keeps GrabbableItem despawn timers disabled",
        }),
        new MenuItem({
          buttonText: "No Recoil",
          enableMethod: () => {
            n5NoRecoilEnabled = true;
            n5RunNoRecoil(true);
            currentNotification = "No Recoil ON";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5NoRecoilEnabled = false;
            currentNotification = "No Recoil OFF";
            notifactionResetTime = time + 2;
          },
          method: () => n5RunNoRecoil(false),
          isTogglable: true,
          toolTip: "removes recoil and spread from guns",
        }),
        new MenuItem({
          buttonText: "Rainbow Held Item",
          method: () => {
            try {
              const _vx223 = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_vx223) return;
              const _vx5bf = _vx223.method("GetHandInteractor", 1).invoke(0);
              if (!_vx5bf) return;
              const _vx580 = _vx5bf.field("_itemAnchor").value;
              if (!_vx580) return;
              const _vx3f4 = _vx580.method("get_grabbableObject").invoke();
              if (!_vx3f4) return;
              if (rightGrab) {
                (hueVal++, satVal++);
                if (hueVal > 127) hueVal = -127;
                if (satVal > 127) satVal = -127;
              }
              if (leftGrab) {
                (hueVal--, satVal--);
                if (hueVal < -127) hueVal = 127;
                if (satVal > 127) satVal = -127;
              }
              (_vx3f4.method("set_colorHue").invoke(hueVal),
                _vx3f4.method("set_colorSaturation").invoke(satVal));
            } catch (_vx36c) {
              console.error(_vx36c);
            }
          },
          isTogglable: true,
          toolTip: "Hold A to increase, grip to decrease hue of held item.",
        }),
        new MenuItem({
          buttonText: "Rainbow All Items",
          method: () => {
            try {
              if (rightGrab && time > tagGunDelay) {
                tagGunDelay = time + 0.1;
                hueVal += 5;
                satVal += 5;
                if (hueVal > 127) hueVal = -127;
                if (satVal > 127) satVal = -127;
              }
              if (leftGrab && time > tagGunDelay) {
                tagGunDelay = time + 0.1;
                hueVal -= 5;
                satVal -= 5;
                if (hueVal < -127) hueVal = 127;
                if (satVal < -127) satVal = 127;
              }
              if (frameCount % 60 === 0 || !cachedItems)
                cachedItems = UnityObjectCls.method("FindObjectsByType", 1)
                  .inflate(GrabbableObjectCls2)
                  .invoke(0);
              if (frameCount % 5 !== 0) return;
              if (cachedItems)
                for (let _vx41f = 0; _vx41f < cachedItems.length; _vx41f++) {
                  const _vx2f3 = cachedItems.get(_vx41f);
                  if (!_vx2f3 || _vx2f3.handle.isNull()) continue;
                  _vx2f3.method("set_colorHue").invoke(hueVal);
                  _vx2f3.method("set_colorSaturation").invoke(satVal);
                }
            } catch (_vx445) {
              console.error(_vx445);
            }
          },
          isTogglable: true,
          toolTip: "Hold grip to cycle rainbow on all items.",
        }),
        new MenuItem({
          buttonText: "random Held Item",
          method: () => {
            try {
              const _vx349 = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_vx349) return;
              const _vx388 = _vx349.method("GetHandInteractor", 1).invoke(0);
              if (!_vx388) return;
              const _vx26b = _vx388.field("_itemAnchor").value;
              if (!_vx26b) return;
              const _vx2b8 = _vx26b.method("get_grabbableObject").invoke();
              if (!_vx2b8) return;
              if (rightGrab) {
                hueVal++;
                satVal++;
                scaleVal++;
                if (hueVal > 127) hueVal = -127;
                if (satVal > 127) satVal = -127;
                if (scaleVal > 127) scaleVal = -127;
              }
              if (leftGrab) {
                hueVal--;
                satVal--;
                scaleVal--;
                if (hueVal < -127) hueVal = 127;
                if (satVal < -127) satVal = 127;
                if (scaleVal < -127) scaleVal = 127;
              }
              _vx2b8.method("set_colorHue").invoke(hueVal);
              _vx2b8.method("set_colorSaturation").invoke(satVal);
              _vx2b8.method("set_scaleModifier").invoke(scaleVal);
            } catch (_vx3e9) {
              console.error(_vx3e9);
            }
          },
          isTogglable: true,
          toolTip: "Hold A to increase, grip to decrease hue of held item.",
        }),
        new MenuItem({
          buttonText: "random All Items",
          method: () => {
            try {
              if (frameCount % 60 === 0 || !cachedItems)
                cachedItems = UnityObjectCls.method("FindObjectsByType", 1)
                  .inflate(GrabbableObjectCls2)
                  .invoke(0);
              if (frameCount % 5 !== 0) return;
              if (!cachedItems) return;
              for (let _vx200 = 0; _vx200 < cachedItems.length; _vx200++) {
                const _vx32d = cachedItems.get(_vx200);
                if (!_vx32d || _vx32d.handle.isNull()) continue;
                const _h = Math.floor(Math.random() * 255 - 127);
                const _s = Math.floor(Math.random() * 255 - 127);
                const _sc = Math.floor(Math.random() * 255 - 127);
                _vx32d.method("set_colorHue").invoke(_h);
                _vx32d.method("set_colorSaturation").invoke(_s);
                _vx32d.method("set_scaleModifier").invoke(_sc);
              }
            } catch (_vx427) {
              console.error(_vx427);
            }
          },
          isTogglable: true,
          toolTip: "Hold grip to cycle rainbow on all items.",
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to Combat",
          method: () => {
            ((currentCategory = 43), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "Returns you back to the Combat hub.",
        }),
        new MenuItem({
          buttonText: "Spawn Poop",
          method: () => {
            try {
              const _vx1a6 = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_vx1a6 || _vx1a6.handle.isNull()) return;
              const _vx5d4 = getTransform(_vx1a6)
                .method("get_position")
                .invoke();
              PrefabGeneratorCls.method("GeneratePrefab").invoke(
                0,
                _vx5d4,
                identityRotation,
                false,
              );
            } catch (_vx1a5) {
              console.error("Spawn poop error:", _vx1a5);
            }
          },
          isTogglable: false,
          toolTip: "Spawns a DeadBody_Poop prefab at your position.",
        }),
        new MenuItem({
          buttonText: "Spawn Splashes",
          method: () => {
            try {
              const _vx4dd = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_vx4dd || _vx4dd.handle.isNull()) return;
              const _vx7a0 = getTransform(_vx4dd)
                .method("get_position")
                .invoke();
              PrefabGeneratorCls.method("GeneratePrefab").invoke(
                1,
                _vx7a0,
                identityRotation,
                false,
              );
            } catch (_vx558) {
              console.error("Spawn splashes error:", _vx558);
            }
          },
          isTogglable: false,
          toolTip: "Spawns a Splashes prefab at your position.",
        }),
        new MenuItem({
          buttonText: "Spawn Items",
          method: () => {
            _vx5dc = rightHandTransform;
            if (rightSecondary && rightGrab)
              try {
                const _vx472 = n5SpawnConfiguredItemAt(
                  itemIDs[itemIndex],
                  _vx5dc.method("get_position").invoke(),
                  _vx5dc.method("get_rotation").invoke(),
                );
                !_vx472
                  ? setNotification(
                      "Spawn returned null: " + itemIDs[itemIndex],
                      false,
                    )
                  : setNotification("Spawned: " + itemIDs[itemIndex], false);
              } catch (_vx25a) {
                n5LogErr("Hand spawn", _vx25a);
                setNotification("Spawn failed: " + _vx25a, false);
              }
          },
          isTogglable: true,
          toolTip: "Spawns items in your right hand (hold grip + B).",
        }),
        new MenuItem({
          buttonText: "Random Hand Duper",
          method: () => {
            _vx192 = {
              znBSL: function (_vx5e1, _vx35d) {
                const _vx2ce = getString;
                return _vx5e1 + _vx35d;
              },
              UAvks: function (_vx3e4, _vx4be) {
                const _vx3bb = getString;
                return _vx3e4(_vx4be);
              },
              DBpsM: function (_vx2b8, _vx47b) {
                const _vx321 = getString;
                return _vx2b8(_vx47b);
              },
              OQyyF: function (_vx10d, _vx516) {
                const _vx150 = getString;
                return _vx10d(_vx516);
              },
            };
            if (!rightSecondary) return;
            function _vx431(_vx236, _vx111) {
              const _vx543 = getString;
              return _vx192.znBSL(
                Math.floor(
                  _vx192.UAvks(
                    Math.random(),
                    _vx192.DBpsM(_vx192.OQyyF(_vx111, _vx236), 1),
                  ),
                ),
                _vx236,
              );
            }
            try {
              const _vxf2f = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_vxf2f) return;
              const _vx4a4 = _vxf2f.method("GetHandInteractor", 1).invoke(0);
              if (!_vx4a4) return;
              const _vxfbe = _vx4a4.field("_itemAnchor").value;
              if (!_vxfbe) return;
              const _vx50a = _vxfbe.method("get_grabbableObject").invoke();
              if (!_vx50a || _vx50a.isNull()) return;
              let _vx3f6 = "item_treestick";
              const _vx31a = _vx50a
                .method("GetComponent", 1)
                .inflate(GrabbableItemCls)
                .invoke();
              if (_vx31a && !_vx31a.isNull()) {
                const _vx4cf = _vx31a.method("get_itemID").invoke();
                if (_vx4cf && !_vx4cf.isNull()) _vx3f6 = _vx4cf.content;
              }
              const _vx604 = leftHandTransform.method("get_position").invoke(),
                _vx45a = PrefabGeneratorCls.method("SpawnItem", 4).invoke(
                  Il2Cpp.string("item_prefab/" + _vx3f6),
                  _vx604,
                  identityRotation,
                  nullObjectRef,
                );
              if (!_vx45a || _vx45a.isNull()) return;
              const _vx1a2 = _vx45a
                .method("GetComponent", 1)
                .inflate(GrabbableObjectCls2)
                .invoke();
              if (_vx1a2 && !_vx1a2.isNull()) {
                (_vx1a2.method("set_scaleModifier").invoke(_vx431(-128, 127)),
                  _vx1a2.method("set_colorHue").invoke(_vx431(-127, 127)),
                  _vx1a2
                    .method("set_colorSaturation")
                    .invoke(_vx431(-20, 127)));
                const _vx2f6 = leftHandTransform.method("get_forward").invoke(),
                  _vx467 = Vector3Cls.method("op_Multiply", 2).invoke(
                    _vx2f6,
                    10,
                  );
                _vx1a2.method("AddExternalForceVelocity", 1).invoke(_vx467);
              }
            } catch (_vx5f4) {
              n5LogErr("Random Hand Duper", _vx5f4);
            }
          },
          isTogglable: true,
          toolTip: "Dupe item held in left hand with random config (Hold B).",
        }),
        new MenuItem({
          buttonText: "Spawn Items Gun",
          isTogglable: true,
          method: () => {
            if (!rightGrab) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray) || !rightTrigger) return;
            try {
              const _res = n5SpawnConfiguredItemAt(
                itemIDs[itemIndex],
                _g.endPosition,
                identityRotation,
              );
              setNotification(
                _res
                  ? "Spawned: " + itemIDs[itemIndex]
                  : "Spawn failed: " + itemIDs[itemIndex],
                false,
              );
            } catch (_vxb4b) {
              n5LogErr("Item spawn gun", _vxb4b);
              setNotification("Spawn failed: " + _vxb4b, false);
            }
          },
          toolTip: "Spawns items where you aim (hold grip, pull trigger).",
        }),
        new MenuItem({
          buttonText: "Spawn Mob",
          method: () => {
            _vx5bc = rightHandTransform;
            if (rightSecondary && rightGrab)
              try {
                const _vx1d8 = n5SpawnMobAt(
                  mobIDs[mobIndex],
                  _vx5bc.method("get_position").invoke(),
                  _vx5bc.method("get_rotation").invoke(),
                );
                !_vx1d8
                  ? setNotification(
                      "Mob spawn returned null: " + mobIDs[mobIndex],
                      false,
                    )
                  : setNotification("Spawned mob: " + mobIDs[mobIndex], false);
              } catch (_vx352) {
                n5LogErr("Mob hand spawn", _vx352);
                setNotification("Mob spawn failed: " + _vx352, false);
              }
          },
          isTogglable: true,
          toolTip: "Spawns mob at your right hand (hold grip + B).",
        }),
        new MenuItem({
          buttonText: "Spawn Mob Gun",
          isTogglable: true,
          method: () => {
            if (!rightGrab) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray) || !rightTrigger) return;
            try {
              const _res = n5SpawnMobAt(
                mobIDs[mobIndex],
                _g.endPosition,
                identityRotation,
              );
              setNotification(
                _res
                  ? "Spawned mob: " + mobIDs[mobIndex]
                  : "Mob spawn failed: " + mobIDs[mobIndex],
                false,
              );
            } catch (_vx58f) {
              n5LogErr("Mob gun spawn", _vx58f);
              setNotification("Mob spawn failed: " + _vx58f, false);
            }
          },
          toolTip: "Spawns mob where you aim (hold grip, pull trigger).",
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to Combat",
          method: () => {
            ((currentCategory = 43), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "Returns you back to the Combat hub.",
        }),
        new MenuItem({
          buttonText: "Disintegrate Gun",
          method: () => {
            if (rightGrab) {
              const _g = getGunPointerResult();
              if (!n5GunRayOk(_g.ray)) return;
              if (rightTrigger && time > lagGunDelay) {
                lagGunDelay = time + 0.5;
                try {
                  const _vx4c8 = _g.endPosition;
                  let _vx289 = Number.MAX_SAFE_INTEGER,
                    _argPlayer = null;
                  const _vx55b = NetPlayerCls.field(
                      "playerIDToNetPlayer",
                    ).value,
                    _vx346 = _vx55b.method("get_Values").invoke(),
                    _vxf30 = _vx346.method("GetEnumerator").invoke();
                  while (_vxf30.method("MoveNext").invoke()) {
                    const _vx3d6 = _vxf30.method("get_Current").invoke();
                    if (!_vx3d6 || _vx3d6.handle.isNull()) continue;
                    if (getIsMine(_vx3d6)) continue;
                    const _vx540 = getTransform(_vx3d6)
                        .method("get_position")
                        .invoke(),
                      _vx2a3 = Vector3Cls.method("Distance").invoke(
                        _vx4c8,
                        _vx540,
                      );
                    _vx2a3 < _vx289 &&
                      ((_vx289 = _vx2a3), (_argPlayer = _vx3d6));
                  }
                  if (_argPlayer && !_argPlayer.handle.isNull()) {
                    const _vx2a8 = getTransform(_argPlayer)
                        .method("get_position")
                        .invoke(),
                      _vx41f = [
                        VFXTypes.MuzzleFlash_Shotgun,
                        VFXTypes.MuzzleFlash_FlareGun,
                        VFXTypes.CrateBreak,
                        VFXTypes.MuzzleFlash_SmallGun,
                        VFXTypes.MuzzleFlash_GoldRevolver,
                        VFXTypes.MuzzleFlash_DragonPistol,
                        VFXTypes.MuzzleFlash_ViperShotgun,
                        VFXTypes.Explosion_FlareGun,
                        VFXTypes.Explosion_Coins,
                        VFXTypes.Explosion_Nuts,
                        VFXTypes.Explosion_Keys,
                        VFXTypes.Explosion_Balloon,
                        VFXTypes.Explosion_TeleGrenadeSrc,
                        VFXTypes.Player_Touch_Lava,
                        VFXTypes.Portal_Teleport,
                        VFXTypes.Explosion_Coins_Vertical,
                        VFXTypes.Autumn_Leaves_Burst,
                        VFXTypes.Explosion_Feathers,
                        VFXTypes.Explosion_Popcorn,
                        VFXTypes.Electricity_Small,
                        VFXTypes.Impact_Snowball,
                        VFXTypes.Impact_GoldRevolver,
                        VFXTypes.Impact_MeleeHit,
                        VFXTypes.Impact_BigGroundHit,
                        VFXTypes.Impact_MeleeHit_CriticalSmall,
                        VFXTypes.Impact_MeleeHit_CriticalLarge,
                        VFXTypes.Impact_MeleeHit_AoE,
                        VFXTypes.Research_ZiplineAttachDetach,
                        VFXTypes.Research_Purchase1RP,
                        VFXTypes.Research_Purchase5RP,
                        VFXTypes.Research_Purchase10RP,
                        VFXTypes.Research_PurchaseRPBundle,
                        VFXTypes.Rope_ZiplineAttachDetach,
                        VFXTypes.MeatExplosion_1,
                        VFXTypes.MeatExplosion_2,
                        VFXTypes.MeatExplosion_Headshot,
                        VFXTypes.ServerRoomSplash_Small,
                        VFXTypes.ServerRoomSplash_Big,
                        VFXTypes.RAMActivationSparks,
                        VFXTypes.GreenBlink,
                        VFXTypes.ConfettiBurst,
                        VFXTypes.Ethereal_Void,
                        VFXTypes.MomBoss_NailBreak,
                        VFXTypes.MidAirJump_Fart,
                        VFXTypes.FuelExplosion,
                      ],
                      _vx4db = SFXManagerCls.field("_instance")
                        .value.method("get__currentRunner")
                        .invoke();
                    for (const _vx484 of _vx41f) {
                      n5PlayVFXAt(_vx484, _vx2a8, identityRotation);
                    }
                    const _vx485 = _argPlayer.method("get_transform").invoke(),
                      _vx4e4 = _vx485.method("get_forward").invoke(),
                      _vx898 = Vector3Cls.method("op_Multiply", 2).invoke(
                        _vx4e4,
                        1500 * deltaTime,
                      );
                    (_argPlayer
                      .method("RPC_Teleport")
                      .invoke([108, -9999999, 0]),
                      _argPlayer.method("RPC_AddForce").invoke(_vx898),
                      _argPlayer
                        .method("RPC_SetColorHSV")
                        .invoke(NaN, NaN, NaN, NaN),
                      setNotification(
                        "Disintegrated nearest player to pointer",
                        false,
                      ),
                      console.log(
                        " Disintegrated nearest player to gun pointer with all VFX",
                      ));
                  }
                } catch (_vx57d) {
                  console.error("Disintegrate gun error:", _vx57d);
                }
              }
            }
          },
          isTogglable: true,
          toolTip:
            "Disintegrates player nearest to gun pointer with ALL VFX (hold grip, pull trigger)",
        }),
        new MenuItem({
          buttonText: "TP ALL Gun",
          method: () => {
            if (!rightGrab || !rightTrigger) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            try {
              const _vx2c5 = _g.endPosition,
                _vx193 = NetPlayerCls.field("playerIDToNetPlayer").value,
                _vx5aa = _vx193.method("get_Values").invoke(),
                _vx5bc = _vx5aa.method("GetEnumerator").invoke();
              while (_vx5bc.method("MoveNext").invoke()) {
                const _vx2e4 = _vx5bc.method("get_Current").invoke();
                if (!_vx2e4 || _vx2e4.handle.isNull()) continue;
                if (_vx2e4.method("get_IsMine").invoke()) continue;
                _vx2e4.method("RPC_Teleport").invoke(_vx2c5);
              }
            } catch (_vx26c) {
              console.error("TP ALL Gun error:", _vx26c);
            }
          },
          isTogglable: true,
          toolTip: "Teleports all players to your gun pointer.",
        }),
        new MenuItem({
          buttonText: "Stinky Gun",
          method: () => {
            if (rightGrab) {
              const _vx387 = getGunPointerResult(),
                _vx43d = _vx387.ray;
              if (rightTrigger) {
                const _vx44b =
                  _vx43d && _vx43d.method
                    ? _vx43d.method("get_collider").invoke()
                    : null;
                if (!_vx44b || (_vx44b.isNull && _vx44b.isNull())) return;
                const _vx3e1 = getComponentInParent(_vx44b, NetPlayerCls);
                _vx3e1 &&
                  !_vx3e1.handle.isNull() &&
                  time > tagGunDelay &&
                  !getIsMine(_vx3e1) &&
                  _vx3e1.method("RPC_TagAsStinky").invoke();
              }
            }
          },
          isTogglable: true,
          toolTip: "Stinkies whoever your hand desires.",
        }),
        new MenuItem({
          buttonText: "Infinite Ammo",
          enableMethod: () => {
            InfAmmo = true;
          },
          disableMethod: () => {
            InfAmmo = false;
          },
          isTogglable: true,
          toolTip: "Infinite ammo",
        }),
        new MenuItem({
          buttonText: "Infinite Gun Stats",
          enableMethod: () => {
            n5InfiniteGunStats = true;
            n5RunInfiniteGunStats(true);
          },
          disableMethod: () => {
            n5InfiniteGunStats = false;
            currentNotification = "Infinite Gun Stats OFF";
            notifactionResetTime = time + 2;
          },
          method: () => n5RunInfiniteGunStats(false),
          isTogglable: true,
          toolTip: "max GunConfig stats from dump",
        }),
        new MenuItem({
          buttonText: "Item Force Cannon",
          method: () => n5RunItemForceCannon(),
          isTogglable: true,
          toolTip: "blast items from your aim point",
        }),
        new MenuItem({
          buttonText: "Rapid Fire",
          method: () => {
            try {
              const _flagsArg = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_flagsArg) return;
              const _vx11a = _flagsArg.method("GetHandInteractor", 1).invoke(1);
              if (!_vx11a) return;
              const _vx39e = _vx11a.field("_itemAnchor").value;
              if (!_vx39e) return;
              const _vxbfd = _vx39e.method("get_grabbableObject").invoke();
              if (!_vxbfd) return;
              const _vx1d9 = _flagsArg.method("GetHandInteractor", 1).invoke(0);
              if (!_vx1d9) return;
              const _vx286 = _vx1d9.field("_itemAnchor").value;
              if (!_vx286) return;
              const _vx2f9 = _vx286.method("get_grabbableObject").invoke();
              if (!_vx2f9) return;
              (rightTrigger && _vxbfd.method("HandleTriggerUse").invoke(),
                leftTrigger && _vx2f9.method("HandleTriggerUse").invoke());
            } catch (_vx496) {
              console.error(_vx496);
            }
          },
          isTogglable: true,
          toolTip: "Rapid fire any item used with trigger button.",
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to Local Player",
          method: () => {
            ((currentCategory = 32), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "Returns you back to the Local Player category.",
        }),
        new MenuItem({
          buttonText: "Stash Dupe",
          method: () => (stashDupeEnabled = true),
          disableMethod: () => (stashDupeEnabled = false),
          toolTip: "Lets you eject more times using your stash.",
        }),
        new MenuItem({
          buttonText: "Change Eject Dupe Amount",
          method: () => {
            (ejectDupeIndex++,
              (ejectDupeIndex %= ejectDupeValues.length),
              (ejectDupeAmount = ejectDupeValues[ejectDupeIndex]),
              setNotification(
                _vx476.nmoBZ("[MENU] New eject dupe amount: ", ejectDupeAmount),
                false,
              ));
          },
          isTogglable: false,
          toolTip: "Cycles through preset dupe amounts.",
        }),
        new MenuItem({
          buttonText: "Infinite Ammo",
          enableMethod: () => {
            InfAmmo = true;
          },
          disableMethod: () => {
            InfAmmo = false;
          },
          isTogglable: true,
          toolTip: "Infinite ammo",
        }),
        new MenuItem({
          buttonText: "Remove Shotgun Cooldown",
          enableMethod: () => {
            n5ShotgunNoCooldown = true;
          },
          disableMethod: () => {
            n5ShotgunNoCooldown = false;
          },
          method: () => {
            n5RunShotgunNoCooldown();
          },
          isTogglable: true,
          toolTip: "removes shotgun reload/shoot delay from dump fields",
        }),
        new MenuItem({
          buttonText: "Unlimited Hoverpad Battery",
          enableMethod: () => {
            n5InfiniteHoverpadBattery = true;
            n5RunInfiniteHoverpadBattery();
          },
          disableMethod: () => {
            n5InfiniteHoverpadBattery = false;
          },
          method: () => {
            n5RunInfiniteHoverpadBattery();
          },
          isTogglable: true,
          toolTip: "removes hoverpad limit",
        }),
        new MenuItem({
          buttonText: "Rapid Fire",
          method: () => {
            try {
              const _flagsArg = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_flagsArg) return;
              const _vx11a = _flagsArg.method("GetHandInteractor", 1).invoke(1);
              if (!_vx11a) return;
              const _vx39e = _vx11a.field("_itemAnchor").value;
              if (!_vx39e) return;
              const _vxbfd = _vx39e.method("get_grabbableObject").invoke();
              if (!_vxbfd) return;
              const _vx1d9 = _flagsArg.method("GetHandInteractor", 1).invoke(0);
              if (!_vx1d9) return;
              const _vx286 = _vx1d9.field("_itemAnchor").value;
              if (!_vx286) return;
              const _vx2f9 = _vx286.method("get_grabbableObject").invoke();
              if (!_vx2f9) return;
              (rightTrigger && _vxbfd.method("HandleTriggerUse").invoke(),
                leftTrigger && _vx2f9.method("HandleTriggerUse").invoke());
            } catch (_vx496) {
              console.error(_vx496);
            }
          },
          isTogglable: true,
          toolTip: "Rapid fire any item used with trigger button.",
        }),
        new MenuItem({
          buttonText: "Dev Menu",
          enableMethod: () => {
            try {
              const _appCls = acImage.class("AnimalCompany.App");
              const _isDev = _appCls
                .method("get_state")
                .invoke()
                .method("get_user")
                .invoke()
                .method("get_isDeveloper")
                .invoke();
              _isDev.field("_value").value = true;
            } catch (_e) {
              console.error("[DevMode] App err:", _e);
            }

            if (!devModeHookSet) {
              ItemVendingMachineViewCls.method("RefreshItems").implementation =
                function () {
                  this.field("_devModeOn").value = true;
                  this.method("RefreshItems").invoke();
                };
              devModeHookSet = true;
            }

            try {
              const _pwCls = acImage.class("AnimalCompany.PlayerWatch");
              const _en = _pwCls
                .field("_allWatches")
                .value.method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _w = _en.method("get_Current").invoke();
                if (_w.method("get_IsMine").invoke()) {
                  const _dmv = _w.field("_devMenuView").value;
                  if (_dmv && !_dmv.isNull())
                    _dmv
                      .method("get_gameObject")
                      .invoke()
                      .method("SetActive")
                      .invoke(true);
                  break;
                }
              }
            } catch (_e) {
              console.error("[DevMode] Watch err:", _e);
            }

            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (_lp && !_lp.isNull()) {
                const _paths = [
                  "LeftHand/WalkieTalkieWatch/PlayerWatchView/SizeRoot/WalkieWatchV3/Canvases/Adventure_Canvas/PlayerWatchSideMenu/Interface (Dev)",
                  "LeftHand/WalkieTalkieWatch/PlayerWatchView/SizeRoot/WalkieWatchV3/Canvases/Adventure_Canvas/SideMenu/Interface (Dev)",
                ];
                for (const _p of _paths) {
                  try {
                    const _t = getTransform(_lp)
                      .method("Find")
                      .invoke(Il2Cpp.string(_p));
                    if (_t && !_t.isNull())
                      ComponentCls.method("GetComponent", 0)
                        .inflate(ComponentCls)
                        .invoke()
                        .method("get_gameObject")
                        .invoke()
                        .method("SetActive")
                        .invoke(true);
                  } catch (_e2) {}
                }
              }
            } catch (_e) {
              console.error("[DevMode] Find err:", _e);
            }
            currentNotification = "Dev Mode ON";
            notifactionResetTime = time + 3;
          },
          disableMethod: () => {
            ItemVendingMachineViewCls.method("RefreshItems").implementation =
              null;
            devModeHookSet = false;

            try {
              const _appCls = acImage.class("AnimalCompany.App");
              const _isDev = _appCls
                .method("get_state")
                .invoke()
                .method("get_user")
                .invoke()
                .method("get_isDeveloper")
                .invoke();
              _isDev.field("_value").value = false;
            } catch (_e) {}

            try {
              const _pwCls = acImage.class("AnimalCompany.PlayerWatch");
              const _en = _pwCls
                .field("_allWatches")
                .value.method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _w = _en.method("get_Current").invoke();
                if (_w.method("get_IsMine").invoke()) {
                  const _dmv = _w.field("_devMenuView").value;
                  if (_dmv && !_dmv.isNull())
                    _dmv
                      .method("get_gameObject")
                      .invoke()
                      .method("SetActive")
                      .invoke(false);
                  break;
                }
              }
            } catch (_e) {}
            currentNotification = "Dev Mode OFF";
            notifactionResetTime = time + 3;
          },
          isTogglable: true,
          toolTip: "dev mode",
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to Other Players",
          method: () => {
            ((currentCategory = 42), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "Returns to the Other Players hub.",
        }),
        new MenuItem({
          buttonText: "Whitelist Fly",
          method: () => {
            n5RunWhitelistedFist(0.02, (_rig) => n5WhitelistFlyPlayer(_rig));
          },
          isTogglable: true,
          toolTip: "wl fly",
        }),
        new MenuItem({
          buttonText: "Whitelist Hand RPG",
          method: () => {
            if (time < tagGunDelay) return;
            tagGunDelay = time + 0.05;
            for (let _i = 0; _i < whitelist.length; _i++) {
              const _pl = whitelist[_i];
              if (!_pl) continue;
              try {
                const _fv = _pl
                  .method("get_view")
                  .invoke()
                  .field("_fingerViews").value;
                if (!_fv || _fv.isNull() || _fv.length < 1) continue;
                const _f = _fv.get(0);
                if (
                  _f.field("_indexValue").value > 0.8 &&
                  _f.field("_middleValue").value > 0.8 &&
                  _f.field("_thumbValue").value > 0.8
                ) {
                  const _hand = _pl.field("handRight").value;
                  const _spawnResult = _1e0b92_spawnPrefab(
                    "RPGRocket",
                    _hand.method("get_position").invoke(),
                    _hand.method("get_rotation").invoke(),
                  );
                }
              } catch (_e) {}
            }
            function _1e0b92_spawnPrefab(_name, _pos, _rot) {
              try {
                const _runner = PrefabGeneratorCls.field("_instance")
                  .value.method("get_runner")
                  .invoke();
                if (!_runner || _runner.isNull()) return null;
                const _src = _runner
                  .field("_config")
                  .value.field("PrefabTable")
                  .value.field("_sources").value;
                const _cnt = _src.method("get_Count").invoke();
                for (let _k = 0; _k < _cnt; _k++) {
                  try {
                    const _entry = _src.method("get_Item").invoke(_k);
                    if (
                      _entry
                        .method("get_Description")
                        .invoke()
                        .toString()
                        .includes(_name)
                    ) {
                      const _asset = _entry.method("WaitForResult").invoke();
                      if (!_asset || _asset.isNull()) return null;

                      return null;
                    }
                  } catch (_e2) {}
                }
              } catch (_e) {}
              return null;
            }
          },
          isTogglable: true,
          toolTip: "wl rocket fist",
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Flare",
          method: () => {
            if (time < tagGunDelay) return;
            tagGunDelay = time + 0.1;
            for (let _i = 0; _i < whitelist.length; _i++) {
              const _pl = whitelist[_i];
              if (!_pl) continue;
              try {
                const _fv = _pl
                  .method("get_view")
                  .invoke()
                  .field("_fingerViews").value;
                if (!_fv || _fv.isNull() || _fv.length < 1) continue;
                const _f = _fv.get(0);
                if (
                  _f.field("_indexValue").value > 0.8 &&
                  _f.field("_middleValue").value > 0.8 &&
                  _f.field("_thumbValue").value > 0.8
                ) {
                  const _hand = _pl.field("handRight").value;

                  const _flare = PrefabGeneratorCls.method(
                    "SpawnItem",
                    4,
                  ).invoke(
                    Il2Cpp.string("item_prefab/" + "item_flaregun"),
                    _hand.method("get_position").invoke(),
                    _hand.method("get_rotation").invoke(),
                    nullObjectRef,
                  );
                  if (_flare && !_flare.isNull()) {
                    try {
                      const _rb = _flare
                        .method("GetComponent", 0)
                        .inflate(RigidbodyCls)
                        .invoke();
                      if (_rb && !_rb.isNull()) {
                        _rb.method("set_isKinematic").invoke(false);
                        _rb.method("WakeUp").invoke();
                        _rb
                          .method("set_linearVelocity")
                          .invoke(
                            Vector3Cls.method("op_Multiply", 2).invoke(
                              _hand.method("get_forward").invoke(),
                              30,
                            ),
                          );
                      }
                    } catch (_e2) {}
                  }
                }
              } catch (_e) {}
            }
          },
          isTogglable: true,
          toolTip: "wl flare fist",
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Crate",
          method: () => {
            if (time < tagGunDelay) return;
            tagGunDelay = time + 0.1;
            for (let _i = 0; _i < whitelist.length; _i++) {
              const _pl = whitelist[_i];
              if (!_pl) continue;
              try {
                const _fv = _pl
                  .method("get_view")
                  .invoke()
                  .field("_fingerViews").value;
                if (!_fv || _fv.isNull() || _fv.length < 1) continue;
                const _f = _fv.get(0);
                if (
                  _f.field("_indexValue").value > 0.8 &&
                  _f.field("_middleValue").value > 0.8 &&
                  _f.field("_thumbValue").value > 0.8
                ) {
                  const _hand = _pl.field("handRight").value;
                  PrefabGeneratorCls.method("SpawnItem", 4).invoke(
                    Il2Cpp.string("item_prefab/item_crate"),
                    _hand.method("get_position").invoke(),
                    _hand.method("get_rotation").invoke(),
                    nullObjectRef,
                  );
                }
              } catch (_e) {}
            }
          },
          isTogglable: true,
          toolTip: "wl crate fist",
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Bomb",
          method: () => {
            if (time < tagGunDelay) return;
            tagGunDelay = time + 0.5;
            for (let _i = 0; _i < whitelist.length; _i++) {
              const _pl = whitelist[_i];
              if (!_pl) continue;
              try {
                const _fv = _pl
                  .method("get_view")
                  .invoke()
                  .field("_fingerViews").value;
                if (!_fv || _fv.isNull() || _fv.length < 1) continue;
                const _f = _fv.get(0);
                if (
                  _f.field("_indexValue").value > 0.8 &&
                  _f.field("_middleValue").value > 0.8 &&
                  _f.field("_thumbValue").value > 0.8
                ) {
                  const _hand = _pl.field("handRight").value;
                  const _bomb = PrefabGeneratorCls.method(
                    "SpawnItem",
                    4,
                  ).invoke(
                    Il2Cpp.string("item_prefab/" + "item_dynamite"),
                    _hand.method("get_position").invoke(),
                    _hand.method("get_rotation").invoke(),
                    nullObjectRef,
                  );
                  if (_bomb && !_bomb.isNull()) {
                    try {
                      const _rb = _bomb
                        .method("GetComponent", 0)
                        .inflate(RigidbodyCls)
                        .invoke();
                      if (_rb && !_rb.isNull()) {
                        _rb.method("set_isKinematic").invoke(false);
                        _rb.method("WakeUp").invoke();
                        _rb
                          .method("set_linearVelocity")
                          .invoke(
                            Vector3Cls.method("op_Multiply", 2).invoke(
                              _hand.method("get_forward").invoke(),
                              20,
                            ),
                          );
                      }
                    } catch (_e2) {}
                  }
                }
              } catch (_e) {}
            }
          },
          isTogglable: true,
          toolTip: "wl bomb fist",
        }),
        new MenuItem({
          buttonText: "Whitelist Giveaway",
          method: () => {
            if (time < tagGunDelay) return;
            tagGunDelay = time + 0.3;
            for (let _i = 0; _i < whitelist.length; _i++) {
              const _pl = whitelist[_i];
              if (!_pl) continue;
              try {
                const _fv = _pl
                  .method("get_view")
                  .invoke()
                  .field("_fingerViews").value;
                if (!_fv || _fv.isNull() || _fv.length < 1) continue;
                const _f = _fv.get(0);
                if (
                  _f.field("_indexValue").value > 0.8 &&
                  _f.field("_middleValue").value > 0.8 &&
                  _f.field("_thumbValue").value > 0.8
                ) {
                  const _hand = _pl.field("handRight").value;
                  const _rndItem =
                    itemIDs[Math.floor(Math.random() * itemIDs.length)];
                  PrefabGeneratorCls.method("SpawnItem", 4).invoke(
                    Il2Cpp.string("item_prefab/" + _rndItem),
                    _hand.method("get_position").invoke(),
                    _hand.method("get_rotation").invoke(),
                    nullObjectRef,
                  );
                }
              } catch (_e) {}
            }
          },
          isTogglable: true,
          toolTip: "wl item giveaway",
        }),
        new MenuItem({
          buttonText: "Whitelist Disintegrate",
          method: () => {
            for (let _i = 0; _i < whitelist.length; _i++) {
              const _pl = whitelist[_i];
              if (!_pl || _pl.handle.isNull()) continue;
              const _uid = _pl.field("_userID").value.toString();
              if (!whitelistDisintegrateDelays[_uid])
                whitelistDisintegrateDelays[_uid] = 0;
              try {
                const _fv = _pl
                  .method("get_view")
                  .invoke()
                  .field("_fingerViews").value;
                if (!_fv || _fv.isNull() || _fv.length < 1) continue;
                const _f = _fv.get(0);
                if (
                  _f.field("_thumbValue").value > 0.8 &&
                  time > whitelistDisintegrateDelays[_uid]
                ) {
                  whitelistDisintegrateDelays[_uid] = time + 1.0;

                  const _myPos = getTransform(_pl)
                    .method("get_position")
                    .invoke();
                  let _minD = Number.MAX_SAFE_INTEGER,
                    _target = null;
                  const _en = NetPlayerCls.field("playerIDToNetPlayer")
                    .value.method("get_Values")
                    .invoke()
                    .method("GetEnumerator")
                    .invoke();
                  while (_en.method("MoveNext").invoke()) {
                    const _t = _en.method("get_Current").invoke();
                    if (!_t || _t.handle.isNull()) continue;
                    if (_t.method("get_IsMine").invoke()) continue;
                    if (_t.field("_userID").value.toString() === _uid) continue;
                    const _d = Vector3Cls.method("Distance").invoke(
                      _myPos,
                      getTransform(_t).method("get_position").invoke(),
                    );
                    if (_d < _minD) {
                      _minD = _d;
                      _target = _t;
                    }
                  }
                  if (_target && !_target.handle.isNull()) {
                    const _tpos = getTransform(_target)
                      .method("get_position")
                      .invoke();
                    const _sfxRunner = SFXManagerCls.field("_instance")
                      .value.method("get__currentRunner")
                      .invoke();
                    const _vfxList = [
                      VFXTypes.MuzzleFlash_Shotgun,
                      VFXTypes.CrateBreak,
                      VFXTypes.Explosion_FlareGun,
                      VFXTypes.Explosion_Coins,
                      VFXTypes.Portal_Teleport,
                      VFXTypes.Autumn_Leaves_Burst,
                      VFXTypes.MeatExplosion_1,
                      VFXTypes.MeatExplosion_2,
                      VFXTypes.MeatExplosion_Headshot,
                      VFXTypes.ConfettiBurst,
                      VFXTypes.Ethereal_Void,
                      VFXTypes.FuelExplosion,
                    ];
                    for (const _v of _vfxList) {
                      try {
                        n5PlayVFXAt(_v, _tpos, identityRotation);
                      } catch (_ev) {}
                    }
                    _target.method("RPC_Teleport").invoke([0, -9999999, 0]);
                    _target
                      .method("RPC_AddForce", 3)
                      .invoke(
                        Vector3Cls.method("op_Multiply", 2).invoke(
                          getTransform(_target).method("get_forward").invoke(),
                          9999 * deltaTime,
                        ),
                      );
                    _target
                      .method("RPC_SetColorHSV")
                      .invoke(NaN, NaN, NaN, NaN);
                  }
                }
              } catch (_e) {
                console.error("[WL Disintegrate]", _e);
              }
            }
          },
          isTogglable: true,
          toolTip: "wl disintegrate",
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to World",
          method: () => {
            ((currentCategory = 44), (currentPage = 0));
          },
          isTogglable: false,
          toolTip: "Returns to the World hub.",
        }),
        new MenuItem({
          buttonText: "Change Prefab",
          method: () => {
            rightGrab ? prefabIndex-- : prefabIndex++;
            prefabIndex =
              ((prefabIndex % prefabList.length) + prefabList.length) %
              prefabList.length;
            setNotification("Prefab: " + prefabList[prefabIndex], false);
          },
          isTogglable: false,
          toolTip: "Changes the prefab to spawn. Hold right grip to go back.",
        }),
        new MenuItem({
          buttonText: "Spawn Prefab",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _rot = rightHandTransform.method("get_rotation").invoke();
              const _name = prefabList[prefabIndex];
              const _res = spawnNetworkPrefab(_name, _pos, _rot);
              setNotification(
                _res ? "Spawned: " + _name : "Prefab not found: " + _name,
                false,
              );
            } catch (_vx27f) {
              n5LogErr("SpawnPrefab", _vx27f);
            }
          },
          isTogglable: false,
          toolTip: "Spawns selected prefab at right hand.",
        }),
        new MenuItem({
          buttonText: "Prefab Gun",
          method: () => {
            if (!rightGrab) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            if (!rightTrigger) return;
            try {
              const _name = prefabList[prefabIndex];
              const _res = spawnNetworkPrefab(
                _name,
                _g.endPosition,
                identityRotation,
              );
              setNotification(
                _res ? "Spawned: " + _name : "Prefab not found: " + _name,
                false,
              );
            } catch (_vx3a1) {
              n5LogErr("PrefabGun", _vx3a1);
            }
          },
          isTogglable: true,
          toolTip:
            "Shoots selected prefab where you aim (hold grip + trigger).",
        }),
        new MenuItem({
          buttonText: "Rocket Launcher",
          method: () => n5FirePrefabLauncher("RPGRocket", "rocket", 0),
          isTogglable: true,
          toolTip: "rocket launcher",
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to World",
          isTogglable: false,
          toolTip: "back to world hub",
          method: () => {
            currentCategory = 44;
            currentPage = 0;
          },
        }),
        n5ItemDisplay,
        new MenuItem({
          buttonText: "Item +",
          isTogglable: false,
          toolTip: "next item",
          method: () => {
            itemIndex = (itemIndex + 1) % itemIDs.length;
          },
        }),
        new MenuItem({
          buttonText: "Item -",
          isTogglable: false,
          toolTip: "prev item",
          method: () => {
            itemIndex = (itemIndex - 1 + itemIDs.length) % itemIDs.length;
          },
        }),
        n5MobDisplay,
        new MenuItem({
          buttonText: "Mob +",
          isTogglable: false,
          toolTip: "next mob",
          method: () => {
            mobIndex = (mobIndex + 1) % mobIDs.length;
          },
        }),
        new MenuItem({
          buttonText: "Mob -",
          isTogglable: false,
          toolTip: "prev mob",
          method: () => {
            mobIndex = (mobIndex - 1 + mobIDs.length) % mobIDs.length;
          },
        }),
        n5PrefabDisplay,
        new MenuItem({
          buttonText: "Prefab +",
          isTogglable: false,
          toolTip: "next prefab",
          method: () => {
            prefabIndex = (prefabIndex + 1) % prefabList.length;
          },
        }),
        new MenuItem({
          buttonText: "Prefab -",
          isTogglable: false,
          toolTip: "prev prefab",
          method: () => {
            prefabIndex =
              (prefabIndex - 1 + prefabList.length) % prefabList.length;
          },
        }),
        n5VFXDisplay,
        new MenuItem({
          buttonText: "VFX +",
          isTogglable: false,
          toolTip: "next vfx",
          method: () => {
            vfxIndex = (vfxIndex + 1) % vfxKeys.length;
          },
        }),
        new MenuItem({
          buttonText: "VFX -",
          isTogglable: false,
          toolTip: "prev vfx",
          method: () => {
            vfxIndex = (vfxIndex - 1 + vfxKeys.length) % vfxKeys.length;
          },
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to Misc",
          isTogglable: false,
          toolTip: "back to misc hub",
          method: () => {
            currentCategory = 45;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Save Slot 1",
          isTogglable: false,
          toolTip: "save 1",
          method: () => {
            n5SavePreset(0);
          },
        }),
        new MenuItem({
          buttonText: "Save Slot 2",
          isTogglable: false,
          toolTip: "save 2",
          method: () => {
            n5SavePreset(1);
          },
        }),
        new MenuItem({
          buttonText: "Save Slot 3",
          isTogglable: false,
          toolTip: "save 3",
          method: () => {
            n5SavePreset(2);
          },
        }),
        new MenuItem({
          buttonText: "Save Slot 4",
          isTogglable: false,
          toolTip: "save 4",
          method: () => {
            n5SavePreset(3);
          },
        }),
        new MenuItem({
          buttonText: "Save Slot 5",
          isTogglable: false,
          toolTip: "save 5",
          method: () => {
            n5SavePreset(4);
          },
        }),
        new MenuItem({
          buttonText: "Load Slot 1",
          isTogglable: false,
          toolTip: "load 1",
          method: () => {
            n5LoadPreset(0);
          },
        }),
        new MenuItem({
          buttonText: "Load Slot 2",
          isTogglable: false,
          toolTip: "load 2",
          method: () => {
            n5LoadPreset(1);
          },
        }),
        new MenuItem({
          buttonText: "Load Slot 3",
          isTogglable: false,
          toolTip: "load 3",
          method: () => {
            n5LoadPreset(2);
          },
        }),
        new MenuItem({
          buttonText: "Load Slot 4",
          isTogglable: false,
          toolTip: "load 4",
          method: () => {
            n5LoadPreset(3);
          },
        }),
        new MenuItem({
          buttonText: "Load Slot 5",
          isTogglable: false,
          toolTip: "load 5",
          method: () => {
            n5LoadPreset(4);
          },
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to Misc",
          isTogglable: false,
          toolTip: "back to misc hub",
          method: () => {
            currentCategory = 45;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Stop",
          isTogglable: false,
          toolTip: "stop",
          method: () => {
            n5StopSound();
            currentNotification = " Stopped";
            notifactionResetTime = time + 1;
          },
        }),
        new MenuItem({
          buttonText: "Audio ID +",
          isTogglable: false,
          toolTip: "next server audio id",
          method: () => {
            n5ServerAudioId = (n5ServerAudioId + 1) & 32767;
            currentNotification = "Audio ID: " + n5ServerAudioId;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Audio ID -",
          isTogglable: false,
          toolTip: "previous server audio id",
          method: () => {
            n5ServerAudioId = Math.max(0, n5ServerAudioId - 1);
            currentNotification = "Audio ID: " + n5ServerAudioId;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Play Audio ID",
          isTogglable: false,
          toolTip: "play selected server audio id at right hand",
          method: () => {
            try {
              const _p = rightHandTransform.method("get_position").invoke();
              currentNotification = n5PlayServerAudioAt(n5ServerAudioId, _p)
                ? "Audio " + n5ServerAudioId
                : "audio failed";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("[AudioID]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Grip Audio ID",
          isTogglable: true,
          toolTip: "hold right grip to spam selected server audio id",
          method: () => {
            n5RunServerAudioGrip();
          },
        }),
        new MenuItem({
          buttonText: "Vol +",
          isTogglable: false,
          toolTip: "vol up",
          method: () => {
            n5SoundVolume = Math.min(5.0, +(n5SoundVolume + 0.25).toFixed(2));
            try {
              Il2Cpp.perform(() => {
                if (n5SoundAudioSrc && !n5SoundAudioSrc.isNull())
                  n5SoundAudioSrc.method("set_volume").invoke(n5SoundVolume);
              });
            } catch (e) {}
            currentNotification = "Vol: " + n5SoundVolume.toFixed(2);
            notifactionResetTime = time + 1;
          },
        }),
        new MenuItem({
          buttonText: "Vol -",
          isTogglable: false,
          toolTip: "vol down",
          method: () => {
            n5SoundVolume = Math.max(0.0, +(n5SoundVolume - 0.25).toFixed(2));
            try {
              Il2Cpp.perform(() => {
                if (n5SoundAudioSrc && !n5SoundAudioSrc.isNull())
                  n5SoundAudioSrc.method("set_volume").invoke(n5SoundVolume);
              });
            } catch (e) {}
            currentNotification = "Vol: " + n5SoundVolume.toFixed(2);
            notifactionResetTime = time + 1;
          },
        }),
        new MenuItem({
          buttonText: "Loop",
          isTogglable: true,
          enabled: false,
          toolTip: "loop",
          enableMethod: () => {
            n5SoundLoop = true;
            try {
              Il2Cpp.perform(() => {
                if (n5SoundAudioSrc && !n5SoundAudioSrc.isNull())
                  n5SoundAudioSrc.method("set_loop").invoke(true);
              });
            } catch (e) {}
          },
          disableMethod: () => {
            n5SoundLoop = false;
            try {
              Il2Cpp.perform(() => {
                if (n5SoundAudioSrc && !n5SoundAudioSrc.isNull())
                  n5SoundAudioSrc.method("set_loop").invoke(false);
              });
            } catch (e) {}
          },
        }),
        new MenuItem({
          buttonText: "3h6nv4",
          isTogglable: false,
          toolTip: "play local",
          method: () => {
            currentNotification = "Loading 3h6nv4...";
            notifactionResetTime = time + 6;
            n5LoadWebSound(0, (ok) => {
              if (ok) {
                _n5LoadedIdx = 0;
                n5PlaySound();
                currentNotification = " Playing: 3h6nv4";
                notifactionResetTime = time + 3;
              } else {
                currentNotification = " Load failed: 3h6nv4";
                notifactionResetTime = time + 3;
              }
            });
          },
        }),
        new MenuItem({
          buttonText: "+ 3h6nv4",
          isTogglable: false,
          toolTip: "play + inject voice",
          method: () => {
            currentNotification = "Loading 3h6nv4...";
            notifactionResetTime = time + 6;
            n5LoadWebSound(0, (ok) => {
              if (ok) {
                _n5LoadedIdx = 0;
                n5PlaySound();
                n5SetVoiceInject(true);
                currentNotification = " Playing+Injecting: 3h6nv4";
                notifactionResetTime = time + 3;
              } else {
                currentNotification = " Load failed: 3h6nv4";
                notifactionResetTime = time + 3;
              }
            });
          },
        }),
        new MenuItem({
          buttonText: "Stop Inject",
          isTogglable: false,
          toolTip: "stop voice inject",
          method: () => {
            n5SetVoiceInject(false);
          },
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to Combat",
          isTogglable: false,
          toolTip: "back to combat hub",
          method: () => {
            currentCategory = 43;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "TP ALL Gun",
          isTogglable: true,
          toolTip: "tp everyone to aim",
          method: () => {
            if (!rightGrab || !rightTrigger) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            try {
              const _pos = _g.endPosition;
              const _vals = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke();
              const _en = _vals.method("GetEnumerator").invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                _pl.method("RPC_Teleport").invoke(_pos);
              }
            } catch (_e) {
              console.error("TP ALL Gun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Disintegrate Gun",
          isTogglable: true,
          toolTip: "obliterate aimed player",
          method: () => {
            if (!rightGrab || !rightTrigger || !(time > lagGunDelay)) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            lagGunDelay = time + 0.5;
            try {
              const _gpos = _g.endPosition;
              let _minD = Number.MAX_SAFE_INTEGER,
                _target = null;
              const _vals = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke();
              const _en = _vals.method("GetEnumerator").invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (!_pl || _pl.handle.isNull() || getIsMine(_pl)) continue;
                const _d = Vector3Cls.method("Distance").invoke(
                  _gpos,
                  getTransform(_pl).method("get_position").invoke(),
                );
                if (_d < _minD) {
                  _minD = _d;
                  _target = _pl;
                }
              }
              if (_target && !_target.handle.isNull()) {
                const _sfx = SFXManagerCls.field("_instance")
                  .value.method("get__currentRunner")
                  .invoke();
                const _tpos = getTransform(_target)
                  .method("get_position")
                  .invoke();
                for (const _vk of Object.keys(VFXTypes)) {
                  if (_vk === "None") continue;
                  n5PlayVFXAt(VFXTypes[_vk], _tpos, identityRotation);
                }
                _target.method("RPC_Teleport").invoke([0, -99999, 0]);
                _target
                  .method("RPC_AddForce")
                  .invoke(
                    Vector3Cls.method("op_Multiply").invoke(
                      _target
                        .method("get_transform")
                        .invoke()
                        .method("get_forward")
                        .invoke(),
                      500 * deltaTime,
                    ),
                  );
                _target.method("RPC_SetColorHSV").invoke(NaN, NaN, NaN, NaN);
                currentNotification = "Disintegrated!";
                notifactionResetTime = time + 2;
              }
            } catch (_e) {
              console.error("Disintegrate Gun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "All VFX Gun",
          isTogglable: true,
          toolTip: "all vfx on aimed player",
          method: () => {
            if (!rightGrab || !rightTrigger || !(time > lagGunDelay)) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            lagGunDelay = time + 0.3;
            try {
              const _gpos = _g.endPosition;
              let _minD = Number.MAX_SAFE_INTEGER,
                _target = null;
              const _vals = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke();
              const _en = _vals.method("GetEnumerator").invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (!_pl || _pl.handle.isNull() || getIsMine(_pl)) continue;
                const _d = Vector3Cls.method("Distance").invoke(
                  _gpos,
                  getTransform(_pl).method("get_position").invoke(),
                );
                if (_d < _minD) {
                  _minD = _d;
                  _target = _pl;
                }
              }
              if (_target && !_target.handle.isNull()) {
                const _tpos = getTransform(_target)
                  .method("get_position")
                  .invoke();
                for (const _vk of Object.keys(VFXTypes)) {
                  if (_vk === "None") continue;
                  try {
                    n5PlayVFXAt(VFXTypes[_vk], _tpos, identityRotation);
                  } catch (_) {}
                }
                currentNotification = " All VFX fired!";
                notifactionResetTime = time + 1.5;
              }
            } catch (_e) {
              console.error("AllVFXGun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Stinky Gun",
          isTogglable: true,
          toolTip: "stinky gun",
          method: () => {
            if (!rightGrab || !rightTrigger) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            try {
              const _hitCol = _g.ray.raw
                ? _g.ray.raw.method("get_collider").invoke()
                : null;
              if (!_hitCol || (_hitCol.isNull && _hitCol.isNull())) return;
              const _col = getComponentInParent(_hitCol, NetPlayerCls);
              if (
                _col &&
                !_col.handle.isNull() &&
                time > tagGunDelay &&
                !getIsMine(_col)
              ) {
                _col.method("RPC_TagAsStinky").invoke();
                tagGunDelay = time + 0.2;
              }
            } catch (_e) {
              console.error("Stinky Gun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Infinite Gun Stats",
          isTogglable: true,
          toolTip:
            "max damage, ammo, range, bullets, and fire speed on Gun configs",
          enableMethod: () => {
            n5InfiniteGunStats = true;
            n5RunInfiniteGunStats(true);
          },
          disableMethod: () => {
            n5InfiniteGunStats = false;
            currentNotification = "Infinite Gun Stats OFF";
            notifactionResetTime = time + 2;
          },
          method: () => n5RunInfiniteGunStats(false),
        }),
        new MenuItem({
          buttonText: "Item Force Cannon",
          isTogglable: true,
          toolTip:
            "hold right grip and trigger to blast nearby items from aim point",
          method: () => n5RunItemForceCannon(),
        }),
        new MenuItem({
          buttonText: "Shotgun Ammo Pickup Gun",
          isTogglable: true,
          toolTip: "hold right grip and trigger to spawn an ammo pickup at aim",
          method: () =>
            n5RunPickupGun("Ammo", "Shotgun ammo", "item_shotgun_ammo", 1),
        }),
        new MenuItem({
          buttonText: "Revolver Ammo Pickup Gun",
          isTogglable: true,
          toolTip: "hold right grip and trigger to spawn an ammo pickup at aim",
          method: () =>
            n5RunPickupGun("Ammo", "Revolver ammo", "item_revolver_ammo", 1),
        }),
        new MenuItem({
          buttonText: "Nut Pickup Gun",
          isTogglable: true,
          toolTip: "hold right grip and trigger to spawn a nut pickup at aim",
          method: () => n5RunPickupGun("Nuts", "Nut", "item_nut", 1),
        }),
        new MenuItem({
          buttonText: "Spawn Item Gun",
          isTogglable: true,
          toolTip: "spawn item at aim",
          method: () => {
            if (!rightGrab || !rightTrigger || time < itemGunDelay) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            itemGunDelay = time;
            try {
              const _spawned = n5SpawnConfiguredItemAt(
                itemIDs[itemIndex],
                _g.endPosition,
                identityRotation,
              );
              currentNotification = _spawned
                ? " " + itemIDs[itemIndex]
                : " spawn failed";
              notifactionResetTime = time + 1.5;
            } catch (_e) {
              console.error("Item Gun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn Mob Gun",
          isTogglable: true,
          toolTip: "spawn mob at aim",
          method: () => {
            if (!rightGrab || !rightTrigger || time < mobGunDelay2) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            mobGunDelay2 = time;
            try {
              const _spawned = n5SpawnMobAt(
                mobIDs[mobIndex],
                _g.endPosition,
                identityRotation,
              );
              currentNotification = _spawned
                ? " " + mobIDs[mobIndex]
                : " spawn failed";
              notifactionResetTime = time + 1.5;
            } catch (_e) {
              console.error("Mob Gun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "VFX Spawner Gun",
          isTogglable: true,
          toolTip: "shoot vfx at aim",
          method: () => {
            if (!rightGrab || !rightTrigger) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            vfxGunDelay = time;
            try {
              const _vfxType = VFXTypes[vfxKeys[vfxIndex % vfxKeys.length]];
              n5PlayVFXAt(_vfxType, _g.endPosition, identityRotation);
              currentNotification =
                "VFX: " + vfxKeys[vfxIndex % vfxKeys.length];
              notifactionResetTime = time + 0.5;
            } catch (_e) {
              console.error("VFX Gun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn ALL Items Gun",
          isTogglable: true,
          toolTip: "spawn all items at aim",
          method: () => {
            if (!rightGrab || !rightTrigger || time <= allItemsGunDelay) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            allItemsGunDelay = time + 3.0;
            try {
              const _pos = _g.endPosition;
              let _spawned = 0;
              for (let _ii = 0; _ii < itemIDs.length; _ii++) {
                const _off = Vector3Cls.method("op_Addition").invoke(_pos, [
                  (_ii % 12) * 0.6 - 3.3,
                  0,
                  Math.floor(_ii / 12) * 0.6,
                ]);
                try {
                  if (n5SpawnItemAt(itemIDs[_ii], _off, identityRotation))
                    _spawned++;
                } catch (_) {}
              }
              currentNotification =
                "Spawned " + _spawned + "/" + itemIDs.length + " items!";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("Spawn All Items Gun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn ALL Mobs Gun",
          isTogglable: true,
          toolTip: "spawn all mobs at aim",
          method: () => {
            if (!rightGrab || !rightTrigger || time <= allMobsGunDelay) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            allMobsGunDelay = time + 3.0;
            try {
              const _pos = _g.endPosition;
              let _sm = 0;
              for (let _mi = 0; _mi < mobIDs.length; _mi++) {
                const _off = Vector3Cls.method("op_Addition").invoke(_pos, [
                  (_mi % 6) * 1.5 - 3.75,
                  0,
                  Math.floor(_mi / 6) * 1.5,
                ]);
                try {
                  if (n5SpawnMobAt(mobIDs[_mi], _off, identityRotation)) _sm++;
                } catch (_) {}
              }
              currentNotification =
                "Spawned " + _sm + "/" + mobIDs.length + " mobs!";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("Spawn All Mobs Gun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "SPAWN ALL PREFABS Gun",
          isTogglable: true,
          toolTip: "spawn all prefabs at aim",
          method: () => {
            if (!rightGrab || !rightTrigger || time <= allPrefabsGunDelay)
              return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            allPrefabsGunDelay = time + 5.0;
            try {
              const _pos = _g.endPosition;
              let _sp = 0,
                _sk = 0;
              for (let _pi = 0; _pi < prefabList.length; _pi++) {
                if (
                  disableDangerousPrefabs &&
                  dangerousPrefabs.indexOf(prefabList[_pi]) >= 0
                ) {
                  _sk++;
                  continue;
                }
                const _off = Vector3Cls.method("op_Addition").invoke(_pos, [
                  (_pi % 8) * 2.0 - 7,
                  0,
                  Math.floor(_pi / 8) * 2.0,
                ]);
                try {
                  const _result = spawnNetworkPrefab(
                    prefabList[_pi],
                    _off,
                    identityRotation,
                  );
                  if (_result !== null) _sp++;
                } catch (_) {}
              }
              currentNotification =
                "Spawned " +
                _sp +
                "/" +
                (_pi - _sk) +
                " prefabs, " +
                _sk +
                " skipped";
              notifactionResetTime = time + 4;
            } catch (_e) {
              console.error("Spawn All Prefabs Gun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn All Prefab Options",
          isTogglable: false,
          toolTip: "prefab gun options",
          method: () => {
            currentCategory = 16;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Despawn Item Gun",
          isTogglable: true,
          toolTip: "yeet item to void",
          method: () => {
            if (!rightGrab || !rightTrigger || time < itemGunDelay) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            itemGunDelay = time;
            try {
              const _pos = _g.endPosition;
              const _hitItem = n5ItemFromRayHit(_g.ray);
              if (_hitItem && n5DestroyItemObject(_hitItem)) {
                currentNotification = " Deleted hit item";
                notifactionResetTime = time + 1;
                return;
              }
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(GrabbableItemCls)
                .invoke(0);
              if (!_all || _all.length === 0) return;
              let _best = null,
                _bestD = 2.0;
              for (let _i = 0; _i < _all.length; _i++) {
                try {
                  const _it = _all.get(_i);
                  if (!_it || _it.handle.isNull()) continue;
                  const _d = Vector3Cls.method("Distance").invoke(
                    _pos,
                    _it
                      .method("get_transform")
                      .invoke()
                      .method("get_position")
                      .invoke(),
                  );
                  if (_d < _bestD) {
                    _bestD = _d;
                    _best = _it;
                  }
                } catch (_) {}
              }
              if (_best) {
                n5DestroyItemObject(_best);
                currentNotification = " Deleted item";
                notifactionResetTime = time + 1;
              }
            } catch (_e) {
              console.error("DespawnItemGun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Kill Mob Gun",
          isTogglable: true,
          toolTip: "kill mob gun",
          method: () => {
            if (!rightGrab || !rightTrigger || time < mobGunDelay2) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            mobGunDelay2 = time;
            try {
              const _pos = _g.endPosition;
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(GrabbableObjectCls)
                .invoke(0);
              if (!_all || _all.length === 0) return;
              let _best = null,
                _bestD = 3.0;
              for (let _i = 0; _i < _all.length; _i++) {
                try {
                  const _m = _all.get(_i);
                  if (!_m || _m.handle.isNull()) continue;
                  try {
                    const _go = _m.method("get_gameObject").invoke();
                    const _np = _go
                      .method("GetComponent", 1)
                      .inflate(NetPlayerCls)
                      .invoke();
                    if (_np && !_np.isNull()) continue;
                  } catch (_) {}
                  const _d = Vector3Cls.method("Distance").invoke(
                    _pos,
                    _m
                      .method("get_transform")
                      .invoke()
                      .method("get_position")
                      .invoke(),
                  );
                  if (_d < _bestD) {
                    _bestD = _d;
                    _best = _m;
                  }
                } catch (_) {}
              }
              if (_best) {
                n5KillOneMob(_best);
                currentNotification = " Killed mob";
                notifactionResetTime = time + 1;
              }
            } catch (_e) {
              console.error("KillMobGun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Despawn Prefab Gun",
          isTogglable: true,
          toolTip: "despawn anything",
          method: () => {
            if (!rightGrab || !rightTrigger || time <= lagGunDelay) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            lagGunDelay = time + 0.3;
            try {
              const _hitPos = _g.endPosition;
              let _netObjCls = null;
              try {
                _netObjCls = Il2Cpp.domain
                  .assembly("Fusion.Runtime")
                  .image.class("Fusion.NetworkObject");
              } catch (_) {}
              if (!_netObjCls) return;
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(_netObjCls)
                .invoke(0);
              if (!_all || _all.length === 0) return;
              let _best = null,
                _bestD = 3.0;
              for (let _i = 0; _i < _all.length; _i++) {
                try {
                  const _obj = _all.get(_i);
                  if (!_obj || _obj.handle.isNull()) continue;
                  try {
                    if (_obj.method("get_IsMine").invoke()) continue;
                  } catch (_) {}
                  const _d = Vector3Cls.method("Distance").invoke(
                    _hitPos,
                    getTransform(_obj).method("get_position").invoke(),
                  );
                  if (_d < _bestD) {
                    _bestD = _d;
                    _best = _obj;
                  }
                } catch (_) {}
              }
              if (_best) {
                const _runner = PrefabGeneratorCls.field("_instance")
                  .value.method("get_runner")
                  .invoke();
                try {
                  _runner.method("Despawn", 1).invoke(_best);
                } catch (_) {
                  try {
                    _best.method("set_position").invoke([0, -99999, 0]);
                  } catch (_2) {}
                }
                currentNotification = " Despawned prefab";
                notifactionResetTime = time + 1;
              }
            } catch (_e) {
              console.error("DespawnPrefabGun:", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Gun",
          isTogglable: true,
          toolTip: "whitelist gun",
          method: () => {
            if (!rightGrab || !rightTrigger || !(time > tagGunDelay)) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            tagGunDelay = time + 0.5;
            try {
              const _gpos = _g.endPosition;
              let _minD = Number.MAX_SAFE_INTEGER,
                _target = null;
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                const _d = Vector3Cls.method("Distance").invoke(
                  _gpos,
                  getTransform(_pl).method("get_position").invoke(),
                );
                if (_d < _minD) {
                  _minD = _d;
                  _target = _pl;
                }
              }
              if (_target && !_target.handle.isNull()) {
                const _already = whitelist.some(
                  (_w) =>
                    _w &&
                    !_w.handle.isNull() &&
                    _w.handle.equals(_target.handle),
                );
                if (!_already) {
                  whitelist.push(_target);
                  try {
                    const _name = _target
                      .method("get_name")
                      .invoke()
                      .toString();
                    currentNotification = " WL: " + _name;
                  } catch (_ne) {
                    currentNotification = " Added to whitelist";
                  }
                } else {
                  currentNotification = "Already whitelisted";
                }
                notifactionResetTime = time + 2;
              }
            } catch (_e) {
              console.error("WhitelistGun:", _e);
            }
          },
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to Guns",
          isTogglable: false,
          toolTip: "back",
          method: () => {
            currentCategory = 15;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "DISABLE DANGEROUS PREFABS",
          enableMethod: () => {
            disableDangerousPrefabs = true;
            currentNotification = "Blocked: NetPlayer, NetSpectator";
            notifactionResetTime = time + 3;
          },
          disableMethod: () => {
            disableDangerousPrefabs = false;
            currentNotification = "All prefabs enabled";
            notifactionResetTime = time + 2;
          },
          isTogglable: true,
          toolTip: "block dangerous prefabs",
        }),
        new MenuItem({
          buttonText: "Show Dangerous List",
          isTogglable: false,
          toolTip: "show dangerous list",
          method: () => {
            currentNotification = "Dangerous: " + dangerousPrefabs.join(", ");
            notifactionResetTime = time + 4;
          },
        }),
        new MenuItem({
          buttonText: "Helix Spawn (Selected)",
          isTogglable: false,
          toolTip:
            "spawn a giant helix tower of selected prefab  spirals up above you",
          method: () => {
            try {
              if (time < n5HelixSpawnDelay) {
                currentNotification = "Helix cooldown";
                notifactionResetTime = time + 1;
                return;
              }
              n5HelixSpawnDelay = time + 4;
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp) {
                currentNotification = "no local player";
                notifactionResetTime = time + 2;
                return;
              }
              const _myPos = getTransform(_lp).method("get_position").invoke();
              const _px = _myPos[0] || 0,
                _py = _myPos[1] || 0,
                _pz = _myPos[2] || 0;
              const _prefabName = prefabList[prefabIndex];
              const _count = 24;
              const _rBase = 2.5;
              const _heightStep = 0.9;
              const _rotStep = ((Math.PI * 2) / _count) * 3;
              let _spawned = 0;
              for (let _i = 0; _i < _count; _i++) {
                try {
                  if (
                    disableDangerousPrefabs &&
                    dangerousPrefabs.indexOf(_prefabName) >= 0
                  )
                    break;
                  const _ang = _i * _rotStep;
                  const _r = _rBase + Math.sin(_i * 0.4) * 0.8;
                  const _off = [
                    _px + Math.cos(_ang) * _r,
                    _py + _i * _heightStep,
                    _pz + Math.sin(_ang) * _r,
                  ];
                  const _res = spawnNetworkPrefab(
                    _prefabName,
                    _off,
                    identityRotation,
                  );
                  if (_res !== null) _spawned++;
                } catch (_) {}
              }
              currentNotification =
                " Helix: " + _spawned + "/" + _count + " spawned";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[HelixSpawn]", _e);
              currentNotification = "Helix err: " + _e;
              notifactionResetTime = time + 3;
            }
          },
        }),
        new MenuItem({
          buttonText: "Helix Spawn (Item Gun)",
          isTogglable: false,
          toolTip: "spawn helix tower of selected item at gun pointer",
          method: () => {
            try {
              if (time < n5HelixSpawnDelay) {
                currentNotification = "Helix cooldown";
                notifactionResetTime = time + 1;
                return;
              }
              n5HelixSpawnDelay = time + 4;
              const _g = getGunPointerResult();
              if (!n5GunRayOk(_g.ray)) {
                currentNotification = "no gun ray";
                notifactionResetTime = time + 2;
                return;
              }
              const _origin = _g.endPosition;
              const _ox = _origin[0] || 0,
                _oy = _origin[1] || 0,
                _oz = _origin[2] || 0;
              const _count = 20;
              const _rBase = 2.0;
              const _heightStep = 1.0;
              const _rotStep = ((Math.PI * 2) / _count) * 3;
              let _spawned = 0;
              for (let _i = 0; _i < _count; _i++) {
                try {
                  const _ang = _i * _rotStep;
                  const _rr = _rBase + Math.sin(_i * 0.5) * 0.7;
                  const _off = [
                    _ox + Math.cos(_ang) * _rr,
                    _oy + _i * _heightStep,
                    _oz + Math.sin(_ang) * _rr,
                  ];
                  const _res = PrefabGeneratorCls.method("SpawnItem", 4).invoke(
                    Il2Cpp.string("item_prefab/" + itemIDs[itemIndex]),
                    _off,
                    identityRotation,
                    nullObjectRef,
                  );
                  if (_res !== null && !(_res.handle && _res.handle.isNull()))
                    _spawned++;
                } catch (_) {}
              }
              currentNotification = " Item Helix: " + _spawned + "/" + _count;
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[HelixItemGun]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Angler Orbit",
          method: () => {
            const center = acImage
              .class("AnimalCompany.PlayerController")
              .method("get_instance")
              .invoke()
              .method("get_head")
              .invoke();
            function spawnOrbitObj() {
              orbiters = [];
              for (let i = 0; i < 16; i++) {
                let angle = ((Math.PI * 2) / 8) * i;
                const offset = Vector3Cls.alloc();
                offset
                  .method(".ctor")
                  .overload("System.Single", "System.Single", "System.Single")
                  .invoke(Math.cos(angle) * 6.5, 0, Math.sin(angle) * 6.5);
                let cp = center.method("get_position").invoke();
                let sp = Vector3Cls.method("op_Addition").invoke(cp, [
                  offset.field("x").value,
                  offset.field("y").value,
                  offset.field("z").value,
                ]);
                let no = spawnNetworkPrefab(
                  "AnglerController",
                  sp,
                  QuaternionCls.method("get_identity").invoke(),
                );
                if (!no) continue;
                orbitprefabs.push(no);
                let tf = no
                  .method("get_gameObject")
                  .invoke()
                  .method("get_transform")
                  .invoke();
                orbiters.push({ transform: tf, angle });
              }
            }
            if (orbitprefabs.length < 16) spawnOrbitObj();
            let delta = TimeCls.method("get_deltaTime").invoke();
            let cp = center.method("get_position").invoke();
            for (let orb of orbiters) {
              orb.angle += 1.5 * delta;
              const off = Vector3Cls.alloc();
              off
                .method(".ctor")
                .overload("System.Single", "System.Single", "System.Single")
                .invoke(
                  Math.cos(orb.angle) * 6.5,
                  0,
                  Math.sin(orb.angle) * 6.5,
                );
              orb.transform
                .method("set_position")
                .invoke(
                  Vector3Cls.method("op_Addition").invoke(cp, [
                    off.field("x").value,
                    off.field("y").value,
                    off.field("z").value,
                  ]),
                );
            }
          },
          disableMethod: () => {
            for (let p of orbitprefabs) {
              if (!p) continue;
              try {
                p.method("get_Runner").invoke().method("Despawn").invoke(p);
              } catch (_) {}
            }
            orbitprefabs = [];
            orbiters = [];
          },
          isTogglable: true,
          toolTip: "Creates 16 Anglers that orbit you.",
        }),
        new MenuItem({
          buttonText: "Selling Machine Orbit",
          method: () => {
            const center = acImage
              .class("AnimalCompany.PlayerController")
              .method("get_instance")
              .invoke()
              .method("get_head")
              .invoke();
            function spawnOrbitObj() {
              orbiters = [];
              for (let i = 0; i < 16; i++) {
                let angle = ((Math.PI * 2) / 8) * i;
                const offset = Vector3Cls.alloc();
                offset
                  .method(".ctor")
                  .overload("System.Single", "System.Single", "System.Single")
                  .invoke(Math.cos(angle) * 6.5, 0, Math.sin(angle) * 6.5);
                let cp = center.method("get_position").invoke();
                let sp = Vector3Cls.method("op_Addition").invoke(cp, [
                  offset.field("x").value,
                  offset.field("y").value,
                  offset.field("z").value,
                ]);
                let no = spawnNetworkPrefab(
                  "ItemSellingMachineController",
                  sp,
                  QuaternionCls.method("get_identity").invoke(),
                );
                if (!no) continue;
                orbitprefabs.push(no);
                let tf = no
                  .method("get_gameObject")
                  .invoke()
                  .method("get_transform")
                  .invoke();
                orbiters.push({ transform: tf, angle });
              }
            }
            if (orbitprefabs.length < 16) spawnOrbitObj();
            let delta = TimeCls.method("get_deltaTime").invoke();
            let cp = center.method("get_position").invoke();
            for (let orb of orbiters) {
              orb.angle += 1.5 * delta;
              const off = Vector3Cls.alloc();
              off
                .method(".ctor")
                .overload("System.Single", "System.Single", "System.Single")
                .invoke(
                  Math.cos(orb.angle) * 6.6,
                  0,
                  Math.sin(orb.angle) * 6.6,
                );
              orb.transform
                .method("set_position")
                .invoke(
                  Vector3Cls.method("op_Addition").invoke(cp, [
                    off.field("x").value,
                    off.field("y").value,
                    off.field("z").value,
                  ]),
                );
            }
          },
          disableMethod: () => {
            for (let p of orbitprefabs) {
              if (!p) continue;
              try {
                p.method("get_Runner").invoke().method("Despawn").invoke(p);
              } catch (_) {}
            }
            orbitprefabs = [];
            orbiters = [];
          },
          isTogglable: true,
          toolTip: "Orbits selling machines around you.",
        }),
        new MenuItem({
          buttonText: "Ogre Orbit",
          method: () => {
            const center = acImage
              .class("AnimalCompany.PlayerController")
              .method("get_instance")
              .invoke()
              .method("get_head")
              .invoke();
            function spawnOrbitObj() {
              orbiters = [];
              for (let i = 0; i < 16; i++) {
                let angle = ((Math.PI * 2) / 8) * i;
                const offset = Vector3Cls.alloc();
                offset
                  .method(".ctor")
                  .overload("System.Single", "System.Single", "System.Single")
                  .invoke(Math.cos(angle) * 6.5, 0, Math.sin(angle) * 6.5);
                let cp = center.method("get_position").invoke();
                let sp = Vector3Cls.method("op_Addition").invoke(cp, [
                  offset.field("x").value,
                  offset.field("y").value,
                  offset.field("z").value,
                ]);
                let no = spawnNetworkPrefab(
                  "GiantController",
                  sp,
                  QuaternionCls.method("get_identity").invoke(),
                );
                if (!no) continue;
                orbitprefabs.push(no);
                let tf = no
                  .method("get_gameObject")
                  .invoke()
                  .method("get_transform")
                  .invoke();
                orbiters.push({ transform: tf, angle });
              }
            }
            if (orbitprefabs.length < 16) spawnOrbitObj();
            let delta = TimeCls.method("get_deltaTime").invoke();
            let cp = center.method("get_position").invoke();
            for (let orb of orbiters) {
              orb.angle += 1.5 * delta;
              const off = Vector3Cls.alloc();
              off
                .method(".ctor")
                .overload("System.Single", "System.Single", "System.Single")
                .invoke(
                  Math.cos(orb.angle) * 6.6,
                  0,
                  Math.sin(orb.angle) * 6.6,
                );
              orb.transform
                .method("set_position")
                .invoke(
                  Vector3Cls.method("op_Addition").invoke(cp, [
                    off.field("x").value,
                    off.field("y").value,
                    off.field("z").value,
                  ]),
                );
            }
          },
          disableMethod: () => {
            for (let p of orbitprefabs) {
              if (!p) continue;
              try {
                p.method("get_Runner").invoke().method("Despawn").invoke(p);
              } catch (_) {}
            }
            orbitprefabs = [];
            orbiters = [];
          },
          isTogglable: true,
          toolTip: "Orbits Giants around you.",
        }),
        new MenuItem({
          buttonText: "Christmas Box Orbit",
          method: () => {
            const center = acImage
              .class("AnimalCompany.PlayerController")
              .method("get_instance")
              .invoke()
              .method("get_head")
              .invoke();
            function spawnOrbitObj() {
              orbiters = [];
              for (let i = 0; i < 16; i++) {
                let angle = ((Math.PI * 2) / 8) * i;
                const offset = Vector3Cls.alloc();
                offset
                  .method(".ctor")
                  .overload("System.Single", "System.Single", "System.Single")
                  .invoke(Math.cos(angle) * 6.5, 0, Math.sin(angle) * 6.5);
                let cp = center.method("get_position").invoke();
                let sp = Vector3Cls.method("op_Addition").invoke(cp, [
                  offset.field("x").value,
                  offset.field("y").value,
                  offset.field("z").value,
                ]);
                let no = spawnNetworkPrefab(
                  "ChristmasBox",
                  sp,
                  QuaternionCls.method("get_identity").invoke(),
                );
                if (!no) continue;
                orbitprefabs.push(no);
                let tf = no
                  .method("get_gameObject")
                  .invoke()
                  .method("get_transform")
                  .invoke();
                orbiters.push({ transform: tf, angle });
              }
            }
            if (orbitprefabs.length < 16) spawnOrbitObj();
            let delta = TimeCls.method("get_deltaTime").invoke();
            let cp = center.method("get_position").invoke();
            for (let orb of orbiters) {
              orb.angle += 1.5 * delta;
              const off = Vector3Cls.alloc();
              off
                .method(".ctor")
                .overload("System.Single", "System.Single", "System.Single")
                .invoke(
                  Math.cos(orb.angle) * 6.6,
                  0,
                  Math.sin(orb.angle) * 6.6,
                );
              orb.transform
                .method("set_position")
                .invoke(
                  Vector3Cls.method("op_Addition").invoke(cp, [
                    off.field("x").value,
                    off.field("y").value,
                    off.field("z").value,
                  ]),
                );
            }
          },
          disableMethod: () => {
            for (let p of orbitprefabs) {
              if (!p) continue;
              try {
                p.method("get_Runner").invoke().method("Despawn").invoke(p);
              } catch (_) {}
            }
            orbitprefabs = [];
            orbiters = [];
          },
          isTogglable: true,
          toolTip: "Orbits Christmas Boxes around you.",
        }),
        new MenuItem({
          buttonText: "Buggy Orbit",
          method: () => {
            const center = acImage
              .class("AnimalCompany.PlayerController")
              .method("get_instance")
              .invoke()
              .method("get_head")
              .invoke();
            function spawnOrbitObj() {
              orbiters = [];
              for (let i = 0; i < 16; i++) {
                let angle = ((Math.PI * 2) / 8) * i;
                const offset = Vector3Cls.alloc();
                offset
                  .method(".ctor")
                  .overload("System.Single", "System.Single", "System.Single")
                  .invoke(Math.cos(angle) * 6.5, 0, Math.sin(angle) * 6.5);
                let cp = center.method("get_position").invoke();
                let sp = Vector3Cls.method("op_Addition").invoke(cp, [
                  offset.field("x").value,
                  offset.field("y").value,
                  offset.field("z").value,
                ]);
                let no = spawnNetworkPrefab(
                  "Vehicle_Buggy",
                  sp,
                  QuaternionCls.method("get_identity").invoke(),
                );
                if (!no) continue;
                orbitprefabs.push(no);
                let tf = no
                  .method("get_gameObject")
                  .invoke()
                  .method("get_transform")
                  .invoke();
                orbiters.push({ transform: tf, angle });
              }
            }
            if (orbitprefabs.length < 16) spawnOrbitObj();
            let delta = TimeCls.method("get_deltaTime").invoke();
            let cp = center.method("get_position").invoke();
            for (let orb of orbiters) {
              orb.angle += 1.5 * delta;
              const off = Vector3Cls.alloc();
              off
                .method(".ctor")
                .overload("System.Single", "System.Single", "System.Single")
                .invoke(
                  Math.cos(orb.angle) * 6.6,
                  0,
                  Math.sin(orb.angle) * 6.6,
                );
              orb.transform
                .method("set_position")
                .invoke(
                  Vector3Cls.method("op_Addition").invoke(cp, [
                    off.field("x").value,
                    off.field("y").value,
                    off.field("z").value,
                  ]),
                );
            }
          },
          disableMethod: () => {
            for (let p of orbitprefabs) {
              if (!p) continue;
              try {
                p.method("get_Runner").invoke().method("Despawn").invoke(p);
              } catch (_) {}
            }
            orbitprefabs = [];
            orbiters = [];
          },
          isTogglable: true,
          toolTip: "Orbits buggies around you.",
        }),
        new MenuItem({
          buttonText: "Leaderboard Orbit",
          method: () => {
            const center = acImage
              .class("AnimalCompany.PlayerController")
              .method("get_instance")
              .invoke()
              .method("get_head")
              .invoke();
            function spawnOrbitObj() {
              orbiters = [];
              for (let i = 0; i < 16; i++) {
                let angle = ((Math.PI * 2) / 8) * i;
                const offset = Vector3Cls.alloc();
                offset
                  .method(".ctor")
                  .overload("System.Single", "System.Single", "System.Single")
                  .invoke(Math.cos(angle) * 6.5, 0, Math.sin(angle) * 6.5);
                let cp = center.method("get_position").invoke();
                let sp = Vector3Cls.method("op_Addition").invoke(cp, [
                  offset.field("x").value,
                  offset.field("y").value,
                  offset.field("z").value,
                ]);
                let no = spawnNetworkPrefab(
                  "HordeMobLobbyHandler",
                  sp,
                  QuaternionCls.method("get_identity").invoke(),
                );
                if (!no) continue;
                orbitprefabs.push(no);
                let tf = no
                  .method("get_gameObject")
                  .invoke()
                  .method("get_transform")
                  .invoke();
                orbiters.push({ transform: tf, angle });
              }
            }
            if (orbitprefabs.length < 16) spawnOrbitObj();
            let delta = TimeCls.method("get_deltaTime").invoke();
            let cp = center.method("get_position").invoke();
            for (let orb of orbiters) {
              orb.angle += 1.5 * delta;
              const off = Vector3Cls.alloc();
              off
                .method(".ctor")
                .overload("System.Single", "System.Single", "System.Single")
                .invoke(
                  Math.cos(orb.angle) * 6.6,
                  0,
                  Math.sin(orb.angle) * 6.6,
                );
              orb.transform
                .method("set_position")
                .invoke(
                  Vector3Cls.method("op_Addition").invoke(cp, [
                    off.field("x").value,
                    off.field("y").value,
                    off.field("z").value,
                  ]),
                );
            }
          },
          disableMethod: () => {
            for (let p of orbitprefabs) {
              if (!p) continue;
              try {
                p.method("get_Runner").invoke().method("Despawn").invoke(p);
              } catch (_) {}
            }
            orbitprefabs = [];
            orbiters = [];
          },
          isTogglable: true,
          toolTip: "Orbits HordeMobLobbyHandlers around you.",
        }),
        new MenuItem({
          buttonText: "Control Prefab",
          isTogglable: true,
          toolTip:
            "grab nearest prefab to you and move it with thumbsticks  L-stick fwd/back/strafe, R-stick up/down. Press Stop Controlling below to release.",
          enableMethod: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp) {
                currentNotification = "no local player";
                notifactionResetTime = time + 2;
                return;
              }
              const _myPos = getTransform(_lp).method("get_position").invoke();
              let _netObjCls = null;
              try {
                _netObjCls = Il2Cpp.domain
                  .assembly("Fusion.Runtime")
                  .image.class("Fusion.NetworkObject");
              } catch (_) {}
              if (!_netObjCls) {
                currentNotification = "Fusion not found";
                notifactionResetTime = time + 2;
                return;
              }
              const _all = UnityObjectCls.method("FindObjectsByType", 2)
                .inflate(_netObjCls)
                .invoke(0);
              let _best = null,
                _bestD = 999;
              for (let _i = 0; _all && _i < _all.length; _i++) {
                try {
                  const _o = _all.get(_i);
                  if (!_o || _o.handle.isNull()) continue;
                  try {
                    if (_o.method("get_IsMine").invoke()) continue;
                  } catch (_) {}
                  const _d = Vector3Cls.method("Distance").invoke(
                    _myPos,
                    getTransform(_o).method("get_position").invoke(),
                  );
                  if (_d < _bestD) {
                    _bestD = _d;
                    _best = _o;
                  }
                } catch (_) {}
              }
              if (_best) {
                n5ControlledPrefab = _best;
                n5ControlPrefabEnabled = true;
                n5ControlPrefabVel = [0, 0, 0];
                currentNotification =
                  " Controlling prefab (dist " +
                  _bestD.toFixed(1) +
                  "m)  use thumbsticks";
              } else {
                currentNotification = "No prefab found nearby";
              }
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[ControlPrefab enable]", _e);
            }
          },
          disableMethod: () => {
            n5ControlledPrefab = null;
            n5ControlPrefabEnabled = false;
            currentNotification = " Stopped controlling prefab";
            notifactionResetTime = time + 2;
          },
          method: () => {
            if (!n5ControlPrefabEnabled || !n5ControlledPrefab) return;
            try {
              if (n5ControlledPrefab.handle.isNull()) {
                n5ControlledPrefab = null;
                n5ControlPrefabEnabled = false;
                return;
              }
              let _lx = 0,
                _ly = 0,
                _rx = 0,
                _ry = 0;
              try {
                const _devs = acImage
                  .class("UnityEngine.XR.InputDevices")
                  .method("GetFeatureValue", 3);
                if (leftStick) {
                  _ly = 1;
                }
              } catch (_) {}
              const _spd = 3.5 * deltaTime;
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              const _fwd = _lp
                ? getTransform(_lp).method("get_forward").invoke()
                : [0, 0, 1];
              const _curPos = getTransform(n5ControlledPrefab)
                .method("get_position")
                .invoke();
              const _dx =
                (_fwd[0] || 0) * _spd * _ly + (_fwd[2] || 0) * _spd * _lx;
              const _dy = (rightStick ? 1 : leftPrimary ? -1 : 0) * _spd * 2;
              const _dz = (_fwd[2] || 0) * _spd * _ly;
              const _newPos = [
                (_curPos[0] || 0) + _dx,
                (_curPos[1] || 0) + _dy,
                (_curPos[2] || 0) + _dz,
              ];
              getTransform(n5ControlledPrefab)
                .method("set_position")
                .invoke(_newPos);
              if (currentNotification === "") {
                currentNotification = " L-stick=fwd, R-stick-click=up, A=down";
                notifactionResetTime = time + 2;
              }
            } catch (_e) {
              n5ControlledPrefab = null;
              n5ControlPrefabEnabled = false;
            }
          },
        }),
        new MenuItem({
          buttonText: "Stop Controlling",
          isTogglable: false,
          toolTip: "release the prefab you are controlling",
          method: () => {
            n5ControlledPrefab = null;
            n5ControlPrefabEnabled = false;
            currentNotification = "Released prefab control";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Become Prefab",
          isTogglable: true,
          toolTip: "a prefab follows you everywhere you go  it becomes you",
          enableMethod: () => {
            try {
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp) {
                currentNotification = "no local player";
                notifactionResetTime = time + 2;
                return;
              }
              const _pos = getTransform(_lp).method("get_position").invoke();
              const _res = spawnNetworkPrefab(
                prefabList[prefabIndex],
                _pos,
                identityRotation,
              );
              if (_res) {
                n5BecomePrefabObj = _res;
                n5BecomePrefabEnabled = true;
                currentNotification =
                  " You are now: " + prefabList[prefabIndex];
              } else {
                currentNotification = "Become Prefab: spawn failed";
              }
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[BecomePrefab enable]", _e);
            }
          },
          disableMethod: () => {
            if (n5BecomePrefabObj) {
              try {
                const _runner = PrefabGeneratorCls.field("_instance")
                  .value.method("get_runner")
                  .invoke();
                try {
                  _runner.method("Despawn", 1).invoke(n5BecomePrefabObj);
                } catch (_) {
                  try {
                    getTransform(n5BecomePrefabObj)
                      .method("set_position")
                      .invoke([0, -99999, 0]);
                  } catch (_2) {}
                }
              } catch (_) {}
            }
            n5BecomePrefabObj = null;
            n5BecomePrefabEnabled = false;
            currentNotification = " Stopped being a prefab";
            notifactionResetTime = time + 2;
          },
          method: () => {
            if (!n5BecomePrefabEnabled || !n5BecomePrefabObj) return;
            try {
              if (n5BecomePrefabObj.handle.isNull()) {
                n5BecomePrefabObj = null;
                n5BecomePrefabEnabled = false;
                return;
              }
              const _lp = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_lp) return;
              const _myPos = getTransform(_lp).method("get_position").invoke();
              const _offset = [0, 0.5, 0];
              getTransform(n5BecomePrefabObj)
                .method("set_position")
                .invoke([
                  (_myPos[0] || 0) + _offset[0],
                  (_myPos[1] || 0) + _offset[1],
                  (_myPos[2] || 0) + _offset[2],
                ]);
            } catch (_e) {
              n5BecomePrefabObj = null;
              n5BecomePrefabEnabled = false;
            }
          },
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to Other Players",
          isTogglable: false,
          toolTip: "back to other players hub",
          method: () => {
            currentCategory = 42;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Refresh List",
          isTogglable: false,
          toolTip: "refresh wl",
          method: () => {
            if (whitelist.length === 0) {
              currentNotification = "Whitelist is empty";
            } else {
              const _names = [];
              for (let _i = 0; _i < whitelist.length; _i++) {
                const _pl = whitelist[_i];
                if (!_pl || _pl.handle.isNull()) continue;
                try {
                  _names.push(
                    _pl.method("get_name").invoke().toString().split("@")[0],
                  );
                } catch (_e) {
                  _names.push("Player " + _i);
                }
              }
              currentNotification =
                "WL (" + whitelist.length + "): " + _names.join(", ");
            }
            notifactionResetTime = time + 5;
          },
        }),
        new MenuItem({
          buttonText: "Clear Whitelist",
          isTogglable: false,
          toolTip: "clear wl",
          method: () => {
            const _cnt = whitelist.length;
            whitelist.length = 0;
            currentNotification = "Cleared " + _cnt + " from whitelist";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Remove Last",
          isTogglable: false,
          toolTip: "remove last from wl",
          method: () => {
            if (whitelist.length === 0) {
              currentNotification = "Whitelist empty";
              notifactionResetTime = time + 2;
              return;
            }
            const _pl = whitelist.pop();
            try {
              const _name = _pl
                .method("get_name")
                .invoke()
                .toString()
                .split("@")[0];
              currentNotification = "Removed: " + _name;
            } catch (_e) {
              currentNotification = "Removed from whitelist";
            }
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "WL Count",
          isTogglable: false,
          toolTip: "wl count",
          method: () => {
            currentNotification =
              "Whitelisted: " + whitelist.length + " player(s)";
            notifactionResetTime = time + 3;
          },
        }),
        new MenuItem({
          buttonText: "Print Names",
          isTogglable: false,
          toolTip: "print wl names",
          method: () => {
            if (whitelist.length === 0) {
              console.log("[WL] Empty");
              currentNotification = "WL empty";
              notifactionResetTime = time + 2;
              return;
            }
            console.log("[WL] Whitelisted players (" + whitelist.length + "):");
            for (let _i = 0; _i < whitelist.length; _i++) {
              const _pl = whitelist[_i];
              if (!_pl || _pl.handle.isNull()) {
                console.log("  [" + _i + "] (invalid)");
                continue;
              }
              try {
                console.log(
                  "  [" +
                    _i +
                    "] " +
                    _pl.method("get_name").invoke().toString(),
                );
              } catch (_e) {
                console.log("  [" + _i + "] (name error)");
              }
            }
            currentNotification =
              "Printed " + whitelist.length + " names to console";
            notifactionResetTime = time + 2;
          },
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to Misc",
          isTogglable: false,
          toolTip: "back to misc hub",
          method: () => {
            currentCategory = 45;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Start Timebomb Timers",
          isTogglable: false,
          toolTip: "starts the visible TimeBomb countdown/tick coroutine",
          method: () => {
            n5StartAllTimebombTimers(3);
          },
        }),
        new MenuItem({
          buttonText: "Activate All Timebombs",
          isTogglable: false,
          toolTip:
            "calls TimeBomb/HandExplosive explosion RPC paths on every live bomb",
          method: () => {
            n5ActivateAllTimebombs(true);
          },
        }),
        new MenuItem({
          buttonText: "Block ApplyBuff",
          isTogglable: true,
          enabled: true,
          toolTip:
            "Block RPC_ApplyBuff on your player (prevents forced buff effects)",
          enableMethod: () => {
            n5RpcBlocks.ApplyBuff = true;
            currentNotification = " ApplyBuff BLOCKED";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5RpcBlocks.ApplyBuff = false;
            currentNotification = " ApplyBuff ALLOWED";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Block AddForce",
          isTogglable: true,
          enabled: true,
          toolTip:
            "Block RPC_AddForce on your player (prevents being launched)",
          enableMethod: () => {
            n5RpcBlocks.AddForce = true;
            currentNotification = " AddForce BLOCKED";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5RpcBlocks.AddForce = false;
            currentNotification = " AddForce ALLOWED";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Block Teleport",
          isTogglable: true,
          enabled: true,
          toolTip: "Block RPC_Teleport on your player (prevents being moved)",
          enableMethod: () => {
            n5RpcBlocks.Teleport = true;
            currentNotification = " Teleport BLOCKED";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5RpcBlocks.Teleport = false;
            currentNotification = " Teleport ALLOWED";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Block Stinky",
          isTogglable: true,
          enabled: true,
          toolTip: "Block RPC_TagAsStinky on your player",
          enableMethod: () => {
            n5RpcBlocks.Stinky = true;
            currentNotification = " Stinky BLOCKED";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5RpcBlocks.Stinky = false;
            currentNotification = " Stinky ALLOWED";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Block Stun",
          isTogglable: true,
          enabled: true,
          toolTip: "Block RPC_PlayerStun on your player",
          enableMethod: () => {
            n5RpcBlocks.Stun = true;
            currentNotification = " Stun BLOCKED";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5RpcBlocks.Stun = false;
            currentNotification = " Stun ALLOWED";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Block SetColor",
          isTogglable: true,
          enabled: true,
          toolTip: "Block RPC_SetColor on your player (prevents color grief)",
          enableMethod: () => {
            n5RpcBlocks.SetColor = true;
            currentNotification = " SetColor BLOCKED";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5RpcBlocks.SetColor = false;
            currentNotification = " SetColor ALLOWED";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Block KickPlayer",
          isTogglable: true,
          enabled: true,
          toolTip: "Block NetSessionRPCs::KickPlayer (prevents being kicked)",
          enableMethod: () => {
            n5RpcBlocks.KickPlayer = true;
            currentNotification = " KickPlayer BLOCKED";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5RpcBlocks.KickPlayer = false;
            currentNotification = " KickPlayer ALLOWED";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Block ALL",
          isTogglable: false,
          toolTip: "Enable all RPC blocks at once",
          method: () => {
            Object.keys(n5RpcBlocks).forEach((k) => (n5RpcBlocks[k] = true));

            [
              "Block ApplyBuff",
              "Block AddForce",
              "Block Teleport",
              "Block Stinky",
              "Block Stun",
              "Block SetColor",
              "Block KickPlayer",
            ].forEach((n) => {
              const _b = _iterMob.get(n);
              if (_b) _b.enabled = true;
            });
            _n5MenuLastCat = -1;
            _n5FlatDirty = true;
            currentNotification = " ALL RPCs BLOCKED";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Allow ALL",
          isTogglable: false,
          toolTip: "Disable all RPC blocks at once",
          method: () => {
            Object.keys(n5RpcBlocks).forEach((k) => (n5RpcBlocks[k] = false));
            [
              "Block ApplyBuff",
              "Block AddForce",
              "Block Teleport",
              "Block Stinky",
              "Block Stun",
              "Block SetColor",
              "Block KickPlayer",
            ].forEach((n) => {
              const _b = _iterMob.get(n);
              if (_b) _b.enabled = false;
            });
            _n5MenuLastCat = -1;
            _n5FlatDirty = true;
            currentNotification = " ALL RPCs ALLOWED";
            notifactionResetTime = time + 2;
          },
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back",
          isTogglable: false,
          toolTip: "back",
          method: () => {
            currentCategory = 0;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Harry",
          isTogglable: false,
          toolTip: "harry",
          method: () => {
            currentNotification = "Harry  menu UI & core functions";
            notifactionResetTime = time + 5;
          },
        }),
        new MenuItem({
          buttonText: "N5",
          isTogglable: false,
          toolTip: "n5",
          method: () => {
            currentNotification =
              "N5  improved menu, alot more functions added, overlay completely redesigned";
            notifactionResetTime = time + 5;
          },
        }),
        new MenuItem({
          buttonText: "View Full Credits",
          isTogglable: false,
          toolTip: "full credits",
          method: () => {
            currentNotification =
              "Harry made the menu UI & some functions  |  N5 added more, improved menu, overlay redesigned";
            notifactionResetTime = time + 7;
          },
        }),
      ],
      [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Gun Pos Selected Quiver",
          isTogglable: false,
          toolTip:
            "spawn modded quiver at gun pointer with 15 selected item IDs",
          method: () => {
            const _g = getGunPointerResult(),
              _p = _g.point;
            n5SpawnModdedQuiverAt(
              _p || rightHandTransform.method("get_position").invoke(),
              itemIDs[itemIndex],
              15,
            );
          },
        }),
        new MenuItem({
          buttonText: "Selected Quiver Launcher",
          isTogglable: true,
          toolTip:
            "hold right grip + trigger to spawn selected-item quiver at gun pointer",
          method: () => {
            if (!rightGrab || !rightTrigger || time < n5OrbitFuckeryShootDelay)
              return;
            n5OrbitFuckeryShootDelay = time;
            const _g = getGunPointerResult(),
              _p = _g.point;
            n5SpawnModdedQuiverAt(_p, itemIDs[itemIndex], 15);
          },
        }),
        new MenuItem({
          buttonText: "Titan Suitcase",
          isTogglable: false,
          toolTip: "quiver stuffed with 15 pelican cases",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _bag = n5SpawnContainerItemAt(
                "item_quiver",
                _pos,
                identityRotation,
              );
              if (!_bag || _bag.handle.isNull()) {
                currentNotification = "bag spawn failed";
                notifactionResetTime = time + 2;
                return;
              }
              let _con = null;
              _con = n5GetContainerFromItem(_bag);
              if (!_con || _con.handle.isNull()) {
                currentNotification = "no container on quiver";
                notifactionResetTime = time + 2;
                return;
              }
              let _filled = 0;
              for (let _i = 0; _i < 15; _i++) {
                try {
                  const _it = n5SpawnContainerItemAt(
                    "item_pelican_case",
                    _pos,
                    identityRotation,
                  );
                  if (n5AddItemObjectToContainer(_it, _con)) _filled++;
                } catch (_) {}
              }
              currentNotification = "Titan Suitcase: " + _filled + "/15 loaded";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[TitanSuitcase]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Random Quiver",
          isTogglable: false,
          toolTip: "quiver stuffed with 15 random items",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _bag = n5SpawnContainerItemAt(
                "item_quiver",
                _pos,
                identityRotation,
              );
              if (!_bag || _bag.handle.isNull()) {
                currentNotification = "bag spawn failed";
                notifactionResetTime = time + 2;
                return;
              }
              let _con = null;
              _con = n5GetContainerFromItem(_bag);
              if (!_con || _con.handle.isNull()) {
                currentNotification = "no container on quiver";
                notifactionResetTime = time + 2;
                return;
              }
              let _filled = 0;
              for (let _i = 0; _i < 15; _i++) {
                const _id = itemIDs[Math.floor(Math.random() * itemIDs.length)];
                try {
                  const _it = n5SpawnContainerItemAt(
                    _id,
                    _pos,
                    identityRotation,
                  );
                  if (n5AddItemObjectToContainer(_it, _con)) _filled++;
                } catch (_) {}
              }
              currentNotification = "Random Quiver: " + _filled + "/15 loaded";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[RandomQuiver]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Arena Pistol Quiver",
          isTogglable: false,
          toolTip: "quiver stuffed with 15 arena pistols",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _bag = n5SpawnContainerItemAt(
                "item_quiver",
                _pos,
                identityRotation,
              );
              if (!_bag || _bag.handle.isNull()) {
                currentNotification = "bag spawn failed";
                notifactionResetTime = time + 2;
                return;
              }
              let _con = null;
              _con = n5GetContainerFromItem(_bag);
              if (!_con || _con.handle.isNull()) {
                currentNotification = "no container on quiver";
                notifactionResetTime = time + 2;
                return;
              }
              let _filled = 0;
              for (let _i = 0; _i < 15; _i++) {
                try {
                  const _it = n5SpawnContainerItemAt(
                    "item_arena_pistol",
                    _pos,
                    identityRotation,
                  );
                  if (n5AddItemObjectToContainer(_it, _con)) _filled++;
                } catch (_) {}
              }
              currentNotification = "Pistol Quiver: " + _filled + "/15 loaded";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[PistolQuiver]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Suitcase Quiver",
          isTogglable: false,
          toolTip: "quivers inside quivers",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _outer = n5SpawnContainerItemAt(
                "item_quiver",
                _pos,
                identityRotation,
              );
              if (!_outer || _outer.handle.isNull()) {
                currentNotification = "outer bag spawn failed";
                notifactionResetTime = time + 2;
                return;
              }
              let _outerCon = null;
              _outerCon = n5GetContainerFromItem(_outer);
              if (!_outerCon || _outerCon.handle.isNull()) {
                currentNotification = "no container on outer quiver";
                notifactionResetTime = time + 2;
                return;
              }
              let _filled = 0;
              for (let _i = 0; _i < 15; _i++) {
                try {
                  const _inner = n5SpawnContainerItemAt(
                    "item_quiver",
                    _pos,
                    identityRotation,
                  );
                  if (n5AddItemObjectToContainer(_inner, _outerCon)) _filled++;
                } catch (_) {}
              }
              currentNotification =
                "Suitcase Quiver: " + _filled + "/15 nested";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[SuitcaseQuiver]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Make Your Own Quiver",
          isTogglable: false,
          toolTip:
            "spawns a quiver with your custom-chosen items per slot  use Slot< Slot> and Select Slot below",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _bag = n5SpawnContainerItemAt(
                "item_quiver",
                _pos,
                identityRotation,
              );
              if (!_bag || _bag.handle.isNull()) {
                currentNotification = "quiver spawn failed";
                notifactionResetTime = time + 2;
                return;
              }
              let _con = null;
              _con = n5GetContainerFromItem(_bag);
              if (!_con || _con.handle.isNull()) {
                currentNotification = "no container";
                notifactionResetTime = time + 2;
                return;
              }
              let _filled = 0;
              for (let _i = 0; _i < n5QuiverSlots.length; _i++) {
                try {
                  const _sid = n5QuiverSlots[_i] || itemIDs[itemIndex];
                  const _it = n5SpawnContainerItemAt(
                    _sid,
                    _pos,
                    identityRotation,
                  );
                  if (n5AddItemObjectToContainer(_it, _con)) _filled++;
                } catch (_) {}
              }
              currentNotification =
                "Custom Quiver: " +
                _filled +
                "/" +
                n5QuiverSlots.length +
                " loaded";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[CustomQuiver]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Slot< Prev Quiver Slot",
          isTogglable: false,
          toolTip: "go to previous quiver slot to configure",
          method: () => {
            n5QuiverSlotIndex =
              (n5QuiverSlotIndex - 1 + n5QuiverSlots.length) %
              n5QuiverSlots.length;
            currentNotification =
              "Slot " +
              (n5QuiverSlotIndex + 1) +
              "/" +
              n5QuiverSlots.length +
              ": " +
              n5QuiverSlots[n5QuiverSlotIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Slot> Next Quiver Slot",
          isTogglable: false,
          toolTip: "go to next quiver slot to configure",
          method: () => {
            n5QuiverSlotIndex = (n5QuiverSlotIndex + 1) % n5QuiverSlots.length;
            currentNotification =
              "Slot " +
              (n5QuiverSlotIndex + 1) +
              "/" +
              n5QuiverSlots.length +
              ": " +
              n5QuiverSlots[n5QuiverSlotIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Select Slot On",
          isTogglable: false,
          toolTip: "assigns selected item ID to current quiver slot",
          method: () => {
            n5QuiverSlots[n5QuiverSlotIndex] = itemIDs[itemIndex];
            currentNotification =
              "Slot " + (n5QuiverSlotIndex + 1) + " = " + itemIDs[itemIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Select Own",
          isTogglable: false,
          toolTip: "spawns the custom quiver with your assigned slots",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _bag = n5SpawnContainerItemAt(
                "item_quiver",
                _pos,
                identityRotation,
              );
              if (!_bag || _bag.handle.isNull()) {
                currentNotification = "spawn failed";
                notifactionResetTime = time + 2;
                return;
              }
              let _con = null;
              _con = n5GetContainerFromItem(_bag);
              if (!_con || _con.handle.isNull()) {
                currentNotification = "no container";
                notifactionResetTime = time + 2;
                return;
              }
              let _filled = 0;
              const _preview = [];
              for (let _i = 0; _i < n5QuiverSlots.length; _i++) {
                try {
                  const _sid = n5QuiverSlots[_i] || itemIDs[itemIndex];
                  if (_i < 4) _preview.push(_sid.replace("item_", ""));
                  const _it = n5SpawnContainerItemAt(
                    _sid,
                    _pos,
                    identityRotation,
                  );
                  if (n5AddItemObjectToContainer(_it, _con)) _filled++;
                } catch (_) {}
              }
              currentNotification =
                " Spawned [" +
                _preview.join(", ") +
                "...]: " +
                _filled +
                "/" +
                n5QuiverSlots.length;
              notifactionResetTime = time + 4;
            } catch (_e) {
              console.error("[SpawnSelectOwn]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "View Slot Config",
          isTogglable: false,
          toolTip: "show current quiver slot configuration",
          method: () => {
            const _lines = n5QuiverSlots
              .map(
                (_s, _i) =>
                  "S" + (_i + 1) + ":" + (_s || "?").replace("item_", ""),
              )
              .join(" | ");
            currentNotification = _lines;
            notifactionResetTime = time + 5;
          },
        }),
        new MenuItem({
          buttonText: "Reset Slots to Current ID",
          isTogglable: false,
          toolTip: "fill all 15 quiver slots with current selected item",
          method: () => {
            for (let _i = 0; _i < n5QuiverSlots.length; _i++)
              n5QuiverSlots[_i] = itemIDs[itemIndex];
            currentNotification = "All slots = " + itemIDs[itemIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Quiver",
          isTogglable: false,
          toolTip: "spawns a plain quiver at your position",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _b = n5SpawnContainerItemAt(
                "item_quiver",
                _pos,
                identityRotation,
              );
              currentNotification =
                _b && !_b.handle.isNull()
                  ? " Quiver spawned"
                  : "Quiver spawn failed";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("[SpawnQuiver]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn Heart Quiver",
          isTogglable: false,
          toolTip: "spawns item_quiver_heart",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _b = n5SpawnContainerItemAt(
                "item_quiver_heart",
                _pos,
                identityRotation,
              );
              currentNotification =
                _b && !_b.handle.isNull()
                  ? " Heart Quiver spawned"
                  : "spawn failed";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("[SpawnHeartQuiver]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn Backpack (Base)",
          isTogglable: false,
          toolTip: "spawns item_backpack_large_base",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _b = n5SpawnContainerItemAt(
                "item_backpack_large_base",
                _pos,
                identityRotation,
              );
              currentNotification =
                _b && !_b.handle.isNull()
                  ? " Backpack spawned"
                  : "spawn failed";
              notifactionResetTime = time + 2;
            } catch (_e) {
              console.error("[SpawnBackpack]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Make Your Own Backpack",
          isTogglable: false,
          toolTip:
            "spawns a large backpack loaded with your selected item ID (x15)",
          method: () => {
            try {
              const _id = itemIDs[itemIndex];
              const _pos = rightHandTransform.method("get_position").invoke();
              const _bag = n5SpawnContainerItemAt(
                "item_backpack_large_base",
                _pos,
                identityRotation,
              );
              if (!_bag || _bag.handle.isNull()) {
                currentNotification = "backpack spawn failed";
                notifactionResetTime = time + 2;
                return;
              }
              let _con = null;
              _con = n5GetContainerFromItem(_bag);
              if (!_con || _con.handle.isNull()) {
                currentNotification = "no container";
                notifactionResetTime = time + 2;
                return;
              }
              let _filled = 0;
              for (let _i = 0; _i < 15; _i++) {
                try {
                  const _it = n5SpawnContainerItemAt(
                    _id,
                    _pos,
                    identityRotation,
                  );
                  if (n5AddItemObjectToContainer(_it, _con)) _filled++;
                } catch (_) {}
              }
              currentNotification =
                "Custom Backpack [" + _id + "]: " + _filled + "/15";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[CustomBackpack]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Random Backpack",
          isTogglable: false,
          toolTip: "large backpack stuffed with 15 random items",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _bag = n5SpawnContainerItemAt(
                "item_backpack_large_base",
                _pos,
                identityRotation,
              );
              if (!_bag || _bag.handle.isNull()) {
                currentNotification = "backpack spawn failed";
                notifactionResetTime = time + 2;
                return;
              }
              let _con = null;
              _con = n5GetContainerFromItem(_bag);
              if (!_con || _con.handle.isNull()) {
                currentNotification = "no container";
                notifactionResetTime = time + 2;
                return;
              }
              let _filled = 0;
              for (let _i = 0; _i < 15; _i++) {
                const _id = itemIDs[Math.floor(Math.random() * itemIDs.length)];
                try {
                  const _it = n5SpawnContainerItemAt(
                    _id,
                    _pos,
                    identityRotation,
                  );
                  if (n5AddItemObjectToContainer(_it, _con)) _filled++;
                } catch (_) {}
              }
              currentNotification =
                "Random Backpack: " + _filled + "/15 loaded";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[RandomBackpack]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn All Backpack Variants",
          isTogglable: false,
          toolTip: "spawns every backpack variant at your position",
          method: () => {
            const _backpackIDs = [
              "item_backpack",
              "item_backpack_black",
              "item_backpack_green",
              "item_backpack_large_base",
              "item_backpack_large_basketball",
              "item_backpack_large_clover",
              "item_backpack_pink",
              "item_backpack_small_base",
              "item_backpack_white",
              "item_backpack_with_flashlight",
            ];
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              let _spawned = 0;
              for (const _id of _backpackIDs) {
                try {
                  const _off = Vector3Cls.method("op_Addition").invoke(_pos, [
                    0,
                    0.15 * _spawned,
                    0,
                  ]);
                  const _b = n5SpawnContainerItemAt(
                    _id,
                    _off,
                    identityRotation,
                  );
                  if (_b && !_b.handle.isNull()) _spawned++;
                } catch (_) {}
              }
              currentNotification =
                " Spawned " +
                _spawned +
                "/" +
                _backpackIDs.length +
                " backpacks";
              notifactionResetTime = time + 3;
            } catch (_e) {
              console.error("[AllBackpacks]", _e);
            }
          },
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Prefab +",
          isTogglable: false,
          toolTip: "next prefab",
          method: () => {
            prefabIndex = (prefabIndex + 1) % prefabList.length;
            currentNotification = "PREFAB: " + prefabList[prefabIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Prefab -",
          isTogglable: false,
          toolTip: "previous prefab",
          method: () => {
            prefabIndex =
              (prefabIndex - 1 + prefabList.length) % prefabList.length;
            currentNotification = "PREFAB: " + prefabList[prefabIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Item +",
          isTogglable: false,
          toolTip: "next item",
          method: () => {
            itemIndex = (itemIndex + 1) % itemIDs.length;
            currentNotification = "ITEM: " + itemIDs[itemIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Item -",
          isTogglable: false,
          toolTip: "previous item",
          method: () => {
            itemIndex = (itemIndex - 1 + itemIDs.length) % itemIDs.length;
            currentNotification = "ITEM: " + itemIDs[itemIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Mob +",
          isTogglable: false,
          toolTip: "next mob",
          method: () => {
            mobIndex = (mobIndex + 1) % mobIDs.length;
            currentNotification = "MOB: " + mobIDs[mobIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Mob -",
          isTogglable: false,
          toolTip: "previous mob",
          method: () => {
            mobIndex = (mobIndex - 1 + mobIDs.length) % mobIDs.length;
            currentNotification = "MOB: " + mobIDs[mobIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Random Item Color/Size",
          isTogglable: true,
          toolTip: "randomizes color and size for item spawns/launcher",
          enableMethod: () => {
            n5RandomSpawnConfig = true;
            currentNotification = "Random item config ON";
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5RandomSpawnConfig = false;
            currentNotification = "Random item config OFF";
            notifactionResetTime = time + 2;
          },
          method: () => {},
        }),
        new MenuItem({
          buttonText: "Spawn Selected Item",
          isTogglable: false,
          toolTip: "spawn selected item at your right hand",
          method: () => {
            const _pos = rightHandTransform.method("get_position").invoke();
            const _rot = rightHandTransform.method("get_rotation").invoke();
            const _obj = n5SpawnConfiguredItemAt(
              itemIDs[itemIndex],
              _pos,
              _rot,
            );
            currentNotification = _obj
              ? "Spawned item: " + itemIDs[itemIndex]
              : "Item spawn failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Selected Mob",
          isTogglable: false,
          toolTip: "spawn selected mob at your right hand",
          method: () => {
            const _pos = rightHandTransform.method("get_position").invoke();
            const _rot = rightHandTransform.method("get_rotation").invoke();
            const _obj = n5SpawnMobAt(mobIDs[mobIndex], _pos, _rot);
            currentNotification = _obj
              ? "Spawned mob: " + mobIDs[mobIndex]
              : "Mob spawn failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Shark",
          isTogglable: false,
          toolTip: "spawn BigSharkController at your right hand",
          method: () => {
            try {
              const _pos = rightHandTransform.method("get_position").invoke();
              const _rot = rightHandTransform.method("get_rotation").invoke();
              const _ok =
                n5SpawnMobAt("BigSharkController", _pos, _rot) ||
                spawnNetworkPrefab("BigSharkController", _pos, _rot) ||
                spawnNetworkPrefab("mob_prefab/BigSharkController", _pos, _rot);
              currentNotification = _ok
                ? "Shark spawned"
                : "Shark spawn failed";
              notifactionResetTime = time + 2;
            } catch (_e) {
              currentNotification = "Shark spawn failed";
              notifactionResetTime = time + 2;
              console.error("[N5 SpawnShark]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Spawn Selected Prefab",
          isTogglable: false,
          toolTip: "spawn selected network prefab at your right hand",
          method: () => {
            const _name = prefabList[prefabIndex];
            if (
              disableDangerousPrefabs &&
              dangerousPrefabs.indexOf(_name) >= 0
            ) {
              currentNotification = "Dangerous prefab blocked";
              notifactionResetTime = time + 2;
              return;
            }
            const _pos = rightHandTransform.method("get_position").invoke();
            const _rot = rightHandTransform.method("get_rotation").invoke();
            const _obj = spawnNetworkPrefab(_name, _pos, _rot);
            currentNotification = _obj
              ? "Spawned prefab: " + _name
              : "Prefab spawn failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Hold Selected Prefab",
          isTogglable: true,
          toolTip: "keeps selected prefab locked to right hand",
          enableMethod: () => {
            n5StartHeldPrefab(prefabList[prefabIndex]);
          },
          disableMethod: () => {
            n5StopHeldPrefab();
          },
          method: () => {
            n5UpdateHeldPrefab();
          },
        }),
        new MenuItem({
          buttonText: "Stop Holding Prefab",
          isTogglable: false,
          toolTip: "despawns the held prefab",
          method: () => {
            n5StopHeldPrefab();
          },
        }),
        new MenuItem({
          buttonText: "Prefab Gun",
          isTogglable: true,
          toolTip:
            "hold right grip and trigger to spawn selected prefab at pointer",
          method: () => {
            if (!rightGrab) return;
            const _g = getGunPointerResult();
            if (
              !n5GunRayOk(_g.ray) ||
              !rightTrigger ||
              time < n5OrbitFuckeryShootDelay
            )
              return;
            const _name = prefabList[prefabIndex];
            if (
              disableDangerousPrefabs &&
              dangerousPrefabs.indexOf(_name) >= 0
            ) {
              currentNotification = "Dangerous prefab blocked";
              notifactionResetTime = time + 2;
              return;
            }
            n5OrbitFuckeryShootDelay = time;
            const _res = spawnNetworkPrefab(
              _name,
              _g.endPosition,
              identityRotation,
            );
            currentNotification = _res
              ? "Spawned: " + _name
              : "Prefab not found: " + _name;
            notifactionResetTime = time + 1.5;
          },
        }),
        new MenuItem({
          buttonText: "Projectile +",
          isTogglable: false,
          toolTip: "next projectile prefab",
          method: () => {
            n5ProjectileIndex =
              (n5ProjectileIndex + 1) % n5ProjectilePrefabs.length;
            currentNotification =
              "Projectile: " + n5ProjectilePrefabs[n5ProjectileIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Projectile -",
          isTogglable: false,
          toolTip: "previous projectile prefab",
          method: () => {
            n5ProjectileIndex =
              (n5ProjectileIndex - 1 + n5ProjectilePrefabs.length) %
              n5ProjectilePrefabs.length;
            currentNotification =
              "Projectile: " + n5ProjectilePrefabs[n5ProjectileIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Projectile Swapper",
          isTogglable: true,
          toolTip: "flare gun shots also launch selected projectile",
          enableMethod: () => {
            n5ProjectileSwapEnabled = true;
            currentNotification =
              "Projectile swap: " + n5ProjectilePrefabs[n5ProjectileIndex];
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5ProjectileSwapEnabled = false;
          },
          method: () => {},
        }),
        new MenuItem({
          buttonText: "Selected Projectile Gun",
          isTogglable: true,
          toolTip: "hold right grip and trigger to launch selected projectile",
          method: () => {
            n5LaunchSelectedProjectile();
          },
        }),
        new MenuItem({
          buttonText: "Flare Lands Prefab",
          isTogglable: true,
          toolTip: "flare gun target/impact spawns selected prefab",
          enableMethod: () => {
            n5FlarePrefabImpactEnabled = true;
            currentNotification = "Flare prefab ON: " + prefabList[prefabIndex];
            notifactionResetTime = time + 2;
          },
          disableMethod: () => {
            n5FlarePrefabImpactEnabled = false;
          },
          method: () => {
            n5FlarePrefabFallback();
          },
        }),
        new MenuItem({
          buttonText: "Spawn Prefab Left",
          isTogglable: false,
          toolTip: "spawn selected prefab normally on left hand",
          method: () => {
            const _p = leftHandTransform.method("get_position").invoke(),
              _r = leftHandTransform.method("get_rotation").invoke(),
              _name = prefabList[prefabIndex];
            currentNotification = spawnNetworkPrefab(_name, _p, _r)
              ? "Left spawned: " + _name
              : "Left prefab failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Selling Left",
          isTogglable: false,
          toolTip: "spawn selling machine normally on left hand",
          method: () => {
            const _p = leftHandTransform.method("get_position").invoke(),
              _r = leftHandTransform.method("get_rotation").invoke();
            currentNotification = spawnNetworkPrefab(
              "ItemSellingMachineController",
              _p,
              _r,
            )
              ? "Selling left spawned"
              : "Selling left failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Buggy Left",
          isTogglable: false,
          toolTip: "spawn buggy normally on left hand",
          method: () => {
            const _p = leftHandTransform.method("get_position").invoke(),
              _r = leftHandTransform.method("get_rotation").invoke();
            currentNotification = spawnNetworkPrefab("Vehicle_Buggy", _p, _r)
              ? "Buggy left spawned"
              : "Buggy left failed";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Selected Prefab Orbit",
          isTogglable: true,
          toolTip: "orbit the selected prefab around you",
          method: () => {
            n5RunPrefabOrbit(prefabList[prefabIndex], 16, 6.5, 0.0);
          },
          disableMethod: () => {
            n5ClearOrbitFuckery();
            currentNotification = "Orbit cleared";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Angler Orbit",
          isTogglable: true,
          toolTip: "orbit AnglerController prefabs",
          method: () => {
            n5RunPrefabOrbit("AnglerController", 16, 6.5, 0.0);
          },
          disableMethod: () => {
            n5ClearOrbitFuckery();
          },
        }),
        new MenuItem({
          buttonText: "Selling Machine Orbit",
          isTogglable: true,
          toolTip: "orbit selling machine prefabs",
          method: () => {
            n5RunPrefabOrbit("ItemSellingMachineController", 16, 6.6, 0.0);
          },
          disableMethod: () => {
            n5ClearOrbitFuckery();
          },
        }),
        new MenuItem({
          buttonText: "Selling Tower Orbit",
          isTogglable: true,
          toolTip: "3-story selling machine tower orbit",
          method: () => {
            n5RunSellingTowerOrbit();
          },
          disableMethod: () => {
            n5ClearTowerOrbit();
            currentNotification = "Selling tower orbit cleared";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Ogre Orbit",
          isTogglable: true,
          toolTip: "orbit GiantController prefabs",
          method: () => {
            n5RunPrefabOrbit("GiantController", 16, 6.6, 0.0);
          },
          disableMethod: () => {
            n5ClearOrbitFuckery();
          },
        }),
        new MenuItem({
          buttonText: "Buggy Orbit",
          isTogglable: true,
          toolTip: "orbit buggy prefabs",
          method: () => {
            n5RunPrefabOrbit("Vehicle_Buggy", 16, 6.6, 0.0);
          },
          disableMethod: () => {
            n5ClearOrbitFuckery();
          },
        }),
        new MenuItem({
          buttonText: "Christmas Box Orbit",
          isTogglable: true,
          toolTip: "orbit ChristmasBox prefabs",
          method: () => {
            n5RunPrefabOrbit("ChristmasBox", 16, 6.6, 0.0);
          },
          disableMethod: () => {
            n5ClearOrbitFuckery();
          },
        }),
        new MenuItem({
          buttonText: "Leaderboard Orbit",
          isTogglable: true,
          toolTip: "orbit HordeMobLobbyHandler prefabs",
          method: () => {
            n5RunPrefabOrbit("HordeMobLobbyHandler", 16, 6.6, 0.0);
          },
          disableMethod: () => {
            n5ClearOrbitFuckery();
          },
        }),
        new MenuItem({
          buttonText: "Clear Orbit Prefabs",
          isTogglable: false,
          toolTip: "despawn prefabs created by this tab",
          method: () => {
            n5ClearOrbitFuckery();
            currentNotification = "Orbit prefabs cleared";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Item Gun",
          isTogglable: true,
          toolTip:
            "hold right grip and trigger to spawn selected item at pointer",
          method: () => {
            if (!rightGrab || !rightTrigger || time < n5OrbitFuckeryShootDelay)
              return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            n5OrbitFuckeryShootDelay = time;
            n5SpawnConfiguredItemAt(
              itemIDs[itemIndex],
              _g.endPosition,
              identityRotation,
            );
          },
        }),
        new MenuItem({
          buttonText: "Spawn Mob Gun",
          isTogglable: true,
          toolTip:
            "hold right grip and trigger to spawn selected mob at pointer",
          method: () => {
            if (!rightGrab || !rightTrigger || time < n5OrbitFuckeryShootDelay)
              return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            n5OrbitFuckeryShootDelay = time;
            n5SpawnMobAt(mobIDs[mobIndex], _g.endPosition, identityRotation);
          },
        }),
        new MenuItem({
          buttonText: "Kick Gun",
          isTogglable: true,
          toolTip: "aim at a player and pull trigger",
          method: () => {
            if (!rightGrab || !rightTrigger || time < tagGunDelay) return;
            const _g = getGunPointerResult();
            if (!n5GunRayOk(_g.ray)) return;
            tagGunDelay = time + 0.75;
            try {
              const _col = _g.ray.raw
                ? _g.ray.raw.method("get_collider").invoke()
                : null;
              const _target = _col
                ? _col
                    .method("GetComponentInParent", 1)
                    .inflate(NetPlayerCls)
                    .invoke()
                : null;
              if (
                _target &&
                !_target.handle.isNull() &&
                !_target.method("get_IsMine").invoke()
              ) {
                currentNotification = n5KickPlayerObject(_target)
                  ? "Kick sent"
                  : "Kick failed";
                notifactionResetTime = time + 2;
              }
            } catch (_e) {
              console.error("[KickGun]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Kick All Once",
          isTogglable: false,
          toolTip: "send kick to every non-local player once",
          method: () => {
            let _cnt = 0;
            try {
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              while (_en.method("MoveNext").invoke()) {
                const _pl = _en.method("get_Current").invoke();
                if (
                  !_pl ||
                  _pl.handle.isNull() ||
                  _pl.method("get_IsMine").invoke()
                )
                  continue;
                if (n5KickPlayerObject(_pl)) _cnt++;
              }
            } catch (_e) {
              console.error("[KickAllOnce]", _e);
            }
            currentNotification = "Kick sent to " + _cnt + " players";
            notifactionResetTime = time + 2;
          },
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        n5PrefabDisplay,
        new MenuItem({
          buttonText: "Prefab +",
          isTogglable: false,
          toolTip: "next prefab",
          method: () => {
            prefabIndex = (prefabIndex + 1) % prefabList.length;
            currentNotification = "PREFAB: " + prefabList[prefabIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Prefab -",
          isTogglable: false,
          toolTip: "previous prefab",
          method: () => {
            prefabIndex =
              (prefabIndex - 1 + prefabList.length) % prefabList.length;
            currentNotification = "PREFAB: " + prefabList[prefabIndex];
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Larp Selected Prefab",
          isTogglable: true,
          toolTip: "selected prefab follows inside you with collisions off",
          enableMethod: () => {
            n5StartLarpPrefab(prefabList[prefabIndex]);
          },
          disableMethod: () => {
            n5StopLarpPrefab();
          },
          method: () => {
            n5UpdateLarpPrefab();
          },
        }),
        new MenuItem({
          buttonText: "Larp SellingMachine",
          isTogglable: true,
          toolTip: "selling machine follows inside you with collisions off",
          enableMethod: () => {
            n5StartLarpPrefab("ItemSellingMachineController");
          },
          disableMethod: () => {
            n5StopLarpPrefab();
          },
          method: () => {
            n5UpdateLarpPrefab();
          },
        }),
        new MenuItem({
          buttonText: "Larp Buggy",
          isTogglable: true,
          toolTip: "buggy follows inside you with collisions off",
          enableMethod: () => {
            n5StartLarpPrefab("Vehicle_Buggy");
          },
          disableMethod: () => {
            n5StopLarpPrefab();
          },
          method: () => {
            n5UpdateLarpPrefab();
          },
        }),
        new MenuItem({
          buttonText: "Stop Larping",
          isTogglable: false,
          toolTip: "remove the larp prefab",
          method: () => {
            n5StopLarpPrefab();
          },
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to Other Players",
          isTogglable: false,
          toolTip: "back to other players hub",
          method: () => {
            currentCategory = 42;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Whitelist gun",
          isTogglable: true,
          toolTip:
            "point at player and pull trigger to whitelist/unwhitelist them",
          disableMethod: () => {
            gunColor = [0.08, 0.08, 0.08, 0.75];
          },
          method: () => {
            if (!rightGrab) {
              gunColor = [0.08, 0.08, 0.08, 0.75];
              return;
            }
            const _g = getGunPointerResult();
            let _target = null;
            try {
              if (n5GunRayOk(_g.ray)) {
                const _col = _g.ray.raw
                  ? _g.ray.raw.method("get_collider").invoke()
                  : null;
                _target = _col
                  ? _col
                      .method("GetComponentInParent", 1)
                      .inflate(NetPlayerCls)
                      .invoke()
                  : null;
                if (
                  _target &&
                  (!_target.handle || !_target.handle.isNull()) &&
                  !_target.method("get_IsMine").invoke()
                ) {
                  gunColor = n5WhitelistHas(_target)
                    ? [0.2, 1.0, 0.3, 1.0]
                    : [1.0, 0.2, 0.2, 1.0];
                } else {
                  _target = null;
                  gunColor = [0.08, 0.08, 0.08, 0.75];
                }
              }
              if (rightTrigger && time > idGunDelay) {
                idGunDelay = time + 0.2;
                if (_target) {
                  if (n5WhitelistHas(_target)) {
                    n5WhitelistRemove(_target);
                    currentNotification = "Removed from whitelist";
                    gunColor = [1.0, 0.2, 0.2, 1.0];
                  } else {
                    n5WhitelistAdd(_target);
                    currentNotification = "Added to whitelist";
                    gunColor = [0.2, 1.0, 0.3, 1.0];
                  }
                  notifactionResetTime = time + 2;
                }
              }
            } catch (_e) {
              console.error("[Whitelist gun]", _e);
            }
          },
        }),
        new MenuItem({
          buttonText: "Whitelist All",
          isTogglable: false,
          toolTip: "adds every non-local player to whitelist",
          method: () => {
            n5WhitelistAllPlayers();
          },
        }),
        new MenuItem({
          buttonText: "Unwhitelist all",
          isTogglable: false,
          toolTip: "clears the entire whitelist",
          method: () => {
            const _c = whitelist.length;
            whitelist = [];
            currentNotification = "Whitelist cleared (" + _c + ")";
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Count",
          isTogglable: false,
          toolTip: "show whitelist count",
          method: () => {
            currentNotification = "Whitelisted: " + whitelist.length;
            notifactionResetTime = time + 2;
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Fly",
          isTogglable: true,
          toolTip: "whitelisted players can fly by right fist",
          method: () => {
            n5RunWhitelistedFist(0.02, (_rig) => n5WhitelistFlyPlayer(_rig));
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand RPG",
          isTogglable: true,
          toolTip: "whitelisted players shoot rockets by right fist",
          method: () => {
            n5RunWhitelistedFist(0.05, (_rig) => {
              n5WhitelistSpawnPrefabFromHand(
                "RPGRocket",
                n5GetRigHand(_rig, true),
                0,
              );
              n5WhitelistSpawnPrefabFromHand(
                "RPGRocket",
                n5GetRigHand(_rig, false),
                0,
              );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand RPG Spear",
          isTogglable: true,
          toolTip: "whitelisted players shoot spear rockets by right fist",
          method: () => {
            n5RunWhitelistedFist(0.05, (_rig) => {
              n5WhitelistSpawnPrefabFromHand(
                "RPGRocketSpear",
                n5GetRigHand(_rig, true),
                0,
              );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Flare",
          isTogglable: true,
          toolTip: "whitelisted players shoot flares by right fist",
          method: () => {
            n5RunWhitelistedFist(0.08, (_rig) => {
              n5WhitelistSpawnPrefabFromHand(
                "FlareGunProjectile",
                n5GetRigHand(_rig, true),
                20,
              );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand RPG Sniper",
          isTogglable: true,
          toolTip: "whitelisted players shoot fast rockets by right fist",
          method: () => {
            n5RunWhitelistedFist(0.08, (_rig) => {
              n5WhitelistSpawnPrefabFromHand(
                "RPGRocket",
                n5GetRigHand(_rig, true),
                500,
              );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Xmas",
          isTogglable: true,
          toolTip: "whitelisted players spawn Christmas boxes by right fist",
          method: () => {
            n5RunWhitelistedFist(0.7, (_rig) => {
              n5WhitelistSpawnPrefabFromHand(
                "ChristmasBox",
                n5GetRigHand(_rig, true),
                0,
              );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Selling",
          isTogglable: true,
          toolTip: "whitelisted players spawn selling machines by right fist",
          method: () => {
            n5RunWhitelistedFist(0.7, (_rig) => {
              n5WhitelistSpawnPrefabFromHand(
                "ItemSellingMachineController",
                n5GetRigHand(_rig, true),
                0,
              );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Car",
          isTogglable: true,
          toolTip: "whitelisted players launch cars by right fist",
          method: () => {
            n5RunWhitelistedFist(0.5, (_rig) => {
              n5WhitelistSpawnPrefabFromHand(
                "Vehicle_Buggy",
                n5GetRigHand(_rig, true),
                20,
              );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Crate",
          isTogglable: true,
          toolTip: "whitelisted players spawn crates by right fist",
          method: () => {
            n5RunWhitelistedFist(0.1, (_rig) => {
              n5WhitelistSpawnItemFromHand(
                "item_crate",
                n5GetRigHand(_rig, true),
                0,
              );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Suitcase",
          isTogglable: true,
          toolTip: "whitelisted players spawn suitcases by right fist",
          method: () => {
            n5RunWhitelistedFist(0.1, (_rig) => {
              n5WhitelistSpawnItemFromHand(
                "item_pelican_case",
                n5GetRigHand(_rig, true),
                0,
              );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Bomb",
          isTogglable: true,
          toolTip: "whitelisted players launch bombs by right fist",
          method: () => {
            n5RunWhitelistedFist(0.5, (_rig) => {
              n5WhitelistSpawnPrefabFromHand(
                "BombController",
                n5GetRigHand(_rig, true),
                20,
              ) ||
                n5WhitelistSpawnItemFromHand(
                  "item_dynamite",
                  n5GetRigHand(_rig, true),
                  20,
                );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Egg",
          isTogglable: true,
          toolTip: "whitelisted players launch eggs by right fist",
          method: () => {
            n5RunWhitelistedFist(0.3, (_rig) => {
              n5WhitelistSpawnPrefabFromHand(
                "RPGRocketEgg",
                n5GetRigHand(_rig, true),
                20,
              ) ||
                n5WhitelistSpawnPrefabFromHand(
                  "ExplosiveEgg",
                  n5GetRigHand(_rig, true),
                  20,
                );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Balloon",
          isTogglable: true,
          toolTip: "whitelisted players spawn balloons by right fist",
          method: () => {
            n5RunWhitelistedFist(0.3, (_rig) => {
              n5WhitelistSpawnPrefabFromHand(
                "InflatedBalloon",
                n5GetRigHand(_rig, true),
                0,
              );
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Hand Giveaway",
          isTogglable: true,
          toolTip: "whitelisted players get random items by right fist",
          method: () => {
            n5RunWhitelistedFist(0.3, (_rig) => {
              const _id = itemIDs[Math.floor(Math.random() * itemIDs.length)];
              n5WhitelistSpawnItemFromHand(_id, n5GetRigHand(_rig, true), 0);
            });
          },
        }),
        new MenuItem({
          buttonText: "Whitelist Disintegrate",
          isTogglable: true,
          toolTip: "whitelisted players disintegrate nearest player with thumb",
          method: () => {
            for (const _rig of n5WhitelistedPlayers()) {
              try {
                const _uid = n5GetPlayerUserId(_rig);
                if (!_uid) continue;
                if (!whitelistDisintegrateDelays[_uid])
                  whitelistDisintegrateDelays[_uid] = 0;
                const _f = n5GetRightFingers(_rig);
                if (
                  !_f ||
                  _f.isNull() ||
                  _f.field("_thumbValue").value <= 0.8 ||
                  time <= whitelistDisintegrateDelays[_uid]
                )
                  continue;
                whitelistDisintegrateDelays[_uid] = time + 1.0;
                const _pos = getTransform(_rig).method("get_position").invoke();
                let _target = null,
                  _best = Number.MAX_SAFE_INTEGER;
                const _en = NetPlayerCls.field("playerIDToNetPlayer")
                  .value.method("get_Values")
                  .invoke()
                  .method("GetEnumerator")
                  .invoke();
                while (_en.method("MoveNext").invoke()) {
                  const _pl = _en.method("get_Current").invoke();
                  if (
                    !_pl ||
                    _pl.handle.isNull() ||
                    _pl.method("get_IsMine").invoke() ||
                    n5GetPlayerUserId(_pl) === _uid
                  )
                    continue;
                  const _d = Vector3Cls.method("Distance").invoke(
                    _pos,
                    getTransform(_pl).method("get_position").invoke(),
                  );
                  if (_d < _best) {
                    _best = _d;
                    _target = _pl;
                  }
                }
                if (_target && !_target.handle.isNull()) {
                  const _tpos = getTransform(_target)
                    .method("get_position")
                    .invoke();
                  const _runner = SFXManagerCls.field("_instance")
                    .value.method("get__currentRunner")
                    .invoke();
                  for (const _k of Object.keys(VFXTypes)) {
                    if (_k === "None") continue;
                    try {
                      n5PlayVFXAt(VFXTypes[_k], _tpos, identityRotation);
                    } catch (_) {}
                  }
                  _target.method("RPC_Teleport").invoke([0, -9999999, 0]);
                  try {
                    _target
                      .method("RPC_AddForce", 3)
                      .invoke(
                        Vector3Cls.method("op_Multiply", 2).invoke(
                          getTransform(_target).method("get_forward").invoke(),
                          1500 * deltaTime,
                        ),
                      );
                  } catch (_) {}
                  try {
                    _target
                      .method("RPC_SetColorHSV")
                      .invoke(NaN, NaN, NaN, NaN);
                  } catch (_) {}
                }
              } catch (_e) {
                console.error("[Whitelist Disintegrate]", _e);
              }
            }
          },
        }),
        new MenuItem({
          buttonText: "Kick Whitelist",
          isTogglable: false,
          toolTip: "kick every whitelisted non-local player",
          method: () => {
            let _c = 0;
            for (const _rig of n5WhitelistedPlayers()) {
              try {
                if (n5KickPlayerObject(_rig)) _c++;
              } catch (_) {}
            }
            currentNotification = "Kick sent to " + _c + " whitelisted";
            notifactionResetTime = time + 2;
          },
        }),
      ],

      [
        new MenuItem({
          buttonText: "<< Back to Overpowered",
          isTogglable: false,
          toolTip: "back to overpowered hub",
          method: () => {
            currentCategory = 46;
            currentPage = 0;
          },
        }),
        new MenuItem({
          buttonText: "Spawn Mom Boss",
          isTogglable: false,
          toolTip: "spawn mom boss related prefab/item at right hand",
          method: () => {
            n5SpawnMomBossAtHand();
          },
        }),
        new MenuItem({
          buttonText: "Spawn Mom At Me",
          isTogglable: false,
          toolTip: "spawn mom boss at your position",
          method: () => {
            n5SpawnMomBossAt(n5LocalPlayerPos(), identityRotation);
          },
        }),
        new MenuItem({
          buttonText: "Mom Reset Game",
          isTogglable: false,
          toolTip: "calls MomBoss ResetGame/RPC_ResetGame",
          method: () => {
            n5MomBossCall("ResetGame") || n5MomBossCall("RPC_ResetGame");
          },
        }),
        new MenuItem({
          buttonText: "Mom Easy Mode",
          isTogglable: false,
          toolTip: "sets mom boss easy mode field from dump",
          method: () => {
            n5MomBossSetField("_isEasyMode", true);
          },
        }),
        new MenuItem({
          buttonText: "Mom Always Win",
          isTogglable: false,
          toolTip: "sets mom boss always-win field from dump",
          method: () => {
            n5MomBossSetField("_isAlwaysWinMode", true);
          },
        }),
        new MenuItem({
          buttonText: "Mom Toy Block",
          isTogglable: false,
          toolTip: "change mom boss game mode to toy block",
          method: () => {
            n5MomBossCall("SetToyBlockGameState") ||
              n5MomBossCall("TestP2ToyBlock");
          },
        }),
        new MenuItem({
          buttonText: "Mom Simon Says",
          isTogglable: false,
          toolTip: "change mom boss game mode to simon says",
          method: () => {
            n5MomBossCall("SetSimonSaysGameState") ||
              n5MomBossCall("TestP2SimonSays");
          },
        }),
        new MenuItem({
          buttonText: "Mom Floor Slap",
          isTogglable: false,
          toolTip: "change mom boss game mode to floor slap",
          method: () => {
            n5MomBossCall("SetFloorSlappingGameState") ||
              n5MomBossCall("TestP3FloorSlap");
          },
        }),
        new MenuItem({
          buttonText: "Mom Blade Ball",
          isTogglable: false,
          toolTip: "change mom boss game mode to blade ball",
          method: () => {
            n5MomBossCall("SetBladeBallGameState") ||
              n5MomBossCall("TestP4BladeBall");
          },
        }),
        new MenuItem({
          buttonText: "Mom Summon Zombies",
          isTogglable: false,
          toolTip: "calls mom boss SummonZombies",
          method: () => {
            n5MomBossCall("SummonZombies") ||
              n5MomBossCall("SetSummonZombiesP3GameState");
          },
        }),
        new MenuItem({
          buttonText: "Mom Supply Burst",
          isTogglable: false,
          toolTip: "MomBossItemSpawner.SpawnSupplyItems / fallback supplies",
          method: () => {
            n5MomSupplyBurst();
          },
        }),
        new MenuItem({
          buttonText: "Horde On",
          isTogglable: false,
          toolTip: "turns horde controller/spawner fields on",
          method: () => {
            n5HordeControl(true);
          },
        }),
        new MenuItem({
          buttonText: "Horde Off",
          isTogglable: false,
          toolTip: "turns horde controller/spawner fields off",
          method: () => {
            n5HordeControl(false);
          },
        }),
        new MenuItem({
          buttonText: "Mom Kill Zombies",
          isTogglable: false,
          toolTip: "calls mom boss KillAllZombies",
          method: () => {
            n5MomBossCall("KillAllZombies");
          },
        }),
        new MenuItem({
          buttonText: "Mom Success",
          isTogglable: false,
          toolTip: "force mom boss success state",
          method: () => {
            n5MomBossCall("SetGameSuccessGameState") ||
              n5MomBossCall("TestP2Success");
          },
        }),
        new MenuItem({
          buttonText: "Mom Death",
          isTogglable: false,
          toolTip: "force mom boss death state",
          method: () => {
            n5MomBossCall("SetDeathGameState") ||
              n5MomBossCall("SetFatalHitGameState");
          },
        }),
        new MenuItem({
          buttonText: "Mom Boss to Me",
          isTogglable: false,
          toolTip: "teleports the Mom Boss to your position",
          method: () => {
            try {
              const _player = NetPlayerCls.method("get_localPlayer").invoke();
              if (!_player || _player.handle.isNull()) {
                currentNotification = "No local player";
                notifactionResetTime = time + 2;
                return;
              }
              const _pos = getTransform(_player)
                .method("get_position")
                .invoke();
              const _momCls = acImage.class("AnimalCompany.MomBossController");
              let _inst = null;
              try {
                _inst = _momCls.field("_instance").value;
              } catch (_) {}
              try {
                if (!_inst || _inst.isNull())
                  _inst = UnityObjectCls.method("FindObjectOfType", 0)
                    .inflate(_momCls)
                    .invoke();
              } catch (_) {}
              if (!_inst || _inst.isNull()) {
                currentNotification = "MomBoss not found - spawn her first";
                notifactionResetTime = time + 3;
                return;
              }
              const _tf = getTransform(_inst);
              let _usedNative = false;
              const _teleportNames = [
                "Teleport",
                "TeleportTo",
                "SetPosition",
                "NetworkTeleport",
                "WarpTo",
                "RpcTeleport",
                "RPC_Teleport",
              ];
              for (const _name of _teleportNames) {
                try {
                  _momCls.method(_name).invoke(_inst, _pos);
                  _usedNative = true;
                  break;
                } catch (_) {}
                try {
                  _inst.method(_name).invoke(_pos);
                  _usedNative = true;
                  break;
                } catch (_) {}
                try {
                  _inst.method(_name).invoke(_pos, identityRotation);
                  _usedNative = true;
                  break;
                } catch (_) {}
              }
              if (!_usedNative) {
                const _ntNames = [
                  "Mirror.NetworkTransform",
                  "Mirror.NetworkTransformBase",
                  "Mirror.NetworkTransformReliable",
                  "Mirror.NetworkTransformUnreliable",
                  "FishNet.Component.Transforming.NetworkTransform",
                  "NetworkTransform",
                ];
                let _nt = null;
                for (const _name of _ntNames) {
                  try {
                    _nt = _inst.component(_name);
                    if (_nt && !_nt.handle.isNull()) break;
                  } catch (_) {}
                  try {
                    let _cls = null;
                    for (const _asm of Il2Cpp.domain.assemblies) {
                      try {
                        _cls = _asm.image.class(_name);
                        if (_cls) break;
                      } catch (_) {}
                    }
                    if (_cls) {
                      const _go = _inst.method("get_gameObject").invoke();
                      _nt = _go
                        .method("GetComponent", 1)
                        .inflate(_cls)
                        .invoke();
                      if (_nt && !_nt.handle.isNull()) break;
                    }
                  } catch (_) {}
                }
                if (_nt && !_nt.handle.isNull()) {
                  try {
                    _nt.field("syncPosition").value = false;
                  } catch (_) {}
                  try {
                    _nt.property("syncPosition").value = false;
                  } catch (_) {}
                  _tf.method("set_position").invoke(_pos);
                  const _targetFields = [
                    "targetSyncPosition",
                    "targetPosition",
                    "lastPosition",
                    "_syncPos",
                    "goal",
                  ];
                  for (const _f of _targetFields) {
                    try {
                      _nt.field(_f).value = _pos;
                    } catch (_) {}
                  }
                  const _syncMethods = [
                    "ForceTeleport",
                    "ForceSync",
                    "SetDirty",
                    "RpcTeleport",
                    "Teleport",
                    "RPC_Teleport",
                  ];
                  for (const _m of _syncMethods) {
                    try {
                      _nt.method(_m).invoke(_pos);
                      break;
                    } catch (_) {}
                    try {
                      _nt.method(_m).invoke();
                      break;
                    } catch (_) {}
                  }
                  try {
                    _nt.field("syncPosition").value = true;
                  } catch (_) {}
                  try {
                    _nt.property("syncPosition").value = true;
                  } catch (_) {}
                } else {
                  _tf.method("set_position").invoke(_pos);
                }
              }
              try {
                const _go = _inst.method("get_gameObject").invoke();
                if (_go && !_go.isNull()) {
                  try {
                    _go.method("SetActive").invoke(true);
                  } catch (_) {}
                  const _renderCls = Il2Cpp.domain
                    .assembly("UnityEngine.CoreModule")
                    .image.class("UnityEngine.Renderer");
                  const _renders = _go
                    .method("GetComponentsInChildren", 1)
                    .inflate(_renderCls)
                    .invoke(true);
                  for (let _ri = 0; _renders && _ri < _renders.length; _ri++) {
                    try {
                      const _r = _renders.get(_ri);
                      if (_r && !_r.handle.isNull())
                        _r.method("set_enabled").invoke(true);
                    } catch (_) {}
                  }
                  const _cols = _go
                    .method("GetComponentsInChildren", 1)
                    .inflate(ColliderCls)
                    .invoke(true);
                  for (let _ci = 0; _cols && _ci < _cols.length; _ci++) {
                    try {
                      const _c = _cols.get(_ci);
                      if (_c && !_c.handle.isNull())
                        _c.method("set_enabled").invoke(true);
                    } catch (_) {}
                  }
                }
              } catch (_eVis) {
                console.error("[MomBoss visible fix]", _eVis);
              }
              currentNotification = "Mom Boss teleported to you!";
              notifactionResetTime = time + 3;
            } catch (_e) {
              currentNotification = "Mom Boss to Me failed: " + _e;
              notifactionResetTime = time + 3;
              console.error("[MomBossToMe]", _e);
            }
          },
        }),
      ],
      n5BuildBlueprintCategory(),
      n5BuildGooningCategory(),
      n5BuildArenaFuckeryCategory(),
      n5BuildRigShitCategory(),
      n5BuildBuffFuckeryCategory(),
      n5BuildWorldFuckeryCategory(),
      n5BuildMachineFuckeryCategory(),
      n5BuildLocalPlayerCategory(),
      n5BuildUsersCategory(),
      n5BuildLaunchersCategory(),
      n5BuildShadowBossCategory(),
      n5BuildGoodShitCategory(),
      n5BuildIds20Category(),
      n5BuildIdListCategory("item", itemIDs),
      n5BuildIdListCategory("mob", mobIDs),
      n5BuildIdListCategory("prefab", prefabList),
      n5BuildIdListCategory("map", mapIDs),
      n5BuildOtherPlayersHubCategory(),
      n5BuildCombatHubCategory(),
      n5BuildContentHubCategory(),
      n5BuildToolsHubCategory(),
      n5BuildChaosHubCategory(),
      n5BuildOreFuckeryCategory(),
      [],
    ];
    menuCategories[9].push(
      new MenuItem({
        buttonText: "Tele: Moon Core",
        isTogglable: false,
        toolTip: "teleport to Dig Moon Core",
        method: () => teleportTo(TeleTarget.Dig_Moon_Core),
      }),
    );
    menuCategories[16] = menuCategories[16].filter((_b) =>
      [
        "<< Back to Guns",
        "DISABLE DANGEROUS PREFABS",
        "Show Dangerous List",
      ].includes(_b.buttonText),
    );
    const _n5DangerousView = menuCategories[16].find(
      (_b) => _b.buttonText === "Show Dangerous List",
    );
    if (_n5DangerousView)
      _n5DangerousView.buttonText = "View Dangerous Prefabs";
    let _iterMob = new Map();
    menuCategories.flat().forEach((_vx260) => {
      _iterMob.set(_vx260.buttonText, _vx260);
    });
    function _vx5b5(_vx44b) {
      try {
        const _categoryButtons = menuCategories[currentCategory] || [];
        const _pageStart = currentPage * 8;
        const _pageButtons = _categoryButtons.slice(_pageStart, _pageStart + 8);
        for (const _button of _pageButtons) {
          if (_button && _button.buttonText === _vx44b) return _button;
        }
        for (const _button of _categoryButtons) {
          if (_button && _button.buttonText === _vx44b) return _button;
        }
      } catch (_) {}
      return _iterMob.get(_vx44b);
    }
    const N5_IM_W = 300,
      N5_IM_H = 200,
      N5_IM_PANEL_W = 0.45,
      N5_IM_PANEL_H = 0.3;
    const _n5ImFb = new Uint8Array(N5_IM_W * N5_IM_H * 4);
    let _n5ImGo = null,
      _n5ImCursorGo = null,
      _n5ImCursorV = null,
      _n5ImTex = null,
      _n5ImUpload = null,
      _n5ImOpen = false,
      _n5ImTogglePrev = false,
      _n5ImClickPrev = false;
    let _n5ImCursorX = N5_IM_W >> 1,
      _n5ImCursorY = N5_IM_H >> 1,
      _n5ImAnim = 0,
      _n5ImDirty = true,
      _n5ImNextClick = 0,
      _n5ImNextPointer = 0,
      _n5ImHitOver = false,
      _n5ImLastSig = "";
    let _n5ImFlipH = false,
      _n5ImFlipV = false; // V flip now handled natively in upload (bottom-up buffer); H still toggleable
    function _n5ImLogFlip() {
      console.log(
        "[N5 ImGui Flip] flipH=" +
          _n5ImFlipH +
          " flipV=" +
          _n5ImFlipV +
          " (send this to dev to set as default)",
      );
    }
    const _n5ImFont = [
      [0, 0, 0, 0, 0, 0, 0],
      [4, 4, 4, 4, 4, 0, 4],
      [10, 10, 0, 0, 0, 0, 0],
      [10, 31, 10, 10, 31, 10, 0],
      [4, 15, 20, 14, 5, 30, 4],
      [24, 25, 2, 4, 8, 19, 3],
      [12, 18, 12, 22, 17, 17, 14],
      [4, 4, 0, 0, 0, 0, 0],
      [2, 4, 8, 8, 8, 4, 2],
      [8, 4, 2, 2, 2, 4, 8],
      [0, 4, 21, 14, 21, 4, 0],
      [0, 4, 4, 31, 4, 4, 0],
      [0, 0, 0, 0, 4, 4, 8],
      [0, 0, 0, 31, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 4],
      [1, 2, 2, 4, 8, 8, 16],
      [14, 17, 19, 21, 25, 17, 14],
      [4, 12, 4, 4, 4, 4, 14],
      [14, 17, 1, 6, 8, 16, 31],
      [31, 1, 2, 6, 1, 17, 14],
      [2, 6, 10, 18, 31, 2, 2],
      [31, 16, 30, 1, 1, 17, 14],
      [6, 8, 16, 30, 17, 17, 14],
      [31, 1, 2, 4, 8, 8, 8],
      [14, 17, 17, 14, 17, 17, 14],
      [14, 17, 17, 15, 1, 2, 12],
      [0, 4, 0, 0, 4, 0, 0],
      [0, 4, 0, 0, 4, 4, 8],
      [2, 4, 8, 16, 8, 4, 2],
      [0, 0, 31, 0, 31, 0, 0],
      [8, 4, 2, 1, 2, 4, 8],
      [14, 17, 1, 6, 4, 0, 4],
      [14, 17, 23, 21, 23, 16, 14],
      [4, 10, 17, 17, 31, 17, 17],
      [30, 17, 17, 30, 17, 17, 30],
      [14, 17, 16, 16, 16, 17, 14],
      [28, 18, 17, 17, 17, 18, 28],
      [31, 16, 16, 30, 16, 16, 31],
      [31, 16, 16, 30, 16, 16, 16],
      [14, 17, 16, 23, 17, 17, 15],
      [17, 17, 17, 31, 17, 17, 17],
      [14, 4, 4, 4, 4, 4, 14],
      [1, 1, 1, 1, 1, 17, 14],
      [17, 18, 20, 24, 20, 18, 17],
      [16, 16, 16, 16, 16, 16, 31],
      [17, 27, 21, 21, 17, 17, 17],
      [17, 25, 21, 19, 17, 17, 17],
      [14, 17, 17, 17, 17, 17, 14],
      [30, 17, 17, 30, 16, 16, 16],
      [14, 17, 17, 17, 21, 18, 13],
      [30, 17, 17, 30, 20, 18, 17],
      [15, 16, 16, 14, 1, 1, 30],
      [31, 4, 4, 4, 4, 4, 4],
      [17, 17, 17, 17, 17, 17, 14],
      [17, 17, 17, 10, 10, 4, 4],
      [17, 17, 21, 21, 10, 10, 17],
      [17, 17, 10, 4, 10, 17, 17],
      [17, 17, 10, 4, 4, 4, 4],
      [31, 1, 2, 4, 8, 16, 31],
    ];
    function _n5ImPx(x, y, r, g, b, a = 255) {
      x |= 0;
      y |= 0;
      if (x < 0 || x >= N5_IM_W || y < 0 || y >= N5_IM_H) return;
      const i = (y * N5_IM_W + x) * 4,
        iv = 255 - a;
      _n5ImFb[i] = ((r * a + _n5ImFb[i] * iv) / 255) | 0;
      _n5ImFb[i + 1] = ((g * a + _n5ImFb[i + 1] * iv) / 255) | 0;
      _n5ImFb[i + 2] = ((b * a + _n5ImFb[i + 2] * iv) / 255) | 0;
      _n5ImFb[i + 3] = Math.min(255, _n5ImFb[i + 3] + a);
    }
    function _n5ImRect(x, y, w, h, c) {
      const x0 = Math.max(0, x | 0),
        y0 = Math.max(0, y | 0),
        x1 = Math.min(N5_IM_W, (x + w) | 0),
        y1 = Math.min(N5_IM_H, (y + h) | 0);
      for (let py = y0; py < y1; py++) {
        let i = (py * N5_IM_W + x0) * 4;
        for (let px = x0; px < x1; px++, i += 4) {
          _n5ImFb[i] = c[0];
          _n5ImFb[i + 1] = c[1];
          _n5ImFb[i + 2] = c[2];
          _n5ImFb[i + 3] = 255;
        }
      }
    }
    function _n5ImLine(x0, y0, x1, y1, c) {
      x0 |= 0;
      y0 |= 0;
      x1 |= 0;
      y1 |= 0;
      const dx = Math.abs(x1 - x0),
        sx = x0 < x1 ? 1 : -1,
        dy = -Math.abs(y1 - y0),
        sy = y0 < y1 ? 1 : -1;
      let e = dx + dy;
      for (;;) {
        _n5ImPx(x0, y0, c[0], c[1], c[2], c[3]);
        if (x0 === x1 && y0 === y1) break;
        const e2 = e * 2;
        if (e2 >= dy) {
          e += dy;
          x0 += sx;
        }
        if (e2 <= dx) {
          e += dx;
          y0 += sy;
        }
      }
    }
    function _n5ImOutline(x, y, w, h, c) {
      _n5ImLine(x, y, x + w - 1, y, c);
      _n5ImLine(x, y + h - 1, x + w - 1, y + h - 1, c);
      _n5ImLine(x, y, x, y + h - 1, c);
      _n5ImLine(x + w - 1, y, x + w - 1, y + h - 1, c);
    }
    function _n5ImFlipFbV() {
      const row = new Uint8Array(N5_IM_W * 4);
      for (let y = 0; y < N5_IM_H >> 1; y++) {
        const a = y * N5_IM_W * 4,
          b = (N5_IM_H - 1 - y) * N5_IM_W * 4;
        row.set(_n5ImFb.subarray(a, a + N5_IM_W * 4));
        _n5ImFb.copyWithin(a, b, b + N5_IM_W * 4);
        _n5ImFb.set(row, b);
      }
    }
    function _n5ImFlipFbH() {
      for (let y = 0; y < N5_IM_H; y++) {
        let l = y * N5_IM_W * 4,
          r = (y * N5_IM_W + N5_IM_W - 1) * 4;
        while (l < r) {
          for (let c = 0; c < 4; c++) {
            const t = _n5ImFb[l + c];
            _n5ImFb[l + c] = _n5ImFb[r + c];
            _n5ImFb[r + c] = t;
          }
          l += 4;
          r -= 4;
        }
      }
    }
    function _n5ImText(x, y, text, c, sc = 1, maxChars = 999) {
      let cx = x;
      const s = String(text || "")
        .replace(/<[^>]*>/g, "")
        .toUpperCase()
        .slice(0, maxChars);
      for (const ch of s) {
        const code = ch.charCodeAt(0),
          g = code >= 32 && code <= 90 ? _n5ImFont[code - 32] : null;
        if (g)
          for (let row = 0; row < 7; row++)
            for (let col = 0; col < 5; col++)
              if (g[row] & (1 << col))
                for (let yy = 0; yy < sc; yy++)
                  for (let xx = 0; xx < sc; xx++)
                    _n5ImPx(
                      cx + col * sc + xx,
                      y + (6 - row) * sc + yy,
                      c[0],
                      c[1],
                      c[2],
                      c[3],
                    );
        cx += 6 * sc;
      }
      return cx - x;
    }
    function _n5ImRender() {
      _n5ImFb.fill(0);
      _n5ImRect(0, 0, N5_IM_W, N5_IM_H, [5, 7, 15, 255]);
      const ac = [
          Math.round(n5AccentColor[0] * 255),
          Math.round(n5AccentColor[1] * 255),
          Math.round(n5AccentColor[2] * 255),
          255,
        ],
        txt = [232, 238, 250, 255],
        dim = [126, 140, 166, 255];
      _n5ImRect(6, 6, N5_IM_W - 12, 30, [13, 17, 31, 255]);
      _n5ImOutline(6, 6, N5_IM_W - 12, 30, [ac[0], ac[1], ac[2], 115]);
      _n5ImText(14, 13, "N5.EXE", txt, 2);
      _n5ImText(102, 18, "IMGUI MODE", ac, 1);
      const cat = menuCategories[currentCategory] || [],
        pages = Math.max(1, Math.ceil(cat.length / 8));
      if (currentPage >= pages) currentPage = pages - 1;
      _n5ImText(
        14,
        42,
        "CATEGORY " +
          currentCategory +
          "  PAGE " +
          (currentPage + 1) +
          "/" +
          pages,
        dim,
        1,
      );
      const rows = cat.slice(currentPage * 8, currentPage * 8 + 8),
        rx = 10,
        rw = N5_IM_W - 20,
        ry = 54,
        rh = 16;
      for (let i = 0; i < 8; i++) {
        const y = ry + i * rh,
          b = rows[i],
          hov = false;
        const on = b && b.isTogglable && b.enabled;
        _n5ImRect(
          rx,
          y,
          rw,
          rh - 2,
          hov ? [35, 45, 73, 255] : on ? [19, 78, 68, 255] : [17, 22, 39, 255],
        );
        _n5ImOutline(rx, y, rw, rh - 2, [ac[0], ac[1], ac[2], hov ? 145 : 45]);
        if (b) {
          if (b.isTogglable) {
            _n5ImRect(
              rx + 5,
              y + 3,
              8,
              8,
              on ? [ac[0], ac[1], ac[2], 255] : [25, 31, 49, 255],
            );
            _n5ImOutline(rx + 5, y + 3, 8, 8, [ac[0], ac[1], ac[2], 180]);
          }
          _n5ImText(rx + 18, y + 4, b.buttonText, txt, 1, 37);
          if (b.isTogglable)
            _n5ImText(rx + rw - 24, y + 4, on ? "ON" : "OFF", on ? ac : dim, 1);
        }
      }
      const by = 184,
        nav = [
          { x: 6, w: 44, t: "HOME" },
          { x: 53, w: 57, t: "SEARCH" },
          { x: 113, w: 52, t: "< PREV" },
          { x: 168, w: 52, t: "NEXT >" },
          { x: 223, w: 71, t: "ORIGINAL" },
        ];
      for (const b of nav) {
        const h =
          _n5ImCursorX >= b.x &&
          _n5ImCursorX < b.x + b.w &&
          _n5ImCursorY >= by &&
          _n5ImCursorY < by + 18;
        _n5ImRect(b.x, by, b.w, 18, h ? [38, 54, 86, 250] : [18, 25, 43, 240]);
        _n5ImOutline(b.x, by, b.w, 18, [ac[0], ac[1], ac[2], h ? 180 : 70]);
        _n5ImText(b.x + 7, by + 6, b.t, h ? ac : txt, 1);
      }
    }

    function _n5ImInitUpload(tex) {
      let apply = null;
      try {
        const m = tex.method("Apply", 2);
        apply = () => m.invoke(false, false);
      } catch (_) {
        try {
          const m = tex.method("Apply", 0);
          apply = () => m.invoke();
        } catch (_2) {
          return;
        }
      }
      try {
        const p = Memory.alloc(_n5ImFb.length),
          m = tex.method("LoadRawTextureData", 2);
        _n5ImUpload = () => {
          p.writeByteArray(_n5ImFb.buffer);
          m.invoke(p, _n5ImFb.length);
          apply();
        };
        return;
      } catch (_) {}
      try {
        const raw = tex.method("GetRawTextureData", 0).invoke();
        let p = null;
        try {
          p = raw.field("m_Buffer").value;
        } catch (_) {}
        if (p && !p.isNull()) {
          _n5ImUpload = () => {
            p.writeByteArray(_n5ImFb.buffer);
            apply();
          };
          return;
        }
      } catch (_) {}
      try {
        const p = Memory.alloc(_n5ImFb.length),
          m = tex.method("LoadRawTextureData", 1);
        _n5ImUpload = () => {
          p.writeByteArray(_n5ImFb.buffer);
          m.invoke(p);
          apply();
        };
      } catch (e) {
        console.error("[N5 ImGui] no upload path", e);
      }
    }
    function _n5ImInit() {
      if (_n5ImGo) return true;
      try {
        const Texture2D = coreImage.class("UnityEngine.Texture2D"),
          white = Texture2D.method("get_whiteTexture").invoke();
        _n5ImTex = UnityObjectCls.method("Instantiate", 1).invoke(white);
        let ok = false;
        try {
          _n5ImTex.method("Reinitialize", 4).invoke(N5_IM_W, N5_IM_H, 4, false);
          ok = true;
        } catch (_) {}
        if (!ok)
          try {
            _n5ImTex.method("Resize", 4).invoke(N5_IM_W, N5_IM_H, 4, false);
            ok = true;
          } catch (_) {}
        if (!ok) throw new Error("Texture2D resize unavailable");
        try {
          _n5ImTex.method("set_filterMode").invoke(1);
        } catch (_) {}
        _n5ImGo = GameObjectCls.method("CreatePrimitive").invoke(5);
        _n5ImGo.method("set_name").invoke(Il2Cpp.string("N5_ImGui_Panel"));
        try {
          const c = getComponent(_n5ImGo, ColliderCls);
          if (c) destroyObject(c);
        } catch (_) {}
        const r = getComponent(_n5ImGo, MeshRendererCls),
          m = r.method("get_material").invoke();
        let sh = null;
        for (const name of [
          "Unlit/Texture",
          "Universal Render Pipeline/Unlit",
          "Unlit/Transparent",
          "Sprites/Default",
          "UI/Default",
        ]) {
          try {
            sh = ShaderCls.method("Find").invoke(Il2Cpp.string(name));
            if (sh && !sh.isNull()) break;
          } catch (_) {}
        }
        if (sh && !sh.isNull()) m.method("set_shader").invoke(sh);
        m.method("set_mainTexture").invoke(_n5ImTex);
        try {
          m.method("set_mainTextureScale").invoke([1, -1]);
        } catch (_) {}
        try {
          m.method("set_mainTextureOffset").invoke([0, 1]);
        } catch (_) {}
        const t = getTransform(_n5ImGo),
          parent = righthand ? rightHandTransform : leftHandTransform;
        t.method("SetParent", 2).invoke(parent, false);
        t.method("set_localPosition").invoke([0, 0.13, 0.055]);
        t.method("set_localRotation").invoke(
          QuaternionCls.method("Euler").invoke(65, 0, 0),
        );
        t.method("set_localScale").invoke([-N5_IM_PANEL_W, N5_IM_PANEL_H, 1]);
        _n5ImCursorGo = GameObjectCls.method("CreatePrimitive").invoke(3);
        _n5ImCursorGo
          .method("set_name")
          .invoke(Il2Cpp.string("N5_ImGui_Cursor"));
        try {
          const c = getComponent(_n5ImCursorGo, ColliderCls);
          if (c) destroyObject(c);
        } catch (_) {}
        try {
          const cr = getComponent(_n5ImCursorGo, MeshRendererCls),
            cm = cr.method("get_material").invoke();
          try {
            cm.method("set_shader").invoke(urpUnlitShader);
          } catch (_) {
            try {
              cm.method("set_shader").invoke(uiDefaultShader);
            } catch (_2) {}
          }
          cm.method("set_color").invoke([1, 1, 1, 1]);
        } catch (_) {}
        const ct = getTransform(_n5ImCursorGo);
        ct.method("SetParent", 2).invoke(t, false);
        ct.method("set_localPosition").invoke([0, 0, -0.012]);
        ct.method("set_localScale").invoke([0.03, 0.006, 0.01]);
        _n5ImCursorV = GameObjectCls.method("CreatePrimitive").invoke(3);
        _n5ImCursorV
          .method("set_name")
          .invoke(Il2Cpp.string("N5_ImGui_Cursor_V"));
        try {
          const c = getComponent(_n5ImCursorV, ColliderCls);
          if (c) destroyObject(c);
        } catch (_) {}
        try {
          const cr = getComponent(_n5ImCursorV, MeshRendererCls),
            cm = cr.method("get_material").invoke();
          try {
            cm.method("set_shader").invoke(urpUnlitShader);
          } catch (_) {
            try {
              cm.method("set_shader").invoke(uiDefaultShader);
            } catch (_2) {}
          }
          cm.method("set_color").invoke([1, 1, 1, 1]);
        } catch (_) {}
        const cvt = getTransform(_n5ImCursorV);
        cvt.method("SetParent", 2).invoke(t, false);
        cvt.method("set_localPosition").invoke([0, 0, -0.012]);
        cvt.method("set_localScale").invoke([0.004, 0.045, 0.01]);
        _n5ImInitUpload(_n5ImTex);
        if (!_n5ImUpload) throw new Error("No working Texture2D upload method");
        _n5ImRender();
        _n5ImUpload();
        return true;
      } catch (e) {
        console.error("[N5 ImGui init]", e);
        n5ImGuiMode = false;
        try {
          const b = (menuCategories[2] || []).find(
            (x) => x.buttonText === "ImGui Mode",
          );
          if (b) b.enabled = false;
        } catch (_) {}
        n5ImGuiDestroy();
        return false;
      }
    }
    function n5ImGuiDestroy() {
      if (_n5ImGo)
        try {
          destroyObject(_n5ImGo);
        } catch (_) {}
      if (_n5ImCursorGo)
        try {
          destroyObject(_n5ImCursorGo);
        } catch (_) {}
      if (_n5ImCursorV)
        try {
          destroyObject(_n5ImCursorV);
        } catch (_) {}
      if (_n5ImTex)
        try {
          destroyObject(_n5ImTex);
        } catch (_) {}
      _n5ImGo = null;
      _n5ImCursorGo = null;
      _n5ImCursorV = null;
      _n5ImTex = null;
      _n5ImUpload = null;
      _n5ImOpen = false;
      _n5ImAnim = 0;
      _n5ImDirty = true;
      _n5ImNextClick = 0;
      _n5ImNextPointer = 0;
      _n5ImHitOver = false;
      _n5ImLastSig = "";
    }
    function _n5ImProject(t, pointer) {
      try {
        const origin = pointer.method("get_position").invoke(),
          forward = pointer.method("get_forward").invoke();
        const end = Vector3Cls.method("op_Addition", 2).invoke(origin, forward);
        const lo = t.method("InverseTransformPoint", 1).invoke(origin),
          le = t.method("InverseTransformPoint", 1).invoke(end);
        const ox = lo.field("x").value,
          oy = lo.field("y").value,
          oz = lo.field("z").value;
        const dx = le.field("x").value - ox,
          dy = le.field("y").value - oy,
          dz = le.field("z").value - oz;
        if (Math.abs(dz) < 0.0001)
          return {
            x: _n5ImCursorX,
            y: _n5ImCursorY,
            over: false,
            origin: origin,
            world: null,
          };
        const rayT = -oz / dz;
        if (rayT < 0 || rayT > 5)
          return {
            x: _n5ImCursorX,
            y: _n5ImCursorY,
            over: false,
            origin: origin,
            world: null,
          };
        const x = ox + dx * rayT,
          y = oy + dy * rayT,
          u = 0.5 + x,
          v = 0.5 - y;
        let world = null;
        try {
          world = t.method("TransformPoint", 1).invoke([x, y, -0.035]);
        } catch (_) {}
        return {
          x: Math.max(0, Math.min(N5_IM_W - 1, u * N5_IM_W)),
          y: Math.max(0, Math.min(N5_IM_H - 1, v * N5_IM_H)),
          over: u >= -0.08 && u <= 1.08 && v >= -0.08 && v <= 1.08,
          origin: origin,
          world: world,
        };
      } catch (_) {
        return { x: 0, y: 0, over: false, origin: null, world: null };
      }
    }
    function _n5ImHandleClick() {
      const cat = menuCategories[currentCategory] || [],
        rows = cat.slice(currentPage * 8, currentPage * 8 + 8),
        rx = 10,
        rw = N5_IM_W - 20,
        ry = 54,
        rh = 16;
      for (let i = 0; i < rows.length; i++) {
        if (
          _n5ImCursorX >= rx &&
          _n5ImCursorX < rx + rw &&
          _n5ImCursorY >= ry + i * rh &&
          _n5ImCursorY < ry + (i + 1) * rh - 2
        ) {
          _n5QueueMenuButton(rows[i].buttonText);
          return;
        }
      }
      if (_n5ImCursorY >= 184 && _n5ImCursorY < 200) {
        if (_n5ImCursorX >= 6 && _n5ImCursorX < 50) {
          currentCategory = 0;
          currentPage = 0;
          _n5ImDirty = true;
        } else if (_n5ImCursorX >= 53 && _n5ImCursorX < 110) {
          n5StartMenuSearch();
          _n5ImDirty = true;
        } else if (_n5ImCursorX >= 113 && _n5ImCursorX < 165) {
          const p = Math.max(1, Math.ceil(cat.length / 8));
          currentPage = (currentPage - 1 + p) % p;
          _n5ImDirty = true;
        } else if (_n5ImCursorX >= 168 && _n5ImCursorX < 220) {
          const p = Math.max(1, Math.ceil(cat.length / 8));
          currentPage = (currentPage + 1) % p;
          _n5ImDirty = true;
        } else if (_n5ImCursorX >= 223 && _n5ImCursorX < 294) {
          const b = (menuCategories[2] || []).find(
            (x) => x.buttonText === "ImGui Mode",
          );
          if (b && b.enabled) _n5QueueMenuButton(b.buttonText);
        }
      }
    }
    function n5ImGuiTick(show) {
      if (!n5ImGuiMode) {
        if (_n5ImGo) n5ImGuiDestroy();
        return;
      }
      if (!_n5ImInit()) return;
      if (show && !_n5ImTogglePrev) {
        _n5ImOpen = !_n5ImOpen;
        _n5ImDirty = true;
      }
      _n5ImTogglePrev = show;
      const visible = _n5ImOpen;
      _n5ImGo.method("SetActive").invoke(visible);
      if (_n5ImCursorGo)
        _n5ImCursorGo.method("SetActive").invoke(visible && _n5ImOpen);
      if (_n5ImCursorV)
        _n5ImCursorV.method("SetActive").invoke(visible && _n5ImOpen);
      if (!visible) {
        _n5ImClickPrev = false;
        return;
      }
      const t = getTransform(_n5ImGo);
      if (!_n5ImOpen) return;
      if (time >= _n5ImNextPointer) {
        _n5ImNextPointer = time + 0.05;
        const pointer = righthand ? leftHandTransform : rightHandTransform,
          hit = _n5ImProject(t, pointer);
        _n5ImHitOver = hit.over;
        _n5ImCursorX = hit.x;
        _n5ImCursorY = hit.y;
        if (_n5ImCursorGo) {
          const cx = _n5ImCursorX / N5_IM_W - 0.5,
            cy = 0.5 - _n5ImCursorY / N5_IM_H;
          getTransform(_n5ImCursorGo)
            .method("set_localPosition")
            .invoke([cx, cy, -0.012]);
          if (_n5ImCursorV)
            getTransform(_n5ImCursorV)
              .method("set_localPosition")
              .invoke([cx, cy, -0.012]);
        }
      }
      const click = _n5ImHitOver && (righthand ? leftTrigger : rightTrigger);
      if (click && !_n5ImClickPrev && time >= _n5ImNextClick) {
        _n5ImNextClick = time + 0.28;
        _n5ImHandleClick();
        _n5ImDirty = true;
      }
      _n5ImClickPrev = click;
      const rows = (menuCategories[currentCategory] || []).slice(
        currentPage * 8,
        currentPage * 8 + 8,
      );
      const sig =
        currentCategory +
        "|" +
        currentPage +
        "|" +
        rows.map((b) => b.buttonText + ":" + (b.enabled ? 1 : 0)).join("|");
      if (sig !== _n5ImLastSig) {
        _n5ImLastSig = sig;
        _n5ImDirty = true;
      }
      if (_n5ImDirty) {
        _n5ImDirty = false;
        _n5ImRender();
        try {
          if (_n5ImUpload) _n5ImUpload();
        } catch (e) {
          console.error("[N5 ImGui upload]", e);
          n5ImGuiMode = false;
          try {
            const b = (menuCategories[2] || []).find(
              (x) => x.buttonText === "ImGui Mode",
            );
            if (b) b.enabled = false;
          } catch (_) {}
          n5ImGuiDestroy();
        }
      }
    }
    let _n5GetNameMethod = null;
    try {
      _n5GetNameMethod = ComputerTerminalKeyCls.method("get_name");
    } catch (_) {}

    let _n5PendingAction = null;

    const _vx3eb = ComputerTerminalKeyCls.method("OnTriggerEnter");
    _vx3eb.implementation = function (_vx2cd) {
      if (referenceCollider) {
        try {
          if (_vx2cd.handle.equals(referenceCollider.handle)) {
            try {
              const _vx20a = n5ManagedString(this.method("get_name").invoke());
              if (
                _vx20a.length > 1 &&
                (_vx20a.charAt(0) === "@" || _vx20a.charAt(1) === "@")
              ) {
                const _vx540 =
                  _vx20a.charAt(0) === "@"
                    ? _vx20a.slice(1)
                    : _vx20a.slice(2, -1);
                if (_vx540.startsWith("N5KEY_"))
                  n5HandleVRSearchKey(_vx540.slice(6));
                else _n5QueueMenuButton(_vx540);
              }
            } catch (_e) {
              console.error("[N5 OnTriggerEnter]", _e);
            }
            return;
          }
        } catch (_) {}
      }
      try {
        return this.method("OnTriggerEnter").invoke(_vx2cd);
      } catch (_e) {
        return;
      }
    };
    function _vx410() {
      try {
        _vx53f = InputDevicesCls.method("GetDeviceAtXRNode", 1).invoke(4);
        _vx2eb = InputDevicesCls.method("GetDeviceAtXRNode", 1).invoke(5);
        if (!_n5InputBuf) _n5InputBuf = Il2Cpp.alloc(1);
        const _tempValue = _n5InputBuf;
        if (_vx53f && !_vx53f.isNull()) {
          _vx53f
            .method("TryGetFeatureValue", 2)
            .invoke(XRCommonUsagesCls.field("primaryButton").value, _tempValue);
          leftPrimary = _tempValue.readU8() !== 0;
          _vx53f
            .method("TryGetFeatureValue", 2)
            .invoke(
              XRCommonUsagesCls.field("secondaryButton").value,
              _tempValue,
            );
          leftSecondary = _tempValue.readU8() !== 0;
          _vx53f
            .method("TryGetFeatureValue", 2)
            .invoke(XRCommonUsagesCls.field("gripButton").value, _tempValue);
          leftGrab = _tempValue.readU8() !== 0;
          _vx53f
            .method("TryGetFeatureValue", 2)
            .invoke(XRCommonUsagesCls.field("triggerButton").value, _tempValue);
          leftTrigger = _tempValue.readU8() !== 0;
          _vx53f
            .method("TryGetFeatureValue", 2)
            .invoke(
              XRCommonUsagesCls.field("primary2DAxisClick").value,
              _tempValue,
            );
          leftStick = _tempValue.readU8() !== 0;
        }
        if (_vx2eb && !_vx2eb.isNull()) {
          _vx2eb
            .method("TryGetFeatureValue", 2)
            .invoke(XRCommonUsagesCls.field("primaryButton").value, _tempValue);
          rightPrimary = _tempValue.readU8() !== 0;
          _vx2eb
            .method("TryGetFeatureValue", 2)
            .invoke(
              XRCommonUsagesCls.field("secondaryButton").value,
              _tempValue,
            );
          rightSecondary = _tempValue.readU8() !== 0;
          _vx2eb
            .method("TryGetFeatureValue", 2)
            .invoke(XRCommonUsagesCls.field("triggerButton").value, _tempValue);
          rightTrigger = _tempValue.readU8() !== 0;
          _vx2eb
            .method("TryGetFeatureValue", 2)
            .invoke(XRCommonUsagesCls.field("gripButton").value, _tempValue);
          rightGrab = _tempValue.readU8() !== 0;
          _vx2eb
            .method("TryGetFeatureValue", 2)
            .invoke(
              XRCommonUsagesCls.field("primary2DAxisClick").value,
              _tempValue,
            );
          rightStick = _tempValue.readU8() !== 0;
        }
      } catch (_vx410_err) {
        console.error("[N5 input poll] uncaught:", _vx410_err);
      }
    }
    const _vx160 = gorillaLocomotionInstance.method("OnLateUpdate");
    _vx160.implementation = function () {
      if (!_n5AuthChecked) return _vx160.invoke();
      try {
        if (_n5PendingAction !== null) {
          const _pendingText = _n5PendingAction;
          _n5PendingAction = null;
          let _btn;
          try {
            _btn = _vx5b5(_pendingText);
          } catch (_) {
            _btn = null;
          }
          if (_btn) {
            if (_btn.isTogglable) {
              _btn.enabled = !_btn.enabled;
              _n5MenuLastCat = -1;
              _n5MenuLastPage = -1;
              _n5FlatDirty = true;
              if (_btn.enabled) {
                if (_btn.toolTip)
                  setNotification(
                    _vx476.BvlLf("[ENABLE] ", _btn.toolTip),
                    false,
                  );
                const _enM = _btn.enableMethod;
                if (_enM != null && _enM !== undefined)
                  try {
                    _enM.call(_btn);
                  } catch (_e) {
                    console.error("[N5 enable]", _e);
                  }
              } else {
                if (_btn.toolTip)
                  setNotification("[DISABLE] " + _btn.toolTip, false);
                const _disM = _btn.disableMethod;
                if (_disM != null && _disM !== undefined)
                  try {
                    _disM.call(_btn);
                  } catch (_e) {
                    console.error("[N5 disable]", _e);
                  }
              }
            } else {
              _n5MenuLastCat = -1;
              _n5MenuLastPage = -1;
              _n5FlatDirty = true;
              if (_btn.toolTip) setNotification(_btn.toolTip, false);
              const _actM = _btn.method;
              if (_actM != null && _actM !== undefined)
                try {
                  _actM.call(_btn);
                } catch (_e) {
                  console.error("[N5 action]", _e);
                }
            }
          }
        }

        ((deltaTime = TimeCls.method("get_deltaTime").invoke()),
          (time = TimeCls.method("get_time").invoke()),
          _vx410(),
          frameCount++);
        _n5WlPruneTimer += deltaTime;
        if (_n5WlPruneTimer > 5.0) {
          _n5WlPruneTimer = 0;
          for (let _wi = whitelist.length - 1; _wi >= 0; _wi--) {
            try {
              if (!whitelist[_wi] || whitelist[_wi].handle.isNull())
                whitelist.splice(_wi, 1);
            } catch (_) {
              whitelist.splice(_wi, 1);
            }
          }
        }
        n5UpdateTheme(deltaTime);
        n5SearchTick();
        n5PollUWR();
        n5ProcessBlueprintQueue();
        n5RunRigSpasm();
        n5RunBuffSpam();
        n5RunInfFart();
        n5RunInfiniteJetpack();
        n5RunNoRecoil(false);
        n5RunSellingSpasm();
        n5RunSellAmountSpam(false);
        n5RunToiletSpam();
        n5UpdateNetMirrorClone();
        n5UpdateServerNetPlayerClone();

        if (rpcAlertMsg && time < rpcAlertExpiry) {
          try {
            if (!_n5RpcOverlayObj || rpcAlertMsg !== _n5RpcOverlayLastMsg) {
              if (_n5RpcOverlayObj) {
                try {
                  UnityObjectCls.method("Destroy", 1).invoke(_n5RpcOverlayObj);
                } catch (_) {}
                _n5RpcOverlayObj = null;
              }
              let _rpcParent = null;
              try {
                const _hc =
                  gorillaLocomotionInstance.field("headCollider").value;
                if (_hc && !_hc.isNull()) _rpcParent = getTransform(_hc);
              } catch (_) {}
              if (_rpcParent && !_rpcParent.isNull()) {
                _n5RpcOverlayObj = createPrimitiveGameObject(
                  vec3Zero,
                  identityRotation,
                  [0.0, -0.15, 0.55, 1.0],
                  -1,
                  [0.02, 0.08, 0.04, 0.95],
                  _rpcParent,
                );
                if (_n5RpcOverlayObj && !_n5RpcOverlayObj.isNull()) {
                  createUITextObject(
                    _n5RpcOverlayObj,
                    rpcAlertMsg,
                    [1.0, 0.3, 1.0, 1.0],
                    vec3Zero,
                    vec3One,
                  );
                  getTransform(_n5RpcOverlayObj)
                    .method("set_localScale")
                    .invoke([0.0014, 0.0014, 0.0014]);
                  _n5RpcOverlayLastMsg = rpcAlertMsg;
                }
              }
            }
          } catch (_rpcErr) {
            _n5RpcOverlayObj = null;
          }
        } else {
          if (_n5RpcOverlayObj) {
            try {
              UnityObjectCls.method("Destroy", 1).invoke(_n5RpcOverlayObj);
            } catch (_) {}
            _n5RpcOverlayObj = null;
          }
          if (time >= rpcAlertExpiry) {
            rpcAlertMsg = "";
            _n5RpcOverlayLastMsg = "";
          }
        }

        if (joystickFlyEnabled) {
          try {
            const _rb = gorillaLocomotionInstance
              .method("GetComponent", 1)
              .inflate(RigidbodyCls)
              .invoke();
            if (_rb) {
              const _fwd = rightHandTransform.method("get_forward").invoke();
              const _up = [0, 1, 0];
              if (leftStick)
                _rb
                  .method("AddForce", 2)
                  .invoke(
                    Vector3Cls.method("op_Addition").invoke(
                      [0, 0, 0],
                      [0, flySpeed * deltaTime * 60, 0],
                    ),
                    0,
                  );
              if (rightStick)
                _rb
                  .method("AddForce", 2)
                  .invoke(
                    Vector3Cls.method("op_Addition").invoke(
                      [0, 0, 0],
                      [0, -flySpeed * deltaTime * 60, 0],
                    ),
                    0,
                  );
            }
          } catch (_je) {}
        }
        if (orbitAllEnabled) {
          orbitPhase = (orbitPhase || 0) + deltaTime * orbitSpeed;
          try {
            const _lp = NetPlayerCls.method("get_localPlayer").invoke();
            if (_lp && !_lp.handle.isNull()) {
              const _myPos = _lp
                .method("get_transform")
                .invoke()
                .method("get_position")
                .invoke();
              const _en = NetPlayerCls.field("playerIDToNetPlayer")
                .value.method("get_Values")
                .invoke()
                .method("GetEnumerator")
                .invoke();
              let _oi = 0;
              while (_en.method("MoveNext").invoke()) {
                const _opl = _en.method("get_Current").invoke();
                if (
                  !_opl ||
                  _opl.handle.isNull() ||
                  _opl.method("get_IsMine").invoke()
                ) {
                  _oi++;
                  continue;
                }
                const _angle = orbitPhase + _oi * ((Math.PI * 2) / 8);
                const _op = Vector3Cls.method("op_Addition").invoke(_myPos, [
                  Math.cos(_angle) * 2.5,
                  3.5,
                  Math.sin(_angle) * 2.5,
                ]);
                _opl.method("RPC_Teleport").invoke(_op);
                _oi++;
              }
            }
          } catch (_oe) {}
        }
        if (_n5GAKS) {
          const _qDown = _n5KeyDown(_VK_Q);
          if (_qDown && !_n5PCQWasDown && !n5SearchActive) {
            if (!_n5PCMode) {
              _n5PCMode = true;
              _n5PCMenuOpen = false;
              _n5PCFlyEnabled = true;
              _n5PCLastCursorX = -1;
              console.log("[N5 PC] PC mode ON  Q=menu  WASD+RMB=fly  Esc=exit");
            } else {
              _n5PCMenuOpen = !_n5PCMenuOpen;
              _n5PCMenuSelector = 0;
              _n5MenuLastCat = -1;
              _n5MenuLastPage = -1;
              _n5FlatDirty = true;
            }
          }
          _n5PCQWasDown = _qDown;

          const _escDown = _n5KeyDown(_VK_ESCAPE);
          if (_escDown && !_n5PCEscWasDown && _n5PCMode) {
            _n5PCMode = false;
            _n5PCMenuOpen = false;
            _n5PCRmbWasDown = false;
            console.log("[N5 PC] PC mode OFF");
          }
          _n5PCEscWasDown = _escDown;

          const _5Down = _n5KeyDown(_VK_5);
          if (_5Down && !_n5PC5WasDown) {
            try {
              const _screen = coreImage.class("UnityEngine.Screen");
              const _w = _screen.method("get_width").invoke();
              const _h = _screen.method("get_height").invoke();
              try {
                // Try SetResolution with FullScreenMode (Unity 2019+)
                _screen.method("SetResolution", 3).invoke(_w, _h, 1, 0);
              } catch (_) {
                try {
                  // Fallback: SetResolution(w, h, fullscreen=true)
                  _screen.method("SetResolution", 3).invoke(_w, _h, true);
                } catch (_2) {
                  // Last resort: just set fullscreen property
                  _screen.method("set_fullScreen").invoke(true);
                }
              }
              try {
                _screen.method("set_fullScreenMode").invoke(1);
              } catch (_) {}
              currentNotification = "Fullscreen forced!";
              notifactionResetTime = time + 3;
              console.log("[N5] Forced fullscreen");
            } catch (_fsErr) {
              console.error("[N5] Fullscreen error:", _fsErr);
            }
          }
          _n5PC5WasDown = _5Down;

          if (_n5PCMode) {
            const _rmbDown = _n5KeyDown(_VK_RBUTTON);
            const _lmbDown = _n5KeyDown(_VK_LBUTTON);
            const _mmbDown = _n5KeyDown(_VK_MBUTTON);
            if (!_n5PCMenuOpen) {
              rightGrab = _rmbDown;
              rightTrigger = _lmbDown;
              rightSecondary = _mmbDown;
            }
            if (_rmbDown) {
              if (_n5GCP) {
                try {
                  _n5GCP(_n5PCPoint);
                  const _cx = _n5PCPoint.readS32();
                  const _cy = _n5PCPoint.add(4).readS32();
                  if (_n5PCLastCursorX >= 0) {
                    const _dx = _cx - _n5PCLastCursorX;
                    const _dy = _cy - _n5PCLastCursorY;
                    _n5PCYaw = (_n5PCYaw + _dx * 0.15) % 360;
                    _n5PCPitch = Math.max(
                      -89,
                      Math.min(89, _n5PCPitch - _dy * 0.15),
                    );
                  }
                  _n5PCLastCursorX = _cx;
                  _n5PCLastCursorY = _cy;
                } catch (_cpErr) {}
              }
            } else {
              _n5PCLastCursorX = -1;
            }
            _n5PCRmbWasDown = _rmbDown;

            if (_n5PCFlyEnabled && _n5PCMode && _rmbDown) {
              try {
                const _yawR = (_n5PCYaw * Math.PI) / 180;
                const _pitR = (_n5PCPitch * Math.PI) / 180;
                const _fwd = [
                  Math.cos(_pitR) * Math.sin(_yawR),
                  -Math.sin(_pitR),
                  Math.cos(_pitR) * Math.cos(_yawR),
                ];
                const _right = [Math.cos(_yawR), 0, -Math.sin(_yawR)];
                let _vx = 0,
                  _vy = 0,
                  _vz = 0;
                if (_n5KeyDown(_VK_W)) {
                  _vx += _fwd[0];
                  _vy += _fwd[1];
                  _vz += _fwd[2];
                }
                if (_n5KeyDown(_VK_S)) {
                  _vx -= _fwd[0];
                  _vy -= _fwd[1];
                  _vz -= _fwd[2];
                }
                if (_n5KeyDown(_VK_A)) {
                  _vx -= _right[0];
                  _vz -= _right[2];
                }
                if (_n5KeyDown(_VK_D)) {
                  _vx += _right[0];
                  _vz += _right[2];
                }
                if (_n5KeyDown(_VK_SPACE)) _vy += 1;
                if (_n5KeyDown(_VK_SHIFT)) _vy -= 1;
                if (_vx !== 0 || _vy !== 0 || _vz !== 0) {
                  const _len =
                    Math.sqrt(_vx * _vx + _vy * _vy + _vz * _vz) || 1;
                  const _pcFlySpeed = flySpeed * 0.06;
                  const _force = [
                    (_vx / _len) * _pcFlySpeed,
                    (_vy / _len) * _pcFlySpeed,
                    (_vz / _len) * _pcFlySpeed,
                  ];
                  let _usedPCForce = false;
                  try {
                    const _pc = acImage
                      .class("AnimalCompany.PlayerController")
                      .method("get_instance")
                      .invoke();
                    if (_pc && !_pc.handle.isNull()) {
                      try {
                        _pc
                          .method("AddExternalForceVelocity", 2)
                          .invoke(_force, true);
                        _usedPCForce = true;
                      } catch (_) {}
                      if (!_usedPCForce) {
                        try {
                          _pc
                            .method("AddExternalForceVelocity", 1)
                            .invoke(_force);
                          _usedPCForce = true;
                        } catch (_) {}
                      }
                    }
                  } catch (_) {}
                  if (!_usedPCForce) {
                    const _rb = gorillaLocomotionInstance
                      .method("GetComponent", 1)
                      .inflate(RigidbodyCls)
                      .invoke();
                    if (_rb) _rb.method("AddForce", 2).invoke(_force, 0);
                  }
                }
                {
                  try {
                    const _ht = getTransform(headCollider);
                    if (_ht && !_ht.isNull())
                      _ht
                        .method("set_rotation")
                        .invoke(
                          QuaternionCls.method("Euler").invoke(
                            _n5PCPitch,
                            _n5PCYaw,
                            0,
                          ),
                        );
                  } catch (_re) {}
                }
              } catch (_fe) {
                console.error("[N5 PC fly]", _fe);
              }
            }

            if (_n5PCMenuOpen && !n5SearchActive) {
              const _cnt =
                (menuCategories[currentCategory] || []).slice(
                  currentPage * 8,
                  (currentPage + 1) * 8,
                ).length || 1;
              const _upDown = _n5KeyDown(_VK_UP);
              if (_upDown && !_n5PCUpWasDown) {
                _n5PCMenuSelector = (_n5PCMenuSelector - 1 + _cnt) % _cnt;
                _n5MenuLastCat = -1;
                _n5MenuLastPage = -1;
                _n5FlatDirty = true;
              }
              _n5PCUpWasDown = _upDown;

              const _downDown = _n5KeyDown(_VK_DOWN);
              if (_downDown && !_n5PCDownWasDown) {
                _n5PCMenuSelector = (_n5PCMenuSelector + 1) % _cnt;
                _n5MenuLastCat = -1;
                _n5MenuLastPage = -1;
                _n5FlatDirty = true;
              }
              _n5PCDownWasDown = _downDown;

              const _entDown = _n5KeyDown(_VK_RETURN) || _n5KeyDown(_VK_SPACE);
              if (_entDown && !_n5PCEnterWasDown) {
                const _btn = (menuCategories[currentCategory] || []).slice(
                  currentPage * 8,
                  (currentPage + 1) * 8,
                )[_n5PCMenuSelector];
                if (_btn) _n5QueueMenuButton(_btn.buttonText);
              }
              _n5PCEnterWasDown = _entDown;

              const _lmbMenuDown = _n5KeyDown(_VK_LBUTTON);
              if (_lmbMenuDown && !_n5PCLmbMenuWasDown) {
                const _hitBtn = n5RaycastMenuButton();
                if (_hitBtn) _n5QueueMenuButton(_hitBtn);
              }
              _n5PCLmbMenuWasDown = _lmbMenuDown;

              const _leftDown = _n5KeyDown(_VK_LEFT);
              if (_leftDown && !_n5PCLeftWasDown) {
                const _maxPagePrev = Math.max(
                  Math.ceil(
                    (menuCategories[currentCategory] || []).length / 8,
                  ) - 1,
                  0,
                );
                currentPage--;
                if (currentPage < 0) currentPage = _maxPagePrev;
                _n5PCMenuSelector = 0;
                _n5MenuLastCat = -1;
                _n5MenuLastPage = -1;
                _n5FlatDirty = true;
              }
              _n5PCLeftWasDown = _leftDown;

              const _rightDown = _n5KeyDown(_VK_RIGHT);
              if (_rightDown && !_n5PCRightWasDown) {
                const _maxPageNext = Math.max(
                  Math.ceil(
                    (menuCategories[currentCategory] || []).length / 8,
                  ) - 1,
                  0,
                );
                currentPage = (currentPage + 1) % (_maxPageNext + 1);
                _n5PCMenuSelector = 0;
                _n5MenuLastCat = -1;
                _n5MenuLastPage = -1;
                _n5FlatDirty = true;
              }
              _n5PCRightWasDown = _rightDown;
            }
          }
        }
        const _n5MenuToggleHeld = _n5PCMode
          ? _n5PCMenuOpen
          : (righthand && rightSecondary) || (!righthand && leftSecondary);
        try {
          n5ImGuiTick(_n5MenuToggleHeld);
        } catch (_n5ImErr) {
          console.error("[N5 ImGui tick]", _n5ImErr);
        }
        const _n5ShouldShowMenu = !n5ImGuiMode && _n5MenuToggleHeld;

        if (_n5ShouldShowMenu || menu != null) {
          if (currentNotification != "" && time > notifactionResetTime) {
            currentNotification = "";
            _n5RequestMenuRebuild();
          }
          try {
            if (!arialFont || arialFont.isNull())
              arialFont = ResourcesCls.method("GetBuiltinResource", 1)
                .inflate(FontCls)
                .invoke(Il2Cpp.string("Arial.ttf"));
          } catch (_) {}
          if (menu == null) {
            try {
              _vx476.MtVJr(_vx1ab);
            } catch (_mbErr) {
              console.error("[N5 menu build]", _mbErr);
            }
            _n5MenuBaseScale = null;
            if (_n5ShouldShowMenu) {
              _n5MenuAnim = Math.max(_n5MenuAnim, 0.001);
              _n5MenuAnimTarget = 1;
              _n5MenuAnimKick = 1;
            }
            _n5MenuLastCat = currentCategory;
            _n5MenuLastPage = currentPage;
            if (_n5PCMode) {
              try {
                _n5PCPositionMenuAtHead();
              } catch (_) {
                if (menu)
                  try {
                    _vx476.uMIkA(_vx40c);
                  } catch (_2) {}
              }
            } else if (menu) _vx476.uMIkA(_vx40c);
          } else {
            if (
              currentCategory !== _n5MenuLastCat ||
              currentPage !== _n5MenuLastPage
            ) {
              if (!_n5MenuRebuildLock) {
                _n5MenuRebuildLock = true;
                try {
                  _n5RequestMenuRebuild();
                } catch (_) {}
                try {
                  _vx476.MtVJr(_vx1ab);
                } catch (_mbErr2) {
                  console.error("[N5 menu rebuild]", _mbErr2);
                }
                _n5MenuBaseScale = null;
                _n5MenuAnim = Math.max(_n5MenuAnim, 0.35);
                _n5MenuAnimKick = 1;
                _n5MenuLastCat = currentCategory;
                _n5MenuLastPage = currentPage;
                _n5MenuRebuildLock = false;
              }
            }
            if (_n5PCMode) {
              try {
                _n5PCPositionMenuAtHead();
              } catch (_) {
                if (menu)
                  try {
                    _vx476.uMIkA(_vx40c);
                  } catch (_2) {}
              }
            } else if (menu) {
              try {
                _vx476.uMIkA(_vx40c);
              } catch (_pErr) {}
            }
          }
          if (!n5ApplyMenuAnimation(_n5ShouldShowMenu)) {
            if (menu != null)
              try {
                destroyObject(menu);
              } catch (_) {}
            menu = null;
            _n5MenuBaseScale = null;
          }
        } else
          menu != null &&
            (destroyObject(menu),
            (menu = null),
            (_n5MenuBaseScale = null),
            (_n5MenuAnim = 0));
        if (menu == null) {
          if (reference != null) {
            try {
              destroyObject(reference);
            } catch (_) {}
            reference = null;
            referenceCollider = null;
          }
        } else {
          if (reference == null) _vx17d();
          if (_n5PCMode && _n5PCMenuOpen) _n5PCUpdateReferencePointer();
        }
        if (!_n5FlatCache || _n5FlatDirty) {
          _n5FlatCache = menuCategories.flat();
          _n5FlatDirty = false;
        }
        const _n5Enabled = _n5FlatCache;
        if (n5AnyGunModEnabled() && n5IsAiming()) {
          try {
            getGunPointerResult();
          } catch (_n5GunRenderErr) {
            console.error("[N5 gun pointer]", _n5GunRenderErr);
          }
        } else {
          n5HideGunPointer();
        }
        for (let _fi = 0; _fi < _n5Enabled.length; _fi++) {
          const _vx45d = _n5Enabled[_fi];
          if (!_vx45d.enabled || !_vx45d.method) continue;
          try {
            _vx45d.method();
          } catch (_vxf48) {
            console.error(
              "[OnLateUpdate] Error in '" + _vx45d.buttonText + "\x27:",
              _vxf48,
            );
          }
        }
      } catch (_vx160_err) {
        console.error("[N5 OnLateUpdate] uncaught:", _vx160_err);
      }
      return _vx160.invoke();
    };
    function menuSetupFn1() {
      const n5ArenaItemKillerDespawnHook = acImage
        .class("AnimalCompany.ArenaItemKiller")
        .method("DespawnIfNecessary");
      n5ArenaItemKillerDespawnHook.implementation = function () {
        return;
      };
    }
    const _vx2aa = acImage
      .class("AnimalCompany.FlareGun")
      .method("get_hasAmmo");
    _vx2aa.implementation = function () {
      if (InfAmmo) return true;
      return this.method("get_hasAmmo").invoke();
    };
    const _vx5b3 = acImage
      .class("AnimalCompany.Revolver")
      .method("get_ammoLoaded");
    _vx5b3.implementation = function () {
      if (InfAmmo) return 255;
      return this.method("get_ammoLoaded").invoke();
    };
    const _n5RevolverHammerHook = acImage
      .class("AnimalCompany.Revolver")
      .method("get_isHammerCocked");
    _n5RevolverHammerHook.implementation = function () {
      if (InfAmmo) return true;
      return this.method("get_isHammerCocked").invoke();
    };
    const _vx123 = acImage
      .class("AnimalCompany.ZiplineGun")
      .method("get_isLoaded");
    _vx123.implementation = function () {
      if (InfAmmo) return true;
      return this.method("get_isLoaded").invoke();
    };
    const _vx2f1 = acImage
      .class("AnimalCompany.Shotgun")
      .method("get__ammoLeft");
    _vx2f1.implementation = function () {
      if (InfAmmo || n5ShotgunNoCooldown) return 11964 + -11709;
      return this.method("get__ammoLeft").invoke();
    };
    try {
      const _n5ShotgunCls = acImage.class("AnimalCompany.Shotgun");
      const _n5ShotgunUse = _n5ShotgunCls.method("HandleUse");
      _n5ShotgunUse.implementation = function () {
        if (n5ShotgunNoCooldown) {
          try {
            this.field("_reloadTimer").value = 0;
          } catch (_) {}
          try {
            this.method("set__ammoLeft").invoke(99);
          } catch (_) {}
          try {
            this.field("__ammoLeft").value = 99;
          } catch (_) {}
          try {
            const _gun = this.field("_gun").value;
            const _cfg = _gun && _gun.method("get_config").invoke();
            if (_cfg && !_cfg.handle.isNull())
              _cfg.field("shootTime").value = 0.01;
          } catch (_) {}
        }
        return this.method("HandleUse").invoke();
      };
      const _n5ShotgunUpdate = _n5ShotgunCls.method("OnUpdate");
      _n5ShotgunUpdate.implementation = function () {
        if (n5ShotgunNoCooldown) {
          try {
            this.field("_reloadTimer").value = 0;
          } catch (_) {}
          try {
            this.method("set__ammoLeft").invoke(99);
          } catch (_) {}
          try {
            this.field("__ammoLeft").value = 99;
          } catch (_) {}
        }
        return this.method("OnUpdate").invoke();
      };
    } catch (_n5ShotgunHookErr) {
      console.error("[N5 Shotgun cooldown hook]", _n5ShotgunHookErr);
    }
    const _vx490 = acImage.class("AnimalCompany.RPG").method("get_loadedState");
    _vx490.implementation = function () {
      let loadedState = this.method("get_loadedState").invoke();
      if (InfAmmo) {
        loadedState.field("isLoaded").value = true;
        this.method("set_loadedState").invoke(loadedState);
      }
      return loadedState;
    };
    const _vx9f8 = acImage
      .class("AnimalCompany.AutoReloadGun")
      .method("get__ammoLeft");
    _vx9f8.implementation = function () {
      if (InfAmmo) return 255;
      return this.method("get__ammoLeft").invoke();
    };
    const _vx168 = acImage
      .class("AnimalCompany.JetpackHandy")
      .method("RPC_UseJetpack");
    _vx168.implementation = function () {
      InfAmmo
        ? (this.method("RPC_UseJetpack").invoke(),
          (this.field("_isUsed").value = false))
        : this.method("RPC_UseJetpack").invoke();
    };
    try {
      const _n5HoverpadCls = acImage.class("AnimalCompany.Hoverpad");
      const _n5HoverpadFill = function (_hp) {
        try {
          _hp.method("set_battery").invoke(1.0);
        } catch (_) {}
        try {
          _hp.field("_battery").value = 1.0;
        } catch (_) {}
        try {
          _hp.method("HandleBatteryChanged").invoke();
        } catch (_) {}
      };
      const _n5HoverpadGetBattery = _n5HoverpadCls.method("get_battery");
      _n5HoverpadGetBattery.implementation = function () {
        if (n5InfiniteHoverpadBattery) return 1.0;
        return this.method("get_battery").invoke();
      };
      const _n5HoverpadSetBattery = _n5HoverpadCls.method("set_battery");
      _n5HoverpadSetBattery.implementation = function (_value) {
        if (n5InfiniteHoverpadBattery) _value = 1.0;
        return this.method("set_battery").invoke(_value);
      };
      for (const _methodName of [
        "Spawned",
        "FixedUpdateNetwork",
        "HandleUse",
        "Update",
        "FixedUpdate",
        "UpdateForce",
        "CopyBackingFieldsToState",
        "CopyStateToBackingFields",
      ]) {
        try {
          const _method = _n5HoverpadCls.method(_methodName);
          _method.implementation = function () {
            if (n5InfiniteHoverpadBattery) _n5HoverpadFill(this);
            const _ret = this.method(_methodName).invoke(...arguments);
            if (n5InfiniteHoverpadBattery) _n5HoverpadFill(this);
            return _ret;
          };
        } catch (_) {}
      }
    } catch (_n5HoverpadHookErr) {
      console.error("[N5 Hoverpad battery hook]", _n5HoverpadHookErr);
    }
    try {
      const _n5FlareCls = acImage.class("AnimalCompany.FlareGun");
      const _n5FlareUse = _n5FlareCls.method("HandleUse");
      _n5FlareUse.implementation = function () {
        const _ret = this.method("HandleUse").invoke();
        try {
          if (n5ProjectileSwapEnabled) {
            const _pose = n5RightHandPose(0.35),
              _name =
                n5ProjectilePrefabs[
                  n5ProjectileIndex % n5ProjectilePrefabs.length
                ];
            const _obj = spawnNetworkPrefab(_name, _pose.pos, _pose.rot);
            if (_obj) n5LaunchItemObject(_obj, _pose.forward, 35);
          }
          if (n5FlarePrefabImpactEnabled) {
            const _g = getGunPointerResult(),
              _p = _g.point;
            if (_p)
              spawnNetworkPrefab(prefabList[prefabIndex], _p, identityRotation);
          }
        } catch (_e) {
          console.error("[N5 Flare hook extras]", _e);
        }
        return _ret;
      };
    } catch (_n5FlareHookErr) {
      console.error("[N5 Flare hook]", _n5FlareHookErr);
    }
    try {
      const _n5FlareProjCls = acImage.class("AnimalCompany.FlareGunProjectile");
      const _n5FlareProjUpdate = _n5FlareProjCls.method("FixedUpdateNetwork");
      _n5FlareProjUpdate.implementation = function () {
        const _ret = this.method("FixedUpdateNetwork").invoke();
        try {
          if (n5FlarePrefabImpactEnabled) {
            const _key = String(this.handle || this);
            const _pos = getTransform(this).method("get_position").invoke();
            let _seen = n5FlareProjectileSeen[_key];
            if (!_seen) {
              n5FlareProjectileSeen[_key] = {
                born: time,
                last: _pos,
                still: 0,
                done: false,
              };
            } else if (!_seen.done) {
              const _moved = Vector3Cls.method("Distance").invoke(
                _seen.last,
                _pos,
              );
              _seen.last = _pos;
              _seen.still = _moved < 0.035 ? _seen.still + 1 : 0;
              if (
                (time - _seen.born > 0.3 && _seen.still >= 3) ||
                time - _seen.born > 2.0
              ) {
                spawnNetworkPrefab(
                  prefabList[prefabIndex],
                  _pos,
                  identityRotation,
                );
                _seen.done = true;
                n5FlareImpactSeen.add(_key);
                if (n5FlareImpactSeen.size > 80) {
                  n5FlareImpactSeen = new Set();
                  n5FlareProjectileSeen = {};
                }
              }
            }
          }
        } catch (_) {}
        return _ret;
      };
    } catch (_n5FlareProjHookErr) {
      console.error("[N5 Flare projectile hook]", _n5FlareProjHookErr);
    }
    const _vxf47 = acImage
      .class("AnimalCompany.StashMachine.StashMachineTrashChuteView")
      .method("EjectItem");
    _vxf47.implementation = function (_vxe39) {
      if (stashDupeEnabled)
        for (let _vx428 = 0; _vx428 < ejectDupeAmount; _vx428++) {
          this.method("EjectItem").invoke(_vxe39);
        }
      else this.method("EjectItem").invoke(_vxe39);
    };
    function menuSetupFn2() {
      const n5RpcMethodNames = {
        EPqKB: "get_IsMine",
        jwqEb: "RPC_Teleport",
        JrZXs: "RPC_TagAsStinky",
        yHOvg: "RPC_SetColorHSV",
      };
      const n5ApplyBuffHook = acImage
        .class("AnimalCompany.NetPlayer")
        .method("RPC_ApplyBuff");
      n5ApplyBuffHook.implementation = function (_buffId) {
        if (this.method("get_IsMine").invoke() && n5RpcBlocks.ApplyBuff) {
          rpcAlertMsg = " BLOCKED: ApplyBuff";
          rpcAlertExpiry = time + 4;
          return;
        }
        return this.method("RPC_ApplyBuff").invoke(_buffId);
      };
      const _vx5e3 = acImage
        .class("AnimalCompany.NetPlayer")
        .method("RPC_AddForce");
      _vx5e3.implementation = function (_vx2a0) {
        if (this.method("get_IsMine").invoke() && n5RpcBlocks.AddForce) {
          rpcAlertMsg = " BLOCKED: AddForce";
          rpcAlertExpiry = time + 4;
          return;
        }
        return this.method("RPC_AddForce").invoke(_vx2a0);
      };
      const _vx170 = acImage
        .class("AnimalCompany.NetPlayer")
        .method("RPC_Teleport");
      _vx170.implementation = function (_vx437) {
        if (
          this.method(n5RpcMethodNames.EPqKB).invoke() &&
          n5RpcBlocks.Teleport
        ) {
          rpcAlertMsg = " BLOCKED: Teleport";
          rpcAlertExpiry = time + 4;
          return;
        }
        return this.method(n5RpcMethodNames.jwqEb).invoke(_vx437);
      };
      const _vx2d2 = acImage
        .class("AnimalCompany.NetPlayer")
        .method("RPC_TagAsStinky");
      _vx2d2.implementation = function () {
        if (
          this.method(n5RpcMethodNames.EPqKB).invoke() &&
          n5RpcBlocks.Stinky
        ) {
          rpcAlertMsg = " BLOCKED: Stinky";
          rpcAlertExpiry = time + 4;
          return;
        }
        return this.method(n5RpcMethodNames.JrZXs).invoke();
      };
      const _vx37f = acImage
        .class("AnimalCompany.NetPlayer")
        .method("RPC_PlayerStun");
      _vx37f.implementation = function (_vx59d, _vxa92, _vx20b, _vxb26) {
        if (this.method("get_IsMine").invoke() && n5RpcBlocks.Stun) {
          rpcAlertMsg = " BLOCKED: Stun";
          rpcAlertExpiry = time + 4;
          return;
        }
        return this.method("RPC_PlayerStun").invoke(
          _vx59d,
          _vxa92,
          _vx20b,
          _vxb26,
        );
      };
      const _vx324 = acImage
        .class("AnimalCompany.NetPlayer")
        .method("RPC_SetColorHSV");
      _vx324.implementation = function (_vx279, _vx3da, _vx230, _vx2f7) {
        if (
          this.method(n5RpcMethodNames.EPqKB).invoke() &&
          n5RpcBlocks.SetColor
        ) {
          rpcAlertMsg = " BLOCKED: SetColor";
          rpcAlertExpiry = time + 4;
          return;
        }
        return this.method(n5RpcMethodNames.yHOvg).invoke(
          _vx279,
          _vx3da,
          _vx230,
          _vx2f7,
        );
      };

      try {
        const _netSessionRPCs = acImage.class("AnimalCompany.NetSessionRPCs");
        const _kickMethod = _netSessionRPCs.method("RPC_KickPlayer");

        const _kickOrig = _kickMethod.implementation;
        _kickMethod.implementation = function () {
          if (n5RpcBlocks.KickPlayer && !_n5OutgoingKick) {
            rpcAlertMsg = " BLOCKED: RPC_KickPlayer";
            rpcAlertExpiry = time + 4;
            return;
          }

          if (_kickOrig) return _kickOrig.apply(this, arguments);
          return this.method("RPC_KickPlayer").invoke(...arguments);
        };
      } catch (_e2) {
        console.error(
          "[KickBlock] NetSessionRPCs::RPC_KickPlayer hook failed:",
          _e2,
        );
      }

      (() => {
        const _n5Hooked = new Set();
        function n5SetHook(_meth, _key, impl) {
          if (!_meth) return;
          const _methKey = String(_meth.handle || _key);
          if (_n5Hooked.has(_methKey)) return;
          try {
            _meth.implementation = impl;
            _n5Hooked.add(_methKey);
          } catch (_) {}
        }
        function n5InvokeOrig(_self, _orig, _methodName) {
          try {
            if (_orig && typeof _orig === "function")
              return _orig.apply(
                _self,
                Array.prototype.slice.call(arguments, 3),
              );
          } catch (_) {}
          try {
            return _self
              .method(_methodName)
              .invoke(...Array.prototype.slice.call(arguments, 3));
          } catch (_) {
            return undefined;
          }
        }
        const _bagClassNames = [
          "AnimalCompany.GrabbableObject",
          "AnimalCompany.GrabbableItem",
          "AnimalCompany.IGrabbableObjectContainer",
        ];
        const _canAddMethods = [
          "CanAddToBag",
          "CanAcceptItem",
          "CanAdd",
          "IsCompatible",
          "CanBeAddedToBag",
          "IsItemCompatible",
          "CanDrop",
          "CanDropItem",
          "CanDropObject",
          "CanAcceptDrop",
          "CanHandleDrop",
          "IsValidDrop",
          "IsValidDropTarget",
          "IsValidForContainer",
          "CanAddToContainer",
          "get_canAddToBag",
          "get_allowAddToBag",
          "get_allowAddToQuiver",
        ];
        for (const _cn of _bagClassNames) {
          try {
            const _cls = acImage.class(_cn);
            for (const _m of _canAddMethods) {
              try {
                const _meth = _cls.method(_m);
                const _mName = _m;
                const _key = _cn + ":" + _m;
                n5SetHook(_meth, _key, function () {
                  if (allowAllContainers) return true;
                  return n5InvokeOrig(this, null, _mName);
                });
              } catch (_) {}
            }
          } catch (_) {}
        }
        try {
          const DropHandlerClass = Il2Cpp.domain
            .assembly("AnimalCompany")
            .image.class("AnimalCompany.GrabbableObjectDropHandler");
          for (const _m of _canAddMethods) {
            try {
              const _meth = DropHandlerClass.method(_m);
              const _mName = _m;
              n5SetHook(_meth, "DropHandler:" + _m, function () {
                if (allowAllContainers) return true;
                return n5InvokeOrig(this, null, _mName);
              });
            } catch (_) {}
          }
          for (const _meth of DropHandlerClass.methods) {
            try {
              const _mName = _meth.name;
              if (!/can|valid|accept|allow|compatible/i.test(_mName)) continue;
              const _ret = String(
                (_meth.returnType && _meth.returnType.name) || "",
              );
              if (_ret && !/Boolean|bool/i.test(_ret)) continue;
              n5SetHook(_meth, "DropHandler.methods:" + _mName, function () {
                if (allowAllContainers) return true;
                return n5InvokeOrig(this, null, _mName);
              });
            } catch (_) {}
          }
        } catch (_dropHandlerErr) {
          console.error(
            "[AllowAllMove] DropHandler hook failed:",
            _dropHandlerErr,
          );
        }
        try {
          const _gameplayItemStateCls = acImage.class(
            "AnimalCompany.GameplayItemState",
          );
          const _isBagLikeState = function (_self) {
            try {
              const _idObj = _self.method("get_id").invoke();
              const _id = n5ManagedString(_idObj).toLowerCase();
              return (
                _id.indexOf("stash") !== -1 ||
                _id.indexOf("quiver") !== -1 ||
                _id.indexOf("backpack") !== -1 ||
                _id.indexOf("crossbow") !== -1 ||
                _id.indexOf("heart_gun") !== -1 ||
                _id.indexOf("grenade_launcher") !== -1 ||
                _id.indexOf("salmoncannon") !== -1 ||
                _id.indexOf("salmon_cannon") !== -1
              );
            } catch (_) {
              return false;
            }
          };
          try {
            const _meth = _gameplayItemStateCls.method("get_isBag");
            const _origIsBag = _meth.implementation;
            n5SetHook(_meth, "GameplayItemState:get_isBag", function () {
              if (_isBagLikeState(this) || allowAllContainers) return true;
              return n5InvokeOrig(this, _origIsBag, "get_isBag");
            });
          } catch (_) {}
          try {
            const _meth = _gameplayItemStateCls.method("get_baseCapacity");
            const _origBaseCap = _meth.implementation;
            n5SetHook(_meth, "GameplayItemState:get_baseCapacity", function () {
              const _ret = n5InvokeOrig(this, _origBaseCap, "get_baseCapacity");
              if ((_isBagLikeState(this) || allowAllContainers) && _ret) {
                try {
                  _ret.field("_value").value = 9999;
                } catch (_) {}
                try {
                  _ret.field("value").value = 9999;
                } catch (_) {}
              }
              return _ret;
            });
          } catch (_) {}
          for (const _m of [
            "get_allowAddToBag",
            "get_allowAddToQuiver",
            "get_allowAttachToItem",
            "get_allowAttachToBack",
            "get_allowAttachToHip",
            "get_isBackpack",
          ]) {
            try {
              const _meth = _gameplayItemStateCls.method(_m);
              const _mName = _m;
              const _orig = _meth.implementation;
              n5SetHook(_meth, "GameplayItemState:" + _m, function () {
                if (
                  allowAllContainers ||
                  _mName.indexOf("allow") >= 0 ||
                  _mName === "get_isBackpack"
                )
                  return true;
                return n5InvokeOrig(this, _orig, _mName);
              });
            } catch (_) {}
          }
          for (const _m of [
            "get_totalCurrCapacity",
            "get_containerCapacity",
            "get_maxContainerCapacity",
          ]) {
            try {
              const _meth = _gameplayItemStateCls.method(_m);
              const _mName = _m;
              const _orig = _meth.implementation;
              n5SetHook(_meth, "GameplayItemState:" + _m, function () {
                if (allowAllContainers || _isBagLikeState(this)) return 9999;
                return n5InvokeOrig(this, _orig, _mName);
              });
            } catch (_) {}
          }
        } catch (_gameplayItemStateErr) {
          console.error(
            "[AllowAllMove] GameplayItemState hook failed:",
            _gameplayItemStateErr,
          );
        }
        try {
          const _quiverCls = acImage.class("AnimalCompany.Quiver");
          const _checkToAdd = _quiverCls.method("CheckToAddItem", 1);
          n5SetHook(_checkToAdd, "Quiver:CheckToAddItem", function (_item) {
            if (allowAllContainers) return true;
            return n5InvokeOrig(this, null, "CheckToAddItem", _item);
          });
          try {
            n5SetHook(
              _quiverCls.method("CanAddItem", 1),
              "Quiver:CanAddItem",
              function (_item) {
                return true;
              },
            );
          } catch (_) {}
          try {
            n5SetHook(
              _quiverCls.method("get_capacity"),
              "Quiver:get_capacity",
              function () {
                return 9999;
              },
            );
          } catch (_) {}
          try {
            n5SetHook(
              _quiverCls.method("get_baseCapacity"),
              "Quiver:get_baseCapacity",
              function () {
                return 9999;
              },
            );
          } catch (_) {}
          try {
            n5SetHook(
              _quiverCls.method("get_isFull"),
              "Quiver:get_isFull",
              function () {
                return false;
              },
            );
          } catch (_) {}
          try {
            n5SetHook(
              _quiverCls.method("set_capacity", 1),
              "Quiver:set_capacity",
              function (_value) {
                try {
                  this.field("_capacity").value = 9999;
                } catch (_) {}
                return;
              },
            );
          } catch (_) {}
          try {
            n5SetHook(
              _quiverCls.method("HandleTryToDrop", 1),
              "Quiver:HandleTryToDrop",
              function (_item) {
                return true;
              },
            );
          } catch (_) {}
          for (const _m of ["AddToBagAck", "CheckToAddItem"]) {
            try {
              n5SetHook(
                _quiverCls.method(_m, 1),
                "Quiver:" + _m,
                function (_obj) {
                  try {
                    this.field("_capacity").value = 9999;
                  } catch (_) {}
                  return true;
                },
              );
            } catch (_) {}
          }
        } catch (_quiverHookErr) {
          console.error("[AllowAllMove] Quiver hook failed:", _quiverHookErr);
        }
        try {
          const _backpackCls = acImage.class("AnimalCompany.BackpackItem");
          try {
            n5SetHook(
              _backpackCls.method("CheckToAddItem", 1),
              "Backpack:CheckToAddItem",
              function (_item) {
                return true;
              },
            );
          } catch (_) {}
          try {
            n5SetHook(
              _backpackCls.method("get_capacity"),
              "Backpack:get_capacity",
              function () {
                return 9999;
              },
            );
          } catch (_) {}
          try {
            n5SetHook(
              _backpackCls.method("get_baseCapacity"),
              "Backpack:get_baseCapacity",
              function () {
                return 9999;
              },
            );
          } catch (_) {}
          try {
            n5SetHook(
              _backpackCls.method("get_isFull"),
              "Backpack:get_isFull",
              function () {
                return false;
              },
            );
          } catch (_) {}
          try {
            n5SetHook(
              _backpackCls.method("set_capacity", 1),
              "Backpack:set_capacity",
              function (_value) {
                try {
                  this.field("_capacity").value = 9999;
                } catch (_) {}
                return;
              },
            );
          } catch (_) {}
          for (const _m of ["AddToBagAck", "HandleAddItemTrigger"]) {
            try {
              n5SetHook(
                _backpackCls.method(_m, 1),
                "Backpack:" + _m,
                function (_obj) {
                  try {
                    this.field("_capacity").value = 9999;
                  } catch (_) {}
                  try {
                    this.method("set_isOpen").invoke(true);
                  } catch (_) {}
                  return true;
                },
              );
            } catch (_) {}
          }
        } catch (_backpackHookErr) {
          console.error(
            "[AllowAllMove] Backpack capacity hook failed:",
            _backpackHookErr,
          );
        }
        try {
          const _grabItemCls = acImage.class("AnimalCompany.GrabbableItem");
          const _addMethod = _grabItemCls.method("AddToBagInternal");
          const _origAdd = _addMethod.implementation;
          n5SetHook(
            _addMethod,
            "GrabbableItem:AddToBagInternal",
            function (_container) {
              if (allowAllContainers) {
                try {
                  return n5InvokeOrig(
                    this,
                    _origAdd,
                    "AddToBagInternal",
                    _container,
                  );
                } catch (_) {
                  return;
                }
              }
              return n5InvokeOrig(
                this,
                _origAdd,
                "AddToBagInternal",
                _container,
              );
            },
          );
        } catch (_e4) {}
        try {
          n5InstallBagDropDupeHooks();
        } catch (_dupeHookErr) {
          console.error(
            "[BagDropDupe] late hook install failed:",
            _dupeHookErr,
          );
        }
      })();
    }
    try {
      menuSetupFn1();
    } catch (_e1) {
      n5LogErr("N5 menuSetupFn1", _e1);
    }
    try {
      menuSetupFn2();
    } catch (_e2) {
      n5LogErr("N5 menuSetupFn2", _e2);
    }
    console.log(String.raw`
$$\   $$\ $$$$$$$\
$$$\  $$ |$$  ____|
$$$$\ $$ |$$ |          $$$$$$\  $$\   $$\  $$$$$$\
$$ $$\$$ |$$$$$$$\     $$  __$$\ \$$\ $$  |$$  __$$\
$$ \$$$$ |\_____$$\    $$$$$$$$ | \$$$$  / $$$$$$$$ |
$$ |\$$$ |$$\   $$ |   $$   ____| $$  $$<  $$   ____|
$$ | \$$ |\$$$$$$  |$$\\$$$$$$$\ $$  /\$$\ \$$$$$$$\
\__|  \__| \______/ \__|\_______|\__/  \__| \_______|`);
  });
}
Il2Cpp.perform(() => {
  console.log("[+] Spoofing vr");
  const ac = Il2Cpp.domain.assembly("AnimalCompany").image;
  const apputils = ac.class("AnimalCompany.AppUtils");
  const status = ac
    .class("AnimalCompany.AppUtils")
    .nested("SteamVRHeadsetStatus");
  const xr = apputils.method("GetXRBackend");
  const getstatus = apputils.method("GetSteamVRHeadsetStatus");
  const active = apputils.method("IsSteamVRHeadsetActive");
  active.implementation = function () {
    return true;
  };
  xr.implementation = function () {
    return 2;
  };
  getstatus.implementation = function () {
    const spoof = status.new().unbox();
    spoof.field("activeLoaderPresent").value = true;
    spoof.field("xrDisplayRunning").value = true;
    spoof.field("headDeviceValid").value = true;
    spoof.field("userPresenceKnown").value = true;
    spoof.field("userPresent").value = true;
    return spoof;
  };
});

setTimeout(_n5BootMenu, 20000);
