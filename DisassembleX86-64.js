//-------------------------------------------------------------------------------------------------------------------------
//Binary byte code array
//-------------------------------------------------------------------------------------------------------------------------

var BinCode = new Array();

//------------------------------------------------------------------------------------------------------------------------
//The Mnemonic array each operation code value has a Mnemonic Name
//------------------------------------------------------------------------------------------------------------------------
 
Mnemonics = [
  //------------------------------------------------------------------------------------------------------------------------
  //First Byte operations
  //------------------------------------------------------------------------------------------------------------------------
  "ADD ","ADD ","ADD ","ADD ","ADD ","ADD ","???","???",
  "OR ","OR ","OR ","OR ","OR ","OR ","???",
  "", //*Two byte instructions prefix
  "ADC ","ADC ","ADC ","ADC ","ADC ","ADC ","???","???",
  "SBB ","SBB ","SBB ","SBB ","SBB ","SBB ","???","???",
  "AND ","AND ","AND ","AND ","AND ","AND ","???","???",
  "SUB ","SUB ","SUB ","SUB ","SUB ","SUB ","???","???",
  "XOR ","XOR ","XOR ","XOR ","XOR ","XOR ","???","???",
  "CMP ","CMP ","CMP ","CMP ","CMP ","CMP ","???","???",
  "","","","","","","","","","","","","","","","", //*The Rex Prefix
  "PUSH ","PUSH ","PUSH ","PUSH ","PUSH ","PUSH ","PUSH ","PUSH ",
  "POP ","POP ","POP ","POP ","POP ","POP ","POP ","POP ",
  "???","???","???",
  "MOVSXD ",
  "FS:","GS:",
  "???","???",
  "PUSH ","IMUL ","PUSH ","IMUL ",
  "INS ","INS ","OUTS ","OUTS ",
  "JO ","JNO ","JB ","JAE ","JE ","JNE ","JBE ","JA ",
  "JS ","JNS ","JP ","JNP ","JL ","JGE ","JLE ","JG ",
  ["ADD ","OR ","ADC ","SBB ","AND ","SUB ","XOR ","CMP "], //*ModR/M byte is used as a secondary opcode selection by reg/Opcode value of the ModR/M byte
  ["ADD ","OR ","ADC ","SBB ","AND ","SUB ","XOR ","CMP "], //*ModR/M byte is used as a secondary opcode selection by reg/Opcode value of the ModR/M byte
  "???",
  ["ADD ","OR ","ADC ","SBB ","AND ","SUB ","XOR ","CMP "], //*ModR/M byte is used as a secondary opcode seletion by reg/Opcode value of the ModR/M byte
  "TEST ","TEST ","XCHG ","XCHG ",
  "MOV ","MOV ","MOV ","MOV ","MOV ","LEA ","MOV ",
  ["POP ","???","???","???","???","???","???","???"], //*ModR/M byte is used as a secondary opcode selection by reg/Opcode value of the ModR/M byte
  "XCHG ","XCHG ","XCHG ","XCHG ","XCHG ","XCHG ","XCHG ","XCHG ",
  ["CBW","CWDE","CDQE"], //*Operation code goes by size
  ["CWD","CDQ","CQO"],  //*Operation code goes by size
  "???",
  "WAIT",
  ["PUSHF","PUSHFQ","PUSHFQ"], //*Operation code goes by size
  ["POPF","POPFQ","POPFQ"], //*Operation code goes by size
  "SAHF","LAHF",
  "MOV ","MOV ","MOV ","MOV ",
  "MOVS ","MOVS ",
  "CMPS ","CMPS ",
  "TEST ","TEST ",
  "STOS ","STOS ",
  "LODS ","LODS ",
  "SCAS ","SCAS ",
  "MOV ","MOV ","MOV ","MOV ","MOV ","MOV ","MOV ","MOV ",
  "MOV ","MOV ","MOV ","MOV ","MOV ","MOV ","MOV ","MOV ",
  ["ROL ","ROR ","RCL ","RCR ","SHL ","SHR ","SAL ","SAR "], //*ModR/M byte is used as a secondary opcode selection by reg/Opcode value of the ModR/M byte
  ["ROL ","ROR ","RCL ","RCR ","SHL ","SHR ","SAL ","SAR "], //*ModR/M byte is used as a secondary opcode selection by reg/Opcode value of the ModR/M byte
  "RET ","RET",
  "???","???",
  ["MOV ","???","???","???","???","???","???","???"], //*ModR/M byte is used as a secondary opcode selection by reg/Opcode value of the ModR/M byte
  ["MOV ","???","???","???","???","???","???","???"], //*ModR/M byte is used as a secondary opcode selection by reg/Opcode value of the ModR/M byte
  "ENTER ","LEAVE","RETF ","RETF","INT 3","INT ","INTO",
  ["*","IRET","IRETD","IRETQ"],
  ["ROL ","ROR ","RCL ","RCR ","SHL ","SHR ","SAL ","SAR "], //*ModR/M byte is used as a secondary opcode selection by reg/Opcode value of the ModR/M byte
  ["ROL ","ROR ","RCL ","RCR ","SHL ","SHR ","SAL ","SAR "], //*ModR/M byte is used as a secondary opcode seletion by reg/Opcode value of the ModR/M byte
  ["ROL ","ROR ","RCL ","RCR ","SHL ","SHR ","SAL ","SAR "], //*ModR/M byte is used as a secondary opcode seletion by reg/Opcode value of the ModR/M byte
  ["ROL ","ROR ","RCL ","RCR ","SHL ","SHR ","SAL ","SAR "], //*ModR/M byte is used as a secondary opcode selection by reg/Opcode value of the ModR/M byte
  "???","???","???",
  "XLAT ",
  //------------------------------------------------------------------------------------------------------------------------
  //X87 FPU
  //------------------------------------------------------------------------------------------------------------------------
  [
    ["FADD ","FMUL ","FCOM ","FCOMP ","FSUB ","FSUBR ","FDIV ","FDIVR "], //*ModR/M byte is used as a secondary opcode in a separated Memory Address operand types
    ["FADD ","FMUL ","FCOM ","FCOMP ","FSUB ","FSUBR ","FDIV ","FDIVR "]  //*ModR/M byte is used as a secondary opcode selection by register value under Register mode operand type changes
  ],
  [
    ["FLD ","???","FST ","FSTP ","FLDENV ","FLDCW ","FNSTENV ","FNSTCW "], //*ModR/M byte is used as a secondary opcode selection by register value Memory Address mode ModR/M
    [
      "FLD ", //The Secondary Operation reg/Opcode if 000 in value uses this operation with the Register value of R/M bits
      "FXCH ", //The Secondary Operation reg/Opcode if 001 in value uses this operation with the Register value of R/M bits
      ["FNOP","???","???","???","???","???","???","???"], //If the Reg/Opcode bits are 010 uses the Register value of the R/M bits to select a static operation code rather than a register
      "FSTP1 ", //FSTP1 uses Register Mode Thus register value of R/M bits only if the ModR/M Reg/Opcode bits is operation value 011 bin
      ["FCHS","FABS","???","???","FTST","FXAM","???","???"], //Static Opcode selection under digit operation code 100 bin
      ["FLD1","FLDL2T","FLDL2E","FLDPI","FLDLG2","FLDLN2","FLDZ","???"], //Static Opcode selection under Reg/Opcode operation code 101
      ["F2XM1","FYL2X","FPTAN","FPATAN","FXTRACT","FPREM1","FDECSTP","FINCSTP"], //Static Opcode selection under Reg/Opcode 110 bin
      ["FPREM","FYL2XP1","FSQRT","FSINCOS","FRNDINT","FSCALE","FSIN","???"] //Static Opcode selection under Reg/Opcode 111 bin
    ]
  ],
  [
    ["FIADD ","FIMUL ","FICOM ","FICOMP ","FISUB ","FISUBR ","FIDIV ","FIDIVR "],
    [
      "FCMOVB ", //Reg/Opcode 000
      "FCMOVE ", //Reg/Opcode 001
      "FCMOVBE ", //Reg/Opcode 010
      "FCMOVU ", //Reg/Opcode 011
      "???", //Reg/Opcode 100 invalid operation code
      [
        "???", //Reg/Opcode 101 R/M bit 000 = static operation code hex is 11 (Register Mode), 101 (Reg/Opcode), 000 (R/M) is E8 hex
        "FUCOMPP", //Reg/Opcode 101 R/M bit 001 = static operation code hex is 11 (Register Mode), 101 (Reg/Opcode), 001 (R/M) is E9 hex is static FPU operation FUCOMPP
        "???", //Reg/Opcode 101 R/M bit 000 = static operation code hex is 11 (Register Mode), 101 (Reg/Opcode), 010 (R/M) is EA hex
        "???", //Reg/Opcode 101 R/M bit 000 = static operation code hex is 11 (Register Mode), 101 (Reg/Opcode), 011 (R/M) is EB hex
        "???", //Reg/Opcode 101 R/M bit 000 = static operation code hex is 11 (Register Mode), 101 (Reg/Opcode), 100 (R/M) is EC hex
        "???", //Reg/Opcode 101 R/M bit 000 = static operation code hex is 11 (Register Mode), 101 (Reg/Opcode), 101 (R/M) is ED hex
        "???", //Reg/Opcode 101 R/M bit 000 = static operation code hex is 11 (Register Mode), 101 (Reg/Opcode), 110 (R/M) is EE hex
        "???"  //Reg/Opcode 101 R/M bit 000 = static operation code hex is 11 (Register Mode), 101 (Reg/Opcode), 111 (R/M) is EF hex
      ],
      "???", //Reg/Opcode 110 R/M bit 000 = static operation code hex is 11 (Register Mode), 110 (Reg/Opcode), 000 (R/M) is F0 hex the R/M bits is register value, But is a Invaild operation code
      "???" //Reg/Opcode 111 R/M bit 000 = static operation code hex is 11 (Register Mode), 111 (Reg/Opcode), 000 (R/M) is F8 hex the R/M bits is register value, But is a Invaild operation code
    ]
  ],
  [
    ["FILD ",
    
    "FISTTP ",  //Intel SSE3 Instruction
    
    "FIST ","FISTP ","???","FLD ","???","FSTP "],
    [
      "CMOVNB ","FCMOVNE ","FCMOVNBE ","FCMOVNU ",
      ["FENI ","FDISI ","FNCLEX ","FNINIT ","FSETPM "],
      "FUCOMI ","FCOMI ","???"
    ]
  ],
  [
    ["FADD ","FMUL ","FCOM ","DCOMP ","FSUB ","FSUBR ","FDIV ","FDIVR "],
    ["FADD ","FMUL ","FCOM2 ","FCOMP3 ","FSUBR ","FSUB ","FDIVR ","FDIV "]
  ],
  [
    ["FLD ",
    
    "FISTTP ", //Intel SSE3 Instruction
    
    "FST ","FSTP ","FRSTOR ","???","FNSAVE ","FNSTSW "],
    ["FFREE ","FXCH4 ","FST ","FSTP ","FUCOM ","FUCOMP ","???","???"]
  ],

  [
    ["FIADD ","FIMUL ","FICOM ","FICOMP ","FISUB ","FISUBR ","FIDIV ","FIDIVR "],
    [
      "FADDP ","FMULP ","FCOMP5 ",
      ["???","FCOMPP ","???","???","???","???","???","???"],
      "FSUBRP ","FSUBP ","???","???"
    ]
  ],
  [
    ["FILD ",
    
    "FISTTP ", //Intel SSE3 Instruction
    
    "FIST ","FISTP ","FBLD ","FILD ","FBSTP ","FISTP "],
    [
      "FFREEP ","FXCH7 ","FSTP8 ","FSTP9 ",
      ["FNSTSW ","???","???","???","???","???","???","???"],
      "FUCOMIP ","FCOMIP ","???"
    ]
  ],
  //------------------------------------------------------------------------------------------------------------------------
  //End of X87 FPU
  //------------------------------------------------------------------------------------------------------------------------
  "LOOPNE ","LOOPE ","LOOP ","JRCXZ ",
  "IN ","IN ","OUT ","OUT ",
  "CALL ","JMP ",
  "???",
  "JMP ",
  "IN ","IN ","OUT ","OUT ",
  "LOCK ",
  "Reserved Op-Code!",
  "REPNE ","REP ",
  "HLT","CMC",
  ["TEST ","???","NOT ","NEG ","MUL ","IMUL ","DIV ","IDIV "],
  ["TEST ","???","NOT ","NEG ","MUL ","IMUL ","DIV ","IDIV "],
  "CLC","STC","CLI","CTI","CLD","STD",
  ["INC ","DEC ","???","???","???","???","???","???"],
  [
    ["INC ","DEC ","CALL ","CALL ","JMP ","JMP ","PUSH ","???"], //*invaild instructions very betwean Memory Mode, and Register Mode of the ModR/M
    ["INC ","DEC ","CALL ","???","JMP ","???","PUSH ","???"] //*invaild instructions very betwean Memory Mode, and Register Mode of the ModR/M
  ],
  //------------------------------------------------------------------------------------------------------------------------
  //Two Byte operations
  //------------------------------------------------------------------------------------------------------------------------
  [
    ["SLDT ","STR ","LLDT ","LTR ","VERR ","VERW ","JMPE "], //*The operand input type verys betwean Memory Mode, and Register Mode of the ModR/M
    ["SLDT ","STR ","LLDT ","LTR ","VERR ","VERW ","JMPE "] //*The operand input type verys betwean Memory Mode, and Register Mode of the ModR/M
  ],
  [
    ["SGDT ","SIDT ","LGDT ","LIDT ","SMSW ","???","LMSW ","INVLPG "],
    [
      ["???","VMCALL","VMLAUNCH","VMRESUME","VMXOFF","???","???","???"], //Intel VMX Instrictions
      ["MONITOR ","MWAIT ","???","???","???","???","???","???"], //Intel SSE3 Instructions
      ["XGETBV","XSETBV","???","???","???","???","???","???"],
      ["VMRUN ","VMMCALL","VMLOAD ","VMSAVE ", //Intel VMX Instrictions
      "STGI","CLGI","SKINIT ","INVLPGA "],
      "SMSW ",
      "???",
      "LMSW ",
      ["SWAPGS","RDTSCP","???","???","???","???","???","???"]
    ]
  ],
  "LAR ","LSL ",
  "???",
  "SYSCALL","CLTS","SYSRET","INVD",
  "WBINVD","???",
  "UD2","???",
  [
    ["PREFETCH ","PREFETCHW ","???","???","???","???","???","???"], //*used under Memory address mode only for the ModR/M
    ["???","???","???","???","???","???","???","???"]  //*Not used under Register mode for the ModR/M
  ],
  "FEMMS",
  "???",
  [
    "MOVUPS ","MOVSS ", //SSE1 Single Precision goes Packed, or Scalar
    "MOVUPD ","MOVSD " //SSE2 Double Precision goes Packed, or Scalar
  ],
  [
    "MOVUPS ","MOVSS ", //SSE1 Single Precision goes Packed, or Scalar
    "MOVUPD ","MOVSD " //SSE2 Double Precision goes Packed, or Scalar
  ],
  [
    //SSE pointer mode
    [
      "MOVLPS ","MOVSLDUP ", //SSE1 Single Precision goes Packed, or Scalar
      "MOVSLDUP ","MOVDDUP " //SSE2 Double Precision goes Packed, or Scalar
    ],
    //SSE Register mode
    [
      "MOVHLPS ","MOVSLDUP ", //SSE1 Single Precision goes Packed, or Scalar
      "???","MOVDDUP " //SSE2 Double Precision goes Scalar only
    ]
  ]
];

