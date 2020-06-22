using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class Examination_Speciality_Update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Grouped",
                table: "Specialities",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastGroupingDate",
                table: "Specialities",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Grouped",
                table: "Examinations",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Grouped",
                table: "Specialities");

            migrationBuilder.DropColumn(
                name: "LastGroupingDate",
                table: "Specialities");

            migrationBuilder.DropColumn(
                name: "Grouped",
                table: "Examinations");
        }
    }
}