//------------------------------------------------------------------------------------------------------------------------
//The Operand type array each operation code can use different operands that must be decoded in the X86-64 instruction format order.
//------------------------------------------------------------------------------------------------------------------------
 
Operands = [
  //------------------------------------------------------------------------------------------------------------------------
  //First Byte operations
  //------------------------------------------------------------------------------------------------------------------------
  "02010701","02160716","07010201","07160216","0B010801","0B160906","","",
  "02010701","02160716","07010201","07160216","0B010801","0B160906","","",
  "02010701","02160716","07010201","07160216","0B010801","0B160906","","",
  "02010701","02160716","07010201","07160216","0B010801","0B160906","","",
  "02010701","02160716","07010201","07160216","0B010801","0B160906","","",
  "02010701","02160716","07010201","07160216","0B010801","0B160906","","",
  "02010701","02160716","07010201","07160216","0B010801","0B160906","","",
  "02010701","02160716","07010201","07160216","0B010801","0B160906","","",
  "","","","","","","","","","","","","","","","",
  "0112","0112","0112","0112","0112","0112","0112","0112",
  "0112","0112","0112","0112","0112","0112","0112","0112",
  "","","",
  "07160204",
  "","","","",
  "0906","071602160906",
  "0901","071602160901",
  "10010D02","10160D02","0D020F01","0D020F16",
  "0A01","0A01","0A01","0A01","0A01","0A01","0A01","0A01",
  "0A01","0A01","0A01","0A01","0A01","0A01","0A01","0A01",
  ["02010801","02010801","02010801","02010801","02010801","02010801","02010801","02010801"],
  ["02160806","02160806","02160806","02160806","02160806","02160806","02160806","02160806"],
  "",
  ["02160801","02160801","02160801","02160801","02160801","02160801","02160801","02160801"],
  "02010701","02160716",
  "07010201","07160216",
  "02010701","02160716",
  "07010201","07160216",
  "02020700","07160200",
  "07000202",
  ["0212","","","","","","",""],
  "0B160116","0B160116","0B160116","0B160116","0B160116","0B160116","0B160116","0B160116",
  ["","",""], //goes by size the Middle is when no size is set first element is Operand override last is Rex.W
  ["","",""],
  "","",
  ["","",""],
  ["","",""],
  "","",
  "0B010601","0B160616",
  "06010B01","06160B16",
  "10010F01","10160F16",
  "0F011001","0F161016",
  "0B010801","0B160906",
  "1001","1016","0F01","0F16","1001","1016",
  "01010801","01010801","01010801","01010801","01010801","01010801","01010801","01010801",
  "01160906","01160906","01160906","01160906","01160906","01160906","01160906","01160906",
  ["02010801","02010801","02010801","02010801","02010801","02010801","02010801","02010801"],
  ["02160801","02160801","02160801","02160801","02160801","02160801","02160801","02160801"],
  "0802","",
  "","",
  ["02010801","","","","","","",""],
  ["02160906","","","","","","",""],
  "08020801","",
  "0802","","",
  "0801","",
  ["","",""],
  ["02011300","02011300","02011300","02011300","02011300","02011300","02011300","02011300"],
  ["02161300","02161300","02161300","02161300","02161300","02161300","02161300","02161300"],
  ["02010C01","02010C01","02010C01","02010C01","02010C01","02010C01","02010C01","02010C01"],
  ["02160C01","02160C01","02160C01","02160C01","02160C01","02160C01","02160C01","02160C01"],
  "","","",
  "1101",
  //------------------------------------------------------------------------------------------------------------------------
  //X87 FPU
  //------------------------------------------------------------------------------------------------------------------------
  [
    ["0304","0304","0304","0304","0304","0304","0304","0304"],
    ["12000304","12000304","0304","0304","12000304","12000304","12000304","12000304"]
  ],
  [
    ["0304","","0304","0304","0300","0302","0300","0302"],
    [
      "0300","0300",
      ["","","","","","","",""],
      "0300",
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""],
      ["","","","","","","",""]
    ]
  ],
  [
    ["0304","0304","0304","0304","0304","0304","0304","0304"],
    [
      "12000304","12000304","12000304","12000304","",
      ["","","","","","","",""],"",""
    ]
  ],
  [
    ["0304","0304","0304","0304","","0320","","0320",""],
    [
      "12000304","12000304","12000304","12000304",
      ["","","","","","","",""],
      "12000304","12000304",""
    ]
  ],
  [
    ["0310","0310","0310","0310","0310","0310","0310","0310"],
    ["03101200","03101200","0310","0310","03101200","03101200","03101200","03101200"]
  ],
  [
    ["0310","0310","0310","0310","0310","","0300","0302"],
    ["0310","0310","0310","0310","0310","0310","",""]
  ],
  [
    ["0302","0302","0302","0302","0302","0302","0302","0302"],
    [
      "03021200","03021200","0302",
      ["","","","","","","",""],
      "03021200","03021200",
      "","","",""
    ]
  ],
  [
    ["0302","0302","0302","0302","0320","0310","0320","0310"],
    [
      "0302","0302","0302","0302",
      ["0B02","","","","","","",""],
      "12000302","12000302",
      "","","","",""
    ]
  ],
  //------------------------------------------------------------------------------------------------------------------------
  //End of X87 FPU
  //------------------------------------------------------------------------------------------------------------------------
  "0A01","0A01","0A01","0A01",
  "0B010801","0B160801",
  "08010B01","08010B16",
  "0A04","0A04",
  "",
  "0A01",
  "0B010D02","0B160D02",
  "0D020B01","0D020B16",
  "","","","","","",
  ["02010801","","0201","0201","0B010201","0201","0B010201","0201"],
  ["02160906","","0216","0216","0B160216","0216","0B160216","0B160216"],
  "","","","","","",
  ["0201","0201","","","","","",""],
  [
    ["0216","0216","0216","022C","0216","022C","0216",""],
    ["0216","0216","0216","","0216","","0216",""]
  ],
  //------------------------------------------------------------------------------------------------------------------------
  //Two Byte operations
  //------------------------------------------------------------------------------------------------------------------------
  [
    ["0202","0202","0202","0202","0202","0202","0216"],
    ["0216","0216","0216","0216","0216","0216","0216"]
  ],
  [
    ["0208","0208","0208","0208","0202",,"0202","0200"],
    [
      ["","","","","","","",""],
      ["0B100C100D10","0B100C10"],
      ["","","","","","","",""],
      ["0B10","","0B10","0B10","","","0B04","0B100C04"],
      "0216","",
      "0202",
      ["","","","","","","",""],""
    ]
  ],
  "07160216","07160216","",
  "","","","",
  "","","","",
  [
    ["0200","0200","","","","","",""],
    ["","","","","","","",""]
  ],
  "","",
  ["07820540","07820504","07820540","07820510"], //SSE Instructions have four Prefix modes
  ["05400782","05040782","05400782","05100782"], //SSE Instructions have four Prefix modes
  [
    //SSE pointer mode
    ["07820210","07820540","07820210","07820510"], //SSE Instructions have four Prefix modes
    //SSE Register mode
    ["07820540","07820540","","07820510"] //SSE Instructions have four Prefix modes
  ]
];

//-------------------------------------------------------------------------------------------------------------------------
//The Hex String stores the Bytes of decoded instruction it is shown to the left side of the disassembled instruction
//-------------------------------------------------------------------------------------------------------------------------

var InstructionHex = "";

//-------------------------------------------------------------------------------------------------------------------------
//The Instruction Position String stores the start position of a decoded binary instruction in memory
//-------------------------------------------------------------------------------------------------------------------------

var InstructionPos = "";

//-------------------------------------------------------------------------------------------------------------------------
//Opcode Base value changes when code 0F is used which makes the next opcode start at 255+ in the Mnemonic array, and operamd type.
//-------------------------------------------------------------------------------------------------------------------------

var OpBase = 0;

//-------------------------------------------------------------------------------------------------------------------------
//The simulated 64 bit address binary location uses two 32 bit integers bellow
//-------------------------------------------------------------------------------------------------------------------------

var Pos64=0x00000000,Pos32=0x00000000;

//-------------------------------------------------------------------------------------------------------------------------
//The actual position in the Binary code array is bellow
//-------------------------------------------------------------------------------------------------------------------------

var CodePos32=0x00000000;

//-------------------------------------------------------------------------------------------------------------------------
//Decoding display options 
//-------------------------------------------------------------------------------------------------------------------------

var ShowInstructionHex = true; //setting to show the hex code of the instruction beside the decoded instruction output
var ShowInstructionPos = true; //setting to show the instruction address position

//-------------------------------------------------------------------------------------------------------------------------
//The Rex prefix setting bits
//-------------------------------------------------------------------------------------------------------------------------

var Rex = [
  0, //index 0 of the Rex array is the Rex.B Bit
  0, //index 1 of the Rex array is the Rex.X Bit
  0, //index 2 of the Rex array is the Rex.R Bit
  0, //index 3 of the Rex array is the Rex.W Bit
  0  //index 4 of the Rex array is used to check if an
  //instruction did not already completely decode because this bit is
  //set 0 after a decoded instruction it is set one if a Rex byte is
  //read before the instruction it effects
  ];

//-------------------------------------------------------------------------------------------------------------------------
//The Override Operands size prefix
//-------------------------------------------------------------------------------------------------------------------------

var OvOperands = false;

//--------------------------------------------------------------------------------------------------
//When the RAM override prefix is active the registers used for the ModR/M address change to 32 bit they are normally 64 bit
//--------------------------------------------------------------------------------------------------

var OvRam = false;

//--------------------------------------------------------------------------------------------------
//The prefix string holds the Repate and Lock prefix if used is added before the operation code
//--------------------------------------------------------------------------------------------------

var Prefix = "";

//--------------------------------------------------------------------------------------------------
//RAM Pointer sizes are controlled by the GetOperandSize function which uses the Size Setting attributes for the address
//the Selected Pointer index that is used is the value given back from the GetOperandSize function based on the Size setting
//attributes given to The Decode_ModRM_SIB_Address function, and the possible Multimedia RegMode, But only well using it as a Memory address
//Pointer addresses are not used under Register mode when the Mod bits are value 11
//--------------------------------------------------------------------------------------------------


PTRS=[
  "[", //index 0 of this PTRS array uses no pointer size if GetOperandSize returns no size which is 0
  "BYTE PTR [", //index 1 of this PTRS array uses a pointer that is 8 in size if GetOperandSize returns 1 for 8 in size
  "WORD PTR [", //index 2 of this PTRS array uses a pointer that is 16 in size if GetOperandSize returns 2 for 16 in size
  "DWORD PTR [", //index 3 of this PTRS array uses a pointer that is 32 in size if GetOperandSize returns 3 for 32 in size
  "FWORD PTR [", //index 4 of this PTRS array uses a pointer that is 48 in size if GetOperandSize returns 4 for 48 in size
  ["QWORD PTR [","MMWORD PTR ["], //index 5 of this PTRS array uses a pointer that is 64 in size if GetOperandSize returns 5 for 64 in size, But uses two names the other name in the array is for the Multimedia pointer
  "TBYTE PTR [", //index 6 of this PTRS array uses a pointer that is 80 in size if GetOperandSize returns 6 for 80 in size
  ["OWORD PTR [","XMMWORD PTR ["] //index 7 of this PTRS array uses a pointer that is 128 in size if GetOperandSize returns 7 for 128 in size, But uses two names the other name in the array is for the Multimedia pointer
];

//--------------------------------------------------------------------------------------------------
//SIB byte scale Note the Scale bits value is the selected index of the array bellow only used under
//a Memory address that uses the SIB Address mode which uses another byte for the address selection
//--------------------------------------------------------------------------------------------------

var scale=[
  "", //when scale bits are 0 in value no scale multiple is used
  "*2", //when scale bits are 1 in value a scale multiple of times two is used
  "*4", //when scale bits are 2 in value a scale multiple of times four is used
  "*8" //when scale bits are 3 in value a scale multiple of times eight is used
];

//-------------------------------------------------------------------------------------------------------------------------
//The Register array holds arrays in order from 0 though 7 for the GetOperandSize Which are called your General use registers Which is controlled by the size setting Attributes
//A SizeSetting attribute higher in value that is not a valid Size Setting attribute uses the Register groups STi, MM, XMM, CR, DR They are separate from the General use registers that change by Size Attributes and operand size setting prefixes
//The function DecodeRegValue Handles decoding a Register values
//-------------------------------------------------------------------------------------------------------------------------

REG=[

  //The first array at element 0 of this REG array
  //Is used only if there is no size setting given back from the GetOperandSize function
  //which bellow is the segment register selection

  [
    
    //Segment Registers names index 0 to 7
    
    "ES","CS","SS","DS","FS","GS","ST(-2)","ST(-1)",
    
    //Segment Registers names index 8 to 15 when Extended, But does nothing so the same Registers are used over again in case the condition is met 
    
    "ES","CS","SS","DS","FS","GS","ST(-2)","ST(-1)"
    
  ],

  //The second array which is at element 1 of this REG array
  //Is used only if the value returned from the GetOperandSize function is 1 in value
  //which is the 8 bit registers names
  //However this array element has two arrays of 8 bit registers The reason is that the
  //Register names change under 8 bit register selection if any rex prefix is used

  [
    
    //8 bit registers without any rex prefix active is the normal low byte to high byte order of the first 4 registers using 8 bits
    
    [
      
      //Registers 8 bit names without any rex prefix index 0 to 7
      
      "AL","CL","DL","BL","AH","CH","DH","BH",
      
      //Registers 8 bit names without any rex prefix index 8 to 15
      //In order to extend to registers 8 to 15 requires the REX prefix so the registers are shown as unknown
      
      "","","","","","","",""
      
    ],
    
    //8 bit registers with any rex prefix active uses all 15 registers in low byte selection
    
    [
      
      //Registers 8 bit names with any rex prefix index 0 to 7
      
      "AL","CL","DL","BL","SPL","BPL","SIL","DIL",
      
      //Registers 8 bit names Extended with any rex prefix index 8 to 15
      
      "R8B","R9B","R10B","R11B","R12B","R13B","R14B","R15B"
      
    ]
    
  ],

  //The third array which is element 2 of this REG array
  //Is used only if the value returned from the GetOperandSize function is 2 in value
  //which bellow is the register names 16 in size

  [
    
    //Registers 16 bit names index 0 to 7
    
    "AX","CX","DX","BX","SP","BP","SI","DI",
    
    //Registers 16 bit names extended index 8 to 15
    
    "R8W","R9W","R10W","R11W","R12W","R13W","R14W","R15W"
    
  ],
  
  //The fourth array which is element 3 of this REG array
  //Is used only if the value from the GetOperandSize function is 3 in value
  //which bellow is the register names 32 in size
  
  [
    
    //Registers 32 bit names index 0 to 7
    
    "EAX","ECX","EDX","EBX","ESP","EBP","ESI","EDI",
    
    //Registers 32 bit names extended index 8 to 15
    
    "R8D","R9D","R10D","R11D","R12D","R13D","R14D","R15D"
    
  ],
  
  //The fith array which is element 4 of this REG array is registers 48 in size, But there is no Registers 48 in size
  //so this array column remains nothing
  
  [],

  //The sixth array which is element 5 of this REG array
  //Is used only if the value returned from the GetOperandSize function is 5 in value
  //which bellow is the register names 64 in size
  
  [
    
    //Registers 64 bit names index 0 to 7
    
    "RAX","RCX","RDX","RBX","RSP","RBP","RSI","RDI",
    
    //Registers 64 bit extended names index 8 to 15
    
    "R8","R9","R10","R11","R12","R13","R14","R15"
    
  ],
  
  //The seventh array which is element 6 of this REG array is registers 80 in size, But there is no Registers 80 in size
  //so this array column remains nothing.
  
  [],
  
  //The eight array which is element 7 of this REG array is registers 128 in size, But there is no Registers 128 in size
  //so this array column remains nothing.
  
  [],
  
  //The other registers such as The ST registers, MM, and XMM are completely separate from the General Use Registers
  
  //REG array element 8
  
  [
    
    //ST registers Names index 0 to 7
    
    "ST(0)","ST(1)","ST(2)","ST(3)","ST(4)","ST(5)","ST(6)","ST(7)",
    
    //ST register Names extended index 8 to 15
    //These registers do not extend so repeat the same registers over for if the extend condition is met
    
    "ST(0)","ST(1)","ST(2)","ST(3)","ST(4)","ST(5)","ST(6)","ST(7)"
    
  ],

  //REG array element 9
  
  [
    
    //Register MM names index 0 to 7
    
    "MM0","MM1","MM2","MM3","MM4","MM5","MM6","MM7",
    
    //Register MM names extended index 8 though 15
    //These registers do not extend so repeat the same registers over for if the extend condition is met
    
    "MM0","MM1","MM2","MM3","MM4","MM5","MM6","MM7"
    
  ],
  
  //REG array element 10

  [
    
    //Register XMM names index 0 to 7
    
    "XMM0","XMM1","XMM2","XMM3","XMM4","XMM5","XMM6","XMM7",
    
    //Register MM names extended index 8 though 15
    
    "XMM8","XMM9","XMM10","XMM11","XMM12","XMM13","XMM14","XMM15"
    
  ],

  //REG array element 11

  [
    
    //control Registers index 0 to 7
    
    "CR0","CR1","CR2","CR3","CR4","CR5","CR6","CR7",
    
    //control registers extended index 8 though 15
    
    "CR8","CR9","CR10","CR11","CR12","CR13","CR14","CR15"
    
  ],

  //REG array element 12

  [
    
    //debug registers index 0 to 7
    
    "DR0","DR1","DR2","DR3","DR4","DR5","DR6","DR7",
    
    //debug registers extended index 8 though 15
    
    "DR8","DR9","DR10","DR11","DR12","DR13","DR14","DR15"
    
  ]

]; //end of REG array structure

//-------------------------------------------------------------------------------------------------------------------------
//This function moves the simulated 64 bit address by one and caries to the 64 bit section of the simulated address when the end of the 32 bit int is reached
//This function also moves the binary code array position by one
//-------------------------------------------------------------------------------------------------------------------------

function IncreasePos()
{
  Pos32+=1;

  //if the first 32 bits of the simulated 64 bit address position is grater than a max 32 bit value set Pos32 0 and carry one to the Pos64 integer that is 32 bits

  if(Pos32 > 0xFFFFFFFF)
  {
    Pos32=0x00000000;
    Pos64+=1;
  }

  //if the 64 bit address reaches it's end the default behavior of the 64 bit instruction pointer inside the CPU adding by one at max address position is start back at 0

  if(Pos64 > 0xFFFFFFFF)
  {
    Pos64=0x00000000;
  }

  //add the 32 bit array index position by one for the binary code array

  CodePos32+=1;

  //if the code position reaches the end of the array index

  if(CodePos32 > 0xFFFFFFFF)
  {
    //load the BinCode array from index 0 till index the last 32 bit index with the next 32 section and start CodePos32 over to read the 32 indexes over with the new 32 section the simulated 64 bit address holds the real position
    CodePos=0; //for now lets just set it 0 without adding in the binary disk read library
  }

}

//-------------------------------------------------------------------------------------------------------------------------
//takes a 64 bit hex string and sets it as the 64 address position
//-------------------------------------------------------------------------------------------------------------------------

function SetBasePosition(Address64)
{
  Pos32 = parseInt(Address64.slice(-8), 16);
  Pos64 = parseInt(Address64.substring(0,Address64.length-8), 16);
}

//-------------------------------------------------------------------------------------------------------------------------
//gives back the current 64 bit address position
//-------------------------------------------------------------------------------------------------------------------------

function GetPosition()
{
  for (var S32 = Pos32.toString(16); S32.length < 8; S32 = "0" + S32);
  for (var S64 = Pos64.toString(16); S64.length < 8; S64 = "0" + S64);
  return((S64+S32).toUpperCase());
}

//-------------------------------------------------------------------------------------------------------------------------
//Different operands in the X86 processor have different Size Attributes controlled by the prefix instructions.
//The size setting is a binary number that uses 7 bits like this 0000000
//an zero indicates a size setting is false well a one in value indicates it is settable to that size
//0=128 BIT, 0=80 BIT, 0=64 BIT, 0=48 BIT, 0=32 BIT, 0=16 BIT, 0=8 BIT
//A size setting of 0101011 means the following bellow
//0=128 BIT, 1=80 BIT, 0=64 BIT, 1=48 BIT, 0=32 BIT, 1=16 BIT, 1=8 BIT
//this means that the size setting attributes are 80 BIT, 48 BIT, 16 BIT, and 8 BIT
//-------------------------------------------------------------------------------------------------------------------------

function GetOperandSize(SizeSetting)
{
  //The variable "n" bellow is a number that is 0 though 7 that is the result from this function which are used by different binary decoding functions that take the 7 Bit Size setting attributes
  //when the result of "n" is 0 from this function means there is no size setting which is used for Segment registers which is a convenient simplification, or Pointer addresses that have no size name
  //when the result of "n" is 1 from this function means the operand size is 8 BIT which is used by General use Registers 8 in size, or "BYTE PTR" pointer address 8 in size, or Immediate input 8 in size
  //when the result of "n" is 2 from this function means the operand size is 16 BIT which is used by General use Registers 16 in size, or "WORD PTR" pointer address 16 in size, or Immediate input 16 in size
  //when the result of "n" is 3 from this function means the operand size is 32 BIT which is used by General use Registers 32 in size, or "DWORD PTR" pointer address 32 in size, or Immediate input 32 in size
  //when the result of "n" is 4 from this function means the operand size is 48 BIT which is only used by "FWORD PTR" pointer address 48 in size, or Immediate input 48 in size
  //when the result of "n" is 5 from this function means the operand size is 64 BIT which is used by General use Registers 64 in size, also "QWORD PTR", or "MMWORD PTR" pointer address 64 in size, or Immediate input 64 in size
  //when the result of "n" is 6 from this function means the operand size is 80 BIT which is only used by "TBYTE PTR" pointer address 80 in size
  //when the result of "n" is 7 from this function means the operand size is 128 BIT which is used by "OWORD PTR", or "XMMWORD PTR" pointer address 128 in size.
  
  var n=0;

  //the variables bellow are B128, B80, B64, B48, B32, B16, and B8 These variables will contain each binary digit for each size setting as a true or false value 0=false, and 1=true

  var B128=SizeSetting>>6,B80=(SizeSetting>>5)&1,B64=(SizeSetting>>4)&1,B48=(SizeSetting>>3)&1,B32=(SizeSetting>>2)&1,B16=(SizeSetting>>1)&1,B8=(SizeSetting)&1;

  //Rex 64 Uses the next highest setting that is active past 48 bit normally it is always 64 bit, But in a few rare instructions it will go 80 bit.

  if(Rex[3]&Rex[4]) //check if the Rex prefix is active and 64 is active
  {
    if(B128) //check if 128 BIT is an active size setting for this Operand
    {
      return(7); //return the size as 7 for 128 bit
    }
    if(B80) //else check if 80 BIT is an active size setting for this Operand
    {
      return(6); //return the size as 6 for 80 bit
    }
    else if(B64) //else go 64 BIT which is normal for the REX 64 prefix only if 64 is an active size setting for this Operand
    {
      return(5); //return the size as 5 for 64 bit
    }
  }
  
  //Find The Default Size it is 48 bit or one size lower till the first active size going lower down from 48 bit
  //normally the default size is 32 bit by the majority of operations, But in a few rare instructions it will go 48 bit by default.
  
  if(B48) //check if 48 bit is an active size if so then
  {
    n=4; //set the size of "n" to 4 which is 48 BIT
  }
  else if(B32) //else check if 32 bit is an active size if so then
  {
    n=3; //set the size of "n" to 3 which is 32 BIT
  }
  else if(B16 & (!B64 | OvOperands)) //else check if 16 bit is an active size if so then
  {
    n=2; //set the size of "n" to 2 which is 16 BIT
  }
  else if(B8) //else check if 8 bit is an active size if so then
  {
    n=1; //set the size of "n" to 1 which is 8 BIT
  }
  
  //The value of N now holds the default size

  //if the Operand Size override prefix is active this allows the Default size to go one size lower
  //normally the default size is 32 so it ends up being 16 however if it is 48 then the next size that is lower is 32.
  //Eight in size can not be reduced with the Operand size override prefix because there is no size smaller.
  //only reduce to one size lower if the size setting is an active size setting for the operations operand size.

  if(OvOperands) //if the Operand Size override prefix is active then
  {
    if(n==4&B32) //if "n" is default size 4 which is 48 BIT, and if 32 BIT is active then
    {
      n=3; //size adjust 48 BIT to 32 BIT set "n" to 3 in value which is 32 BIT which is one size smaller than 48 BIT
    }
    else if(n==3&B16) //else if "n" is default size 3 which is 32 BIT, and if 16 BIT is active then
    {
      n=2; //size adjust 32 BIT to 16 BIT set "n" to 2 in value which is 16 BIT which is one size smaller than 32 BIT
    }
  }

  //if there is no size 48 Bit and lower some operands only use 64, 80, or 128 Bit as the only Size

  if(n==0) //check if no size setting found by going 48 BIT and bellow to find default Operand size which was all done above then check 64 and up
  {
    if(B64) //if 64 BIT is an active size setting then
    {
      n=5; //Set the value of "n" to 5 which is 64 BIT
    }
    else if(B80) //else if 80 BIT is an active size setting then 
    {
      n=6; //Set the value of "n" to 6 which is 80 BIT
    }
    else if(B128) //else if 128 BIT is an active size setting then 
    {
      n=7; //Set the value of "n" to 6 which is 128 BIT
    }
  }

  //return the operands correct size based on it's size settings, and any prefix size adjustments.

  return(n);
}

//-------------------------------------------------------------------------------------------------------------------------
//This function returns an array with three elements
//The first element is the two bits for the ModR/M byte, or the SIB byte scale as a number value 0 to 3
//The second element is the three bits for the ModR/M byte Opcode/Reg bits, or the SIB Index Register value as a number value 0 to 7
//The third element is the last three bits for the ModR/M byte for the R/M bits, or the SIB Base Register value as a number value 0 to 7
//-------------------------------------------------------------------------------------------------------------------------
 
function Decode_ModRM_SIB_Value()
{
  //Get the current position byte value
 
  var v = BinCode[CodePos32];

  //Add the byte as a hex byte to the current bytes used for decoding the instruction which will be shown next to the decoded instruction
  //add hex codes of the decoded operation only if ShowInstructionHex decoding is active

  if(ShowInstructionHex)
  {
    var t = v.toString(16); //convert the SIB, or ModR/M byte to hex
    if ( t.length == 1 ){t = "0" + t;} //pad it to tow hex digits as a byte
    InstructionHex += t; //add it to the current bytes used for the decode instruction
    t = null; //set the temporary string used for padding it to a hex byte null
  }
 
  //The first tow binary digits of the read byte is the Mode bits of the ModR/M byte or
  //The first tow binary digits of the byte is the Scale bits of the SIB byte
 
  var ModeScale = (v >> 6) & 0x03; //value 0 to 3
 
  //The three binary digits of the read byte after the first two digits is the OpcodeReg Value of the ModR/M byte or
  //The three binary digits of the read byte after the first two digits is the Index Register value for the SIB byte
 
  var OpcodeRegIndex=(v >> 3) & 0x07; //value 0 to 7
 
  //The three binary digits at the end of the read byte is the R/M (Register, or Memory) Value of the ModR/M byte or
  //The three binary digits at the end of the read byte is the Base Register Value of the SIB byte
 
  var RMBase=v & 0x07; //value 0 to 7
 
  //Put the array together containing the three indexes with the value
  //Note both the ModR/M byte and SIB byte use the same bit value pattern
 
  var ByteValueArray=[
    ModeScale, //Index 0 is the first tow bits for the Mode, or Scale Depending on what the byte value is used for
    OpcodeRegIndex, //Index 1 is the three bits for the OpcodeReg, or Index Depending on what the byte value is used for
    RMBase //Index 2 is the three bits for the RM, or BASE bits Depending on what the byte value is used for
  ];
 
  //Move the Decoders Position by one
 
  IncreasePos();
 
  //return the array containing the decoded values of the byte
 
  return(ByteValueArray);
}

//-------------------------------------------------------------------------------------------------------------------------
//The function Bellow is designed To decode any register operand including RAM Pointer address Registers
//"RValue" is the Register value given to this function from a Reg/OpCode or even a ModR/M byte or even an opcode register value
//or even SIB
//-------------------------------------------------------------------------------------------------------------------------
//Since X86-64 only uses 3 bits of binary to select a register the max value is 7 which is why
//The Register array index is 0 though 7 for the register names, however 8 is
//added to the selected register when extended to use selectable index 8 though 15
//-------------------------------------------------------------------------------------------------------------------------
//"Size" is used by the GetOperandSize function to give back a number that is 0 though 7 based on the size attributes of the
//Register Selection And Prefix overrides Each Array in the REG array corresponds to the number given back from GetOperandSize
//for the correct Array list to use with "RValue" for a index 0 though 7 across that selected list, and can be extended to 8 though 15
//-------------------------------------------------------------------------------------------------------------------------
//"Extend" Is used as a true or false value which tells the DecodeRegValue function to extend the Selected RValue to 8 though 15
//using the Selected REG array list
//-------------------------------------------------------------------------------------------------------------------------
//Lastly any size setting bigger than 7 bits of binary is not a valid size setting for the GetOperandSize function the max value of
//7 binary digits is 127 so any value less than 128 is a valid size setting. If The size setting is 128
//then The separate ST registers are used which is REG array element 8. The calculation 128-120=8 is used to calculate element
//8, and size 129 is 129-120=9 which is the MM Registers then 130-120=10 which is the XMM registers. Size is subtracted into 120 to
//Find The Element to use 8 and up as the array list for the register names Which "RValue will select from" or set
//-------------------------------------------------------------------------------------------------------------------------
//"Extend" can also use a Boolean logic comparison to which prefix extends the decoded REG value
//A good example of this is the Decode_ModRM_SIB_Address function
//-------------------------------------------------------------------------------------------------------------------------

function DecodeRegValue(RValue, SizeSetting, Extend)
{

  var IndexExtend = 0; //by default is 0
  var RegGroup = 0; //the selected register REG array

  if(Extend) //If Extend is true then
  {
    IndexExtend = 8; //set plus 8 to Array index for the selected "RValue" (Register Value)
  }

  //Check if it is a valid size setting

  if(SizeSetting < 128) //if the size setting is less than 128 it is a valid size setting
  {
    //get the size from the GetOperandSize function which will be the selected array in the REG array
    //the possible values given back go 0 to 6 based on the value of "n" in the GetOperandSize function
    //each value corresponds to a array that contains the register names for that size in the REG array
    
    RegGroup = GetOperandSize(SizeSetting); //the register array list that will be used from the REG array by size using the GetOperandSize function
    
    //general use registers 48, 80, and 128 in size do not exist If
    //Elements 4, 6, and 7 return no register name from this function
    
    if(RegGroup == 4 | RegGroup == 6 | RegGroup == 7)
    {
      return("");
    }
    
    //Check if the RegGroup is the 8 bit registers if it is there is two lists for 8 bit registers
    //normally 8 bit registers go in low byte to high byte order in the CPU, BUT if the rex prefix is used regardless of what setting is
    //active they all go in low Byte order.
    
    if(RegGroup == 1) //if the reg group is 8 Bit which is separated into two for without REX Prefix, or with REX prefix
    {

      if(Rex[4]) //If the REX prefix is active then the Extends input can possibly be active then use use element 1 of the RegGroup 8 in size
      {
        //return the Selected 8 bit register in low byte order with the possible IndexExtend
        
        return(REG[RegGroup][1][RValue+IndexExtend]);
      }
      
      else //else then Extend is false and there is no active rex prefix then use array element 0 as the 8 bit RegGroup
      {
        //return the the Selected 8 bit Register normally using array 0 with the low byte to high byte order array
        //without the added Index Extend as it is impossible under the first 8 bit register group
        
        return(REG[RegGroup][0][RValue]);
      }

    }

    //If this line is reached then it is not an 8 Bit register Selection the rest of the register Index array groups decode normally
    //as the other register size groups with the correct register names are not split into two separate arrays like the 8 bit registers

    return(REG[RegGroup][RValue+IndexExtend]); //Return the Selected Register from the Register array then selected Register value index
  }
  
  //if this line is reached the Size setting is not bellow 128 which means the size setting is invalid then
  //subtract 120 into size to start at 8 or higher from invalid size 128 which allows to use the other Register array groups
  
  RegGroup = SizeSetting - 120;

  if(RegGroup < REG.length & RegGroup >= 8) //check if the REG element is in range of the REG group arrays
  {
  
    //return the the Selected Register note these Registers do not change in size they do not work based on a Size setting attribute like a Regular
    //Register operand which is why operations that use these separated registers show they take STi registers or XMM with one single size Attribute
    //for all instructions
  
    return(REG[RegGroup][RValue+IndexExtend]);

  }
  
  //if this line is reached there is no valid register groups list arrays to use for this register value return no Register name from this function
  
  return("");
  
}

//-------------------------------------------------------------------------------------------------------------------------
//When function argument type is value 0 decode the immediate input regularly to it's size setting
//When function argument type is value 1 decode the immediate input With the Extendable sing bit
//When function argument type is value 2 decode the immediate as a relative address
//When function argument type is value 3 decode the immediate as a Integer Used by Displacements.
//The function argument Size is the size attributes of the IMM that is decoded using the GetOperandSize function
//-------------------------------------------------------------------------------------------------------------------------

function DecodeImmediate(SizeSetting, type)
{
  var imm = ""; //this will store each byte in reverse order for little endian format as a hex string

  //all Immediate input types read the number of digits to there size setting, But can end up using it differently
  //get the default operand size from the size setting of this IMM operand using a previously built GetOperandSize function

  var n = GetOperandSize(SizeSetting);

  //the possible values of n are
  //n=0 no size setting
  //n=1 one single byte basically IMM8
  //n=2 two bytes basically IMM16
  //n=3 four bytes basically IMM32
  //n=4 six bytes basically IMM48
  //n=5 eight bytes basically IMM64
  //n=6 ten bytes basically IMM80 there is no IMM 80 Bit in a 64 Bit Machine
  //n=7 sixteen bytes basically IMM128 there is no IMM 128 Bit in a 64 Bit Machine
  //note normally the value of n is used as a index value in the decode arrays which is why it goes from 0 up in value
  
  //If the size is bigger than 64 return no value from this function
  
  if(n >= 6)
  {
    return("");
  }
  
  //calculate how many bytes that are going to have to be read based on the value of n
  //n=1 is 1 byte
  //n=2 is 2 bytes
  //n=3 is 4 bytes
  //n=4 is 6 bytes
  //n=5 is 8 bytes
  
  if (n >= 3) //when the value of n is greater than or equal to 3 then
  {
    n = (n - 1) * 2; //The rest of the values are minus one to n then multiply by 2
  }
  
  //Loop and increase the Code position and simulated 64 bit address to the number of bytes "n" reads
  
  for (var i=0, v = ""; i < n; i++,IncreasePos()) //Increase the position using the function Increase pos
  {
    v = BinCode[CodePos32].toString(16); //convert the current Bin Code array Position byte to a ASCII hex string
    
    if (v.length < 2) //if the Hex byte is one digit which is half a byte then
    {
      v = "0" + v; //pad the read byte value to a byte if it's less than two hex digits
    }
    
    imm = v + imm; //put each byte into the back of the string basically building the string backwards in memory
    
    //Add the byte as a hex byte to the current bytes used for decoding the instruction which will be shown next to the decoded instruction
    //add hex codes of the decoded operation only if ShowInstructionHex decoding is active

    if(ShowInstructionHex)
    {
      InstructionHex += v; //put each byte Read in order into the Instruction Hex decode output
    }
  }
  
  //The above loop will correctly read the value based on the immediate operands size and store it into the imm variable

  //IMM type one
  //this IMM type will extend open to all 64 or 16 digits based on the prefix size setting if the IMM does not go that size it will read the default size, BUT
  //if the last binary digit is one it flips the rest of the extended open immediate input all ones and vice versa only if the immediate does not go to the bigger size setting by default

  if (type == 1)
  {
    //there is no Extended size to extend to if the size matches the size of the read imm "var ExSize=n; " this changes depending on conditions bellow
    
    var ExSize = n;
    
    //check the most significant bit of the IMM for if it is a 1 in value this is easily done by comparing the last hex digit of the number
    //the very last hex digit of the number that has bean read is used which represents the last four binary digits of the hex value
    //the "and logic" operation &8 basically 8 is 1000 binary and we are asking if the last binary digit is a one using the "and logic operator" well canceling out all other digits
    //we then move the result over to the right three times making 1000 give us a 1 if the last digit was a logic 1 in value
    //the value given back is a Boolean number in which 1 gives a value of true and 0 gives a value of false which is directly usable by the if comparison statement

    var sing = (parseInt(imm.substring(0, 1), 16) & 8) >> 3;
    
    //pad the Immediate to the extend size using FF hex which FF is 11111111 in binary if the sing bit is logic one otherwise 00 which is 00000000 binary
    
    var pad = "00"; //by default pads using 00000000 binary
    
    if (sing) //if the last bit is active then
    {
      pad = "FF"; //pad using 11111111 binary
    }
    
    //note the pad value is added to what the extended size is so basically if extend size is bigger than the immediate size
    //The pad value is added till the immediate matches the extended size
    //if the REX 64 prefix is active and the Immediate input is smaller than 64 in size
    
    if ((Rex[3] & Rex[4]) & (n < 8))
    {
      //set the extend size to 64
      
      ExSize = 16; //16 hex digits is 64 binary digits because 16 * 4 = 64 in which one hex digit is four binary digits
    }
    
    //else if the operand override prefix is active and the Immediate input is smaller than 16 in size
    
    else if (OvOperands & (n < 2))
    {
      //set the extend size to 16
      
      ExSize = 4; // 4 hex digits is 4 * 4 = 16
    }
    
    //start padding it to the Extend Size if ExSize size is bigger than the immediate size pad till they match size.
    
    for (; imm.length < ExSize; imm = pad + imm);
  }
  
  //If the IMM type is for relative address, or Singed Integer set up the two 32 bit integers for 64 simulation
  
  else if (type == 2 | type == 3)
  {

    //convert the immediate into two hex strings that are 32 in size because JavaScript only works with 32 bit integers

    var HexStr32 = imm.slice(-8);
    var HexStr64 = imm.substring(0,imm.length-8);
    
    //convert both numbers into A 32 bit integer
    
    var Imm32Int32 = parseInt(HexStr32, 16);
    var Imm64Int32 = parseInt(HexStr64, 16);
    
    //find the number of bytes to use from 32 bit number sections that represent the 64 Bit section
    //the max value is 0 only if the Relative Immediate is not higher in value than the first 32 bits
    
    var B64 = Math.max(0, n - 4);
    
    //find the number of bytes to use from 32 bit number sections that represent the 32 Bit section
    //the minim value is 4 bytes because JavaScript max value in int 32, But if the Relative Immediate is smaller it will use the smaller value as number of bytes.
    
    var B32 = Math.min(4, n);
    
    if(type == 2) //if it is a Relative address
    {
    
      //the math equation bellow multiples the IMM default size by 8 to find how many binary bits are needed to be calculated for the number of bytes
      //then 2 to the power of size times 8 calculates the max value for each binary digit to byte size subtracting by one starts at max value
      
      var bits32 = Math.pow(2, B32 * 8) - 1; //The first 32 bits
      var bits64 = Math.pow(2, B64 * 8) - 1; //anything above 32 byte size
      
      //Add the first 32 bits normally as a float use the value to check if the tow numbers have to carry to the 64 section of the 32 bit integer bit
      
      var Carrie64 = 0x00000000;
    
      if((Imm32Int32 + Pos32) > 0xFFFFFFFF)
      {
        Carrie64 = 0x00000001;
      }
      
      //Find the bits higher up if any as the none effected bits after the relative add
      
      var RIMM32 = (Pos32 - (Pos32 & bits32)) & 0xFFFFFFFF;
      
      //do the same for 64
      
      var RIMM64 = (Pos64 - (Pos64 & bits64)) & 0xFFFFFFFF;
      
      //start adding up the 32 and 64 section to number of bits allowed from 32 till 64
      
      var IMM32 = (Pos32 + Imm32Int32) & bits32;
      var IMM64 = (Pos64 + Imm64Int32 + Carrie64) & bits64;
      
      //add back the rest of the remaining value that has not been effected by bits size because of Relative IMM size
      
      IMM32 += RIMM32;
      IMM64 += RIMM64;

      //the above would be perfect for any relative Position size if JavaScript did not max out at a 32 bit singed integer
      //fix negative sing error by inverting the value with 32 bit add to max 32 plus one for correction
      //reason JavaScript uses 32 bit integers by default this is one of the ways to correct values that go to the
      //32 bit known as sing bit
      
      if (IMM32 < 0)
      {
        IMM32 = (0xFFFFFFFF + IMM32) + 1;
      }
      
      if (IMM64 < 0)
      {
        IMM64 = (0xFFFFFFFF + IMM64) + 1;
      }
      
      //If the OvOperands prefix is used 66 hex IMM64 is zeroed out and IMM32 is fixed to & 0x0000FFFF basically first 16 calculated bits
  
      if(OvOperands)
      {
        IMM64 = 0x00000000;
        IMM32 = IMM32 & 0x0000FFFF;
      }
      
      //convert to hex and pad it to 0 for correct size for both 32 bit parts of the 64 address
      
      for (IMM32 = IMM32.toString(16); IMM32.length < 8; IMM32 = "0" + IMM32);
      for (IMM64 = IMM64.toString(16); IMM64.length < 8; IMM64 = "0" + IMM64);
      
      //Put the 64 bit address together
  
      imm=IMM64+IMM32;
    }
    
    else if (type == 3) //Calculate and simulate Integer Center Points for all different Immediate Sizes
    {
      var Sing = false; //the sing value for if the Displacement is added or subtracted from center
      
      //Simulate negative positive integers using values bigger than 32
      
      if(B64 > 0) //if any bytes are used in the 32 bit integer for the 64 bit section then
      {
        var Half64 = Math.pow(2, (B64 * 8) - 1 ); //calculate the 32 bit value center value of the 64 bit section
        
        if(Imm64Int32 >= Half64)  //when the value is higher than the center it is negative
        {
          Sing=true; //set the sing bit true for negative
          HexStr64=(Half64-(-(Half64-Imm64Int32))-1).toString(16); //simulate the center point and have the number come back as a positive
          HexStr32=(0xFFFFFFFF-Imm32Int32+1).toString(16); //the last 32 bits only invert
        }
        
        for(;HexStr32.length<8;HexStr32="0"+HexStr32); //pad the first 32 bits fully
        
        for(var HTB=B64*2;HexStr64.length<HTB;HexStr64="0"+HexStr64); //pad the next 32 bit number for the 64 bits to the number of bytes used for 64 bit section
        
        imm = HexStr64+HexStr32; //set IMM to this centered hex string
      }

      else if(B32 > 0) //else simulate 32 and bellow as a center point
      {
        var Half32 = Math.pow(2, (B32 * 8) - 1 ); //calculate the 32 bit value center for integers smaller than 32 or are 32
        
        if(Imm32Int32 >= Half32) //when the value is higher than the center it is negative
        {
          Sing=true; //set sing true for negative
          HexStr32=(Half32-(-(Half32-Imm32Int32))).toString(16); //simulate the integer center point give the value as a positive number sizes 32 and bellow
        }
        
        for(var HTB=B32*2;HexStr32.length<HTB;HexStr32="0"+HexStr32); //pad to the number of bytes for the integer that is 32 or bellow
      
        imm = HexStr32; //set IMM the new center for this hex string
      
      }
      
      if(Sing){imm = "-" + imm;}else{imm = "+" + imm;} //set IMM to add or subtract for the integer sing
    }
  
  }

  //return the immediate result

  return (imm.toUpperCase());
}

//--------------------------------------------------------------------------------------------------
//The function Decode_ModRM_SIB_Value() gives back a array 3 in size that contains the three values for the ModR/M byte
//Before calling this function you must create a variable that holds the ModR/M array from the function Decode_ModRM_SIB_Value()
//the array is then given to this function as the function argument input ModRMArray
//This function will decode the Full SIB byte and Immediate Relative address, and Displacements
//--------------------------------------------------------------------------------------------------
//The only value that is not used is the Reg/(Digit Opcode) because it is not part of the address
//The array you give to this function for the ModR/M byte is used again though the DecodeInstruction process, But
//uses the Reg/(Digit Opcode) value from the array as aether a Register value under a different operand or
//a Operation code selection
//--------------------------------------------------------------------------------------------------
//This function only fully decodes the parts that make the Address location
//Which is the Mod bits of the ModR/M and The R/M bits
//If the Mode bits are 00,01, and 10 this uses the R/M bits in Memory address pointer mode
//If The R/M bits are in Memory address pointer mode and the R/M bits is 100 basically 4 in value 
//The Next byte is used for as a SIB also Modes 01, and 10 add a displacement to the address which must be Decoded
//After the SIB if used. If The R/M bits are 101 The Address is a Relative location.
//The R/M bits can be any Register value Except for 100, 101 inside an address pointer using modes 00, 01, or 10.
//--------------------------------------------------------------------------------------------------
//If the Mod bits are 3 which is 11 binary then the R/M bits are used as a selected register Without the Address Pointer
//The only value not used is the Reg/(Digit Opcode) of the ModR/M byte which is decoded as a Register
//under a different operand or used as a secondary opcode selection
//--------------------------------------------------------------------------------------------------
//RegMode is used under the Register mode of the R/M bits when the Mode setting is 11 basically 3 in value
//when RegMode is 0 the General use Register Mode is used
//when RegMode is 1 the Registers are the ST registers note
//when RegMode is 2 the registers are the MM registers
//when RegMode is 3 the registers are the XMM registers
//--------------------------------------------------------------------------------------------------
//SizeSetting is a 7 bit value used by the GetOperandSize function for the correct pointer size or
//used for General use register selection under Register mode 0
//--------------------------------------------------------------------------------------------------

function Decode_ModRM_SIB_Address(ModRMArray, RegMode, SizeSetting)
{

  var out = ""; //the variable out is what stores the decoded address

  //check if the Mode bits are a Memory address Mode Address
  //ModR/M Memory address Pointer modes are 0, 1, and 2 while Mode 3 is register Mode

  var s = GetOperandSize(SizeSetting);

  if(ModRMArray[0] <= 2) //if Mode bits are less than equal to 2 it is a Memory address pointer type
  {

    var Disp = 0; //The Immediate displacement size is 0 by default which means it is not used

    //-----------------------------set the displacement size if ModR/M address Mode is 1 in value a displacement of 8 is used-----------------------------

    if(ModRMArray[0] == 1) //if Mode bits are one in value then
    {
      Disp = parseInt("0000001", 2); //set the Displacement Immediate to a 8 in size
    }

    //-----------------------------set the displacement size if ModR/M address Mode is 2 in value a displacement of 32 is used-----------------------------

    else if(ModRMArray[0] == 2) //else if the Mod bits are 2 in value then
    {
      Disp = parseInt("0000100",2); //set the Displacement Immediate to 32 in size
    }
  
    var DispType = 3; //normally the Displacement is a Singed int value, But if the right condition is met then it will sing bit extends 64 under SIB 
  
    var AddressRegSize = parseInt("0010000",2); //The Register size for A Memory Address is 64 by default
  
    if(OvRam) //if the Ram override prefix is active the registers used from the Memory address pointer is 32 in size 
    {
      AddressRegSize = parseInt("0000100",2);
    }

    //if the size is 64, or 128 which change based on Multimedia RegMode

    if(s == 5 | s == 7)
    {
      //if RegMode is Multimedia use the Multimedia pointers under 64 and 128

      if(RegMode > 1)
      {
        out = PTRS[s][1];
      }

      //else use Normal pointers under size 64, 128

      else
      {
        out = PTRS[s][0];
      }
    }

    //else it is not 64, or 128 go by value of "s" given from the GetOperand size function

    else
    {
      out = PTRS[s];
    }

    //-----------------------------if the ModR/M Base Register is 4 in value decode the Address as a SIB-----------------------------

    if(ModRMArray[2] == 4)
    {
      
      var HasBaseReg = true; //The Base Register can be canceled out
      var HasIndexReg = true; //The Index Register can Be canceled out for the SIB address byte

      var SIB = Decode_ModRM_SIB_Value(); //get the SIB byte values

      //when The REX.X prefix is active the the Index register can go register value 4
      //when The Index register is value 4 it cancels out except for under the REX.X prefix

      HasIndexReg = ( Rex[1] & Rex[4] ) | SIB[1] != 4;
      
      //check if the base register is 5 in value and that the ModR/M Mode is 00 this activates Disp 32
      
      if(ModRMArray[0] == 0 & SIB[2] == 5)
      {
        HasBaseReg = false; //This cancels out the Base Register
        
        //check if the Index register is canceled out as well
        //if the REX.X prefix is not active, and  index is register value 4 cancels out the Index Register 
        
        if(!HasIndexReg) //if the Index is canceled out then
        {
          DispType = 1; //sing extend the Disp32 because it effects the hole 64 address
        }
        
        Disp = parseInt("0000100",2); //set the Displacement Immediate to 32 in size
      }
      
      //else decode the base register normally
      
      else
      {
        out = out + DecodeRegValue(SIB[2], //SIB Base register value
        AddressRegSize, //The register size 32/64 Because of the RAM override Prefix
        Rex[0] & Rex[4] //The Extend condition is the REX.B prefix
        );
      }
      
      //if Index Register is not Canceled out
      
      if(HasIndexReg)
      {
        
        //if the Base Register is not Canceled out
        
        if(HasBaseReg)
        {
          out = out + "+"; //then add the Plus in front of the Base register
        }
        
        //note the above is important it adds the plus between the base register and index register only if
        //there is a base register and did not set Disp32
        
        //add in the Index register
        
        out = out + DecodeRegValue(SIB[1], //SIB Index register value
        AddressRegSize, //The register size 32/64 Because of the RAM override Prefix
        Rex[1] & Rex[4] //The Extend condition is the REX.X prefix
        );
        
        out = out + scale[SIB[0]] //add what the scale bits decode to the Index register by the value of the scale bits which select the name from the scale array
      }
        
    }

    //-----------------------------else The ModR/M does not Go into a SIB address-----------------------------

    else if(ModRMArray[0] == 0 & ModRMArray[2] == 5) //check if the MODE bits are 0 and the R/M bits are 5 in value
    {
      out = out + DecodeImmediate(parseInt("0000100",2),2); //Then The Memory Address is a Relative Immediate Address 32 in size
    }

    else //else Decode The R/M bits Register value normally
    {
      out = out + DecodeRegValue(ModRMArray[2], //The R/M bit's Register value
      AddressRegSize,  //The register size 32/64 Because of the RAM override Prefix
      Rex[0] & Rex[4] //the Extend condition is the REX.B prefix
      );
    }
    
    //read an Immediate for the Disp size
      
    if(Disp > 0)
    {
      var R64=Rex[3],RexActive=Rex[4]; //backup the REX prefix setting
      Rex[3]=1;Rex[4]=1; //temporarily set 64 for the possible sing extend 64 address
      out = out + DecodeImmediate(Disp, DispType); //add the decoded displacement
      Rex[3]=R64;Rex[4]=RexActive; //set the rex setting back the way it was
    }
    
  out = out + "]"; //put the right bracket on for the Address

  }

  //-----------------------------else if the ModR/M mode bits are 11 which is value 3 the R/M bits use register Mode-----------------------------
  
  else if(ModRMArray[0] == 3) //else if it is a Register mode ModR/M instead of Memory address
  {
    //if REG mode is Grater than 0 decode it 63+RegMode for the other Registers in the DecodeRegValue function
    //used for stuff like STi/m32real, and xmm/m128, or mm/m64
    //if the Reg Group is grater than equal to 1 and is less than equal to 3 allows use of registers ST,MM, and XMM
    //take note that registers CR, and DR are not useable under register mode of the ModR/M address
    
    if(RegMode >= 1 & RegMode <= 3)
    {
       out = DecodeRegValue(ModRMArray[2], //The R/M bit's Register Value
       127+RegMode, //The size settings higher up that select the other registers
       Rex[0] & Rex[4] //the Extend condition is the REX.B prefix
       );
    }
    
    //else if RegMode is 0 decode it as a General use Register for stuff like R16/32/64 which goes by the size setting
    
    else if(RegMode == 0)
    {
       out = DecodeRegValue(ModRMArray[2], //The R/M bit's Register Value
       SizeSetting, //The ModR/M size seetting
       Rex[0] & Rex[4] //the Extend condition is the REX.B prefix
       );
    }
    
    else //else invalid Register selection for Register mode if so return from function with nothing
    {
       return("");
    }
    
  }
  
  return(out); //return what the "Register mode address" is, or "Memory address"

}

//------------------------------------------------------------------------------------------------------------------------
//Decodes the new Operand type string format
//------------------------------------------------------------------------------------------------------------------------

function DecodeOprandStr(HexStr)
{
  var out=[
  parseInt(HexStr.slice(-16,-14),16), parseInt(HexStr.slice(-14,-12),16), //operand one Type, SizeSetting
  parseInt(HexStr.slice(-12,-10),16), parseInt(HexStr.slice(-10,-8),16), //operand two Type, SizeSetting
  parseInt(HexStr.slice(-8,-6),16), parseInt(HexStr.slice(-6,-4),16), //operand three Type, SizeSetting
  parseInt(HexStr.slice(-4,-2),16), parseInt(HexStr.slice(-2),16) //operand one four, SizeSetting
  ];

  //any value that is NaN is 0 because it does not exist.

  for( var i = 0; i < out.length; i++ )
  {
    if( isNaN( out[i] ) )
    {
      out[i] = 0;
    }
  }

  //return the operands

  return(out);
}

//------------------------------------------------------------------------------------------------------------------------
//The Operands
//------------------------------------------------------------------------------------------------------------------------

var FOperands = function(T, S, OpNum)
{
  return(
    {
      Type:T, //The operand type
      Size:S, //Size Attributes
      OperandNum:OpNum //The operand number this operand actually goes under
    }
  );
}

//------------------------------------------------------------------------------------------------------------------------
//Sorts out what operand must be decoded first
//------------------------------------------------------------------------------------------------------------------------

function FormatOperands(Operands)
{
  var out = new Array(); //stores the operands under there scheduled elements

  var IMM = 3; //the Immediate inputs go under element three, But there is possibly two Immediate inputs, and the next must go under element four
  
  var Explicit = 5; //The explicit operands go last and do not decode using any encoding

  var OpNum = 0; //added by one for the operand number

  //The operands must go under the correct array elements for the X86-64 Instruction format

  for ( var i = 0; i < Operands.length; i += 2 )
  {
    //if it is a opcode Reg Encoding it goes in the first element

    if( Operands[i] == 1 )
    {
      //This operand can only be used once in the X86-64 format only set if element 0 has not been defined once already

      if(typeof out[0] == "undefined")
      {
        out[0] = new FOperands( Operands[i], //Type
        Operands[i + 1], //Size
        OpNum++ //Operand Iteration number for which operand it is
        );
      }
    }

    //The ModR/M address, Moffs comes next 

    else if( Operands[i] > 1 & Operands[i] < 7 )
    {
      //This operand can only be used once in the X86-64 format only set if element 1 has not been defined once already

      if(typeof out[1] == "undefined")
      {
        out[1] = new FOperands(Operands[i], //Type
        Operands[i + 1], //Size
        OpNum++ //Operand Iteration number for which operand it is
        );
      }
    }

    //The ModR/M Reg bit's

    else if( Operands[i] == 7 )
    {
      //This operand can only be used once in the X86-64 format only set if element 2 has not been defined once already

      if(typeof out[2] == "undefined")
      {
        out[2] = new FOperands(Operands[i], //Type
        Operands[i + 1], //Size
        OpNum++ //Operand Iteration number for which operand it is
        );
      }
    }

    //The Immediate inputs come last there can only be a max of two

    else if(Operands[i] > 7 & Operands[i] < 11)
    {
      if(IMM <= 4) //note elements 3 and 4 is where the Immediate input Operands are stored
      {
        out[IMM] = new FOperands(Operands[i], //Type
        Operands[i + 1], //Size
        OpNum++ //Operand Iteration number for which operand it is
        );

        IMM+=1; //add one to the Immediate array element position.
      }
    }

    else if(Operands[i] > 10)
    {
      out[Explicit] = new FOperands(Operands[i], //Type
      Operands[i + 1], //Size
      OpNum++ //Operand Iteration number for which operand it is
      );

      Explicit += 1;
    }

  }

  //return the operands in X86-64 format order for the Decode function.

  return(out);

}

//------------------------------------------------------------------------------------------------------------------------
//Decode function Decodes the X86-64 instruction format
//------------------------------------------------------------------------------------------------------------------------
 
function DecodeInstruction()
{

  //if instruction position display is active and InstructionPos does not hold a position in case of recalling this function because of prefixes

  if(ShowInstructionPos & InstructionPos == "")
  {
    InstructionPos = GetPosition(); //get the start position of an instruction before the decoder position changes well decoding the operation
  }

  //get the byte value for the operation code from the binary code array
 
  var Opcode = BinCode[CodePos32];

  //Add the byte as a hex byte to the current bytes read for decoding the instruction which will be showen next to the decoded instruction

  if(ShowInstructionHex)
  {
    var t = Opcode.toString(16); //convert the operation code to hex
    if ( t.length == 1 ){t = "0" + t;} //pad it to tow hex digits as a byte
    InstructionHex += t; //add it to the current bytes used for the decode instruction
    t = null; //set the temporary string used for padding it to a hex byte null
  }

  //Move to next byte position
 
  IncreasePos();
 
  //******************************check overrides and prefixes*******************************
 
  //Operand override Prefix
 
  if(Opcode == 0x66)
  {
    OvOperands = true;
    return(DecodeInstruction());
  }
 
  //Ram address size override 32
 
  if(Opcode == 0x67)
  {
    OvRam = true;
    return(DecodeInstruction());
  }
 
  //The Rex prefix bit decode
 
  if( Opcode >= 0x40 & Opcode <= 0x4F)
  {
    Rex = [ Opcode & 0x01, ( Opcode & 0x02 ) >> 1, ( Opcode & 0x04 ) >> 2, ( Opcode & 0x08 ) >> 3, 1 ];
    return(DecodeInstruction());
  }

  //The Prefixes that use a Mnemonic byte value that have a name that is added before the operation code

  if(Opcode == 0xF0 | Opcode == 0xF2 | Opcode == 0xF3)
  {
    Prefix = Mnemonics[Opcode]; //set the Prefix string
    return(DecodeInstruction());
  }

  //if 0F hex start at 255 for Opcode alowing two byte operation codes

  if(Opcode == 0x0F)
  {
    OpBase = 256;
    return(DecodeInstruction());
  }

 
  //*******************************instruction Decode*****************************
  //The output array will hold the operand decoded strings under the elements the operands go under
 
  var out=new Array();
 
  //If the ModR/M address is decoded the ModRMValues can be used again to decode the Reg/Opcode if it is used as a Reg
 
  var ModRMValues=new Array();
 
  //get the Operation name by the operations byte value
 
  var Name = Mnemonics[OpBase + Opcode];
 
  //get the Operands for this opcode it follows the same array structure as Mnemonics array
 
  var Type = Operands[OpBase + Opcode];
 
  //if the Mnemonic is an array two in size then Register Mode and memory more are separate from each other
 
  if(Name instanceof Array && Name.length == 2)
  {
     //decode the ModR/M byte
      
     ModRMValues = Decode_ModRM_SIB_Value();

     //if Mode is Memory Address mode use the first element

     if(ModRMValues[0]<3)
     {
       Name = Name[0];
       Type = Type[0];
     }
       
     //else register mode
      
     else
     {
       Name = Name[1];
       Type = Type[1];
     }
  }

  //if the current Mnemonic is an array 8 in length

  if(Name instanceof Array && Name.length == 8)
  {

    //digit opcode selection

    //Decode the ModR/M byte value store if ModR/M was not previously used as a Selection between Register Operation codes and Memory operation codes
 
    if(ModRMValues == "")
    {
      ModRMValues = Decode_ModRM_SIB_Value();
    }

    Name = Name[ModRMValues[1]];
    Type = Type[ModRMValues[1]];

    //if The select digit opcode is another array 8 in size it is a static opcode selection

    if(Name instanceof Array && Name.length == 8)
    {
      Name = Name[ModRMValues[2]];
      Type = Type[ModRMValues[2]];
    }

  }

  //if the Mnemonic is an array 3 in size it is an instruction Mnemonic that goes by the tow Size override prefixes and the middle element is default size Mnemonic name

  if(Name instanceof Array && Name.length == 3)
  {
    //If REX.W

    if(Rex[3] & Rex[4])
    {
      Name = Name[2]; //set it to the 64 Mnemonic
      Type = Type[2]; //Operand array always matches the Mnemonic structure
    }

    //else If Operand override 16

    else if(OvOperands)
    {
      Name = Name[0]; //set it to the 16 Mnemonic
      Type = Type[0]; //Operand array always matches the Mnemonic structure
    }

    //else no size prefix use default size Mnemonic name

    else
    {
      Name = Name[1]; //set it to the 16 Mnemonic
      Type = Type[1]; //Operand array always matches the Mnemonic structure
    }
  }

  //else if the Mnemonic is an array 4 in size it is an SSE instruction

  if(Name instanceof Array && Name.length == 4)
  {
    //if SSE2 Scalar Double (F2 hex Prefix)

    if(Prefix == Mnemonics[0xF2])
    {
      Prefix = "";
      Name = Name[3];
      Type = Type[3];
    }

    //SSE2 Packed Double (66 hex Prefix)

    else if(OvOperands)
    {
      Name = Name[2];
      Type = Type[2];
    }

    //SSE1 Scalar Single (F3 hex Prefix)

    else if(Prefix == Mnemonics[0xF3])
    {
      Prefix = "";
      Name = Name[1];
      Type = Type[1];
    }

    //else no prefix use default Packed Single

    else
    {
      Name = Name[0];
      Type = Type[0];
    }

  }
 
  //decode the operand string and sort it for the X86-64 instruction format decode order
 
  var X86Format = FormatOperands(DecodeOprandStr(Type));
 
  //The X86Format array decodes the available operands in order however the OperandNum which is
  //added by the SortOperands function is a value specifies which operand element it really goes under in the output array
 
  //note X86-64 Instruction format
  //"Reg opcode" function DecodeRegValue
  //"ModR/M address, or Moffs" fuction Decode_ModRM_SIB_Address
  //"ModR/M Reg" function DecodeRegValue
  //"Immediate" function DecodeImmediate
  //"Immediate" function DecodeImmediate
  //"Explicit operand" the Explicit operand are not exactly part of the Instruction encoding, But still have to be Identifiyed to be decoded
  //"Explicit operand"
  //"Explicit operand"
  //"Explicit operand"
 
  //element 0 which is the Reg opcode is the first thing to decode if used
 
  if(typeof X86Format[0] != "undefined")
  {
    out[ X86Format[0].OperandNum ] = DecodeRegValue(Opcode & 0x07, X86Format[0].Size, Rex[0] & Rex[4]); //extends under the REX.B prefix
  }
 
  //element 1 which is the ModR/M address, or Moffs address
 
  if(typeof X86Format[1] != "undefined")
  {
    //check if type is the Moffs Address
    
    if( X86Format[1].Type == 6 )
    {
      var s = GetOperandSize( X86Format[1].Size );
 
      if( s != 5 & s != 7 )
      {
        out[ X86Format[1].OperandNum ] = PTRS[s];
      }
 
      else
      {
        out[ X86Format[1].OperandNum ] = PTRS[s][0];
      }
      
      out[ X86Format[1].OperandNum ] += DecodeImmediate(parseInt("0010000", 2), 0) + "]";
    }
    
    //else it is a Regular ModR/M address
    
    else
    {
      //Decode the ModR/M byte value store it into the ModRMValues if ModR/M was not previously used as a Secondary Digit/Opcode
 
      if(ModRMValues == "")
      {
        ModRMValues = Decode_ModRM_SIB_Value();
      }
 
      //Decode the ModR/M address Mod bit's, and R/M bits Except for Reg/Opcode Including all ModR/M address settings
      //Note the ModR/M RegMode goes in order by the Real reg mode For the ModR/M type only have to subtract by two because of the Reg Opcode operand starting at type 01
 
      out[ X86Format[1].OperandNum ] = Decode_ModRM_SIB_Address(ModRMValues, X86Format[1].Type - 2, X86Format[1].Size);
    }
    
  }
 
  //element 2 which is the ModR/M, REG section is used which uses the ModRMValues previously read by the ModR/M, or Moffs address
 
  if(typeof X86Format[2] != "undefined")
  {
    out[ X86Format[2].OperandNum ] = DecodeRegValue(ModRMValues[1], X86Format[2].Size, Rex[0] & Rex[2]); //extends under the REX.R prefix
  }
 
  //element 3 which is the first Immediate input
 
  if(typeof X86Format[3] != "undefined")
  {
    out[ X86Format[3].OperandNum ] = DecodeImmediate(X86Format[3].Size, X86Format[3].Type - 8);
  }
 
  //element 4 which is the second possible Immediate input Note rarely used
 
  if(typeof X86Format[4] != "undefined")
  {
    out[ X86Format[4].OperandNum ] = DecodeImmediate(X86Format[4].Size, X86Format[4].Type - 8);
  }
 
  //Decode the Possible Explicit Operands only if they exist in in array length if so iterate them till length end
 
  for(var i = 5; i < X86Format.length; i++)
  {
    //General use registers value 0 though 4 there size can change by size setting but can not be extended or changed
 
    if(X86Format[i].Type >= 11 & X86Format[i].Type <= 14)
    {
      out[ X86Format[i].OperandNum ] = DecodeRegValue(X86Format[i].Type - 11, X86Format[i].Size, false); //No Boolean logic extend condition this time just false
    }
    
    //source and destination address Explicit Operands prefixes can extend the registers and change pointer size uses RegMode 0
    
    else if(X86Format[i].Type == 15 | X86Format[i].Type == 16)
    {
      out[ X86Format[i].OperandNum ] = Decode_ModRM_SIB_Address([0,0,X86Format[i].Type - 9], 0, X86Format[i].Size);
    }
 
    //RBX address Explicit Operands prefixes can extend the registers and change pointer size RegMode 0
    
    else if(X86Format[i].Type == 17)
    {
      out[ X86Format[i].OperandNum ] = Decode_ModRM_SIB_Address([0,0,3], 0, X86Format[i].Size);
    }
 
    //The ST only Operand
    
    else if(X86Format[i].Type == 18)
    {
      out[ X86Format[i].OperandNum ] = "ST";
    }
 
    //The Explicit Operand is always a forward input of 1
    
    else if(X86Format[i].Type == 19)
    {
      out[ X86Format[i].OperandNum ] = "1";
    }
  }
 
  //If Opcode 90 instruction is not XCHG EAX,EAX even though that is what it should be decoded as
  //It Decodes as NOP because it results to no operation
 
  if(Opcode == 0x90)
  {
    Name = "NOP";
    out="";
  }

  //add the Prefix string before the operation code

  Name = Prefix + Name;

  //add hex codes of the decoded operation if ShowInstructionHex decoding is active

  if(ShowInstructionHex)
  {
    InstructionHex = InstructionHex.toUpperCase(); //make it uppercase
    for(; InstructionHex.length < 15;InstructionHex = InstructionHex + " "); //pad it 16 in length
    Name = InstructionHex + " " + Name; //add it behind the operation Name and optional Prefix string
    InstructionHex = ""; //reset the hex decode string for the next operation code
  }

  //add the 64 bit address of the instruction if ShowInstructionPos decoding is active

  if(ShowInstructionPos)
  {
    Name = InstructionPos + " " + Name; //add it behind the operation Name, and optional Perfix, and Operation hex code if the hex code display setting is active
    InstructionPos = ""; //set the position black to load the position in again for the next instruction
  }
  
  //reset all the Prefix settings because the full instruction has decoded
  
  OvOperands = false;
  OvRam = false;
  Rex[4] = false;
  Prefix = "";
  OpBase = 0;
 
  //return the instruction
 
  return(Name+out+"\r\n");
 
}

//********************************do an linear disassemble********************************

function Disassemble(Code)
{
  Out=""; //The Disassemble output

  BinCode = Code; //set the Publicaly avaible binary code array that will be used by all functions

  //Disassemble binary code using an linear pass

  while(CodePos32<BinCode.length)
  {
    try
      {
        Out += DecodeInstruction(); //Decode One Instruction at a time
      }
    catch(e) //Binary code Array index out of bounds
    {
      Out +=  InstructionPos+" "+InstructionHex+" "+"???\r\n";
      InstructionPos = "";
      InstructionHex = "";
    }
  }

  CodePos32 = 0; //reset the Code position

   //return the decoded binary code

  return(Out);
}

//------------------------------------------------------------------------------------------------------------------------
//Sample code
//------------------------------------------------------------------------------------------------------------------------

SetBasePosition("00007FFA417B5930"); //set the 64 bit address

//Create a simple hex code

var BinaryHex="cceb004883c438c3cccccccccccccccc488bc448895810488970184889782055488da8e8fdffff4881ec10030000488b05930a0a004833c4488985000200004c8b05aad8090033c0488944244233f6c74424582a002c00488d05b23f05004889442460488d45f04889442448488bf9c744244000000802";

//convert every tow hex digits into one byte pre array element

var  ByteArray = new Array();

for(var i = 0, el = 0;i < BinaryHex.length;i += 2, el++)
{
  ByteArray[el] = parseInt(BinaryHex.substring(i, i + 2), 16);
}

//used the byte code array with the Disassemble function

var DisAsm = Disassemble(ByteArray);

//Display the output

alert(DisAsm);
